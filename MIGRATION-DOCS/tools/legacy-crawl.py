"""Read-only crawl of a live website before a migration.

Reference tooling for MIGRATION-PLAYBOOK.md, phase 2. It is not part of
the website build and nothing imports it. This is a cleaned-up copy of the
crawler used for the Wraptors Hamilton audit (2026-10-27), which ran from
a temporary scratch folder.

What it does (GET requests only, redirects NOT followed, ~3 requests/s):
  - starts from a seed list (normally every <loc> in the old sitemaps);
  - follows every same-host <a href>, skipping assets, /wp-admin, feeds;
  - records status, Location, X-Robots-Tag, <title>, meta description,
    meta robots, canonical, H1s, first H2s, JSON-LD @types, word count,
    image/alt counts and internal in-link counts.

Usage (standard library only; run with -I so nothing in the cwd is imported):
  python -I legacy-crawl.py <host> <seeds.txt> <out_dir> [max_urls]
  e.g. python -I legacy-crawl.py www.example.com seeds.txt ./crawl 400

Outputs in <out_dir>: old_crawl.csv, old_pages.json (headings + text per
page, for content comparison), old_inlinks.json.
"""
import csv, html, json, os, re, sys, time, urllib.error, urllib.parse, urllib.request
from html.parser import HTMLParser

HOST, SEEDS, OUT = sys.argv[1], sys.argv[2], sys.argv[3]
MAX = int(sys.argv[4]) if len(sys.argv) > 4 else 400
os.makedirs(OUT, exist_ok=True)
UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/130 Safari/537.36'


class NoRedirect(urllib.request.HTTPRedirectHandler):
    def redirect_request(self, *args, **kwargs):
        return None


OPENER = urllib.request.build_opener(NoRedirect)


def get(url):
    req = urllib.request.Request(url, headers={'User-Agent': UA})
    try:
        r = OPENER.open(req, timeout=30)
        return r.status, dict(r.headers), r.read().decode('utf-8', 'replace')
    except urllib.error.HTTPError as e:
        try:
            body = e.read().decode('utf-8', 'replace')
        except Exception:
            body = ''
        return e.code, dict(e.headers), body
    except Exception as e:  # network error
        return 0, {}, str(e)


class Page(HTMLParser):
    def __init__(self):
        super().__init__()
        self.title, self.in_title = '', False
        self.meta, self.canonical, self.links = {}, '', []
        self.headings, self.cur, self.buf = [], None, ''
        self.ld, self.in_ld, self.ld_buf = [], False, ''
        self.imgs = self.alts = self.skip = 0
        self.text = []

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag == 'title':
            self.in_title = True
        elif tag == 'meta':
            key = (a.get('name') or a.get('property') or '').lower()
            if key:
                self.meta[key] = a.get('content', '')
        elif tag == 'link' and (a.get('rel') or '').lower() == 'canonical':
            self.canonical = a.get('href', '')
        elif tag == 'a' and a.get('href'):
            self.links.append(a['href'])
        elif tag in ('h1', 'h2', 'h3'):
            self.cur, self.buf = tag, ''
        elif tag == 'script' and (a.get('type') or '') == 'application/ld+json':
            self.in_ld, self.ld_buf = True, ''
        elif tag == 'img':
            self.imgs += 1
            self.alts += 1 if (a.get('alt') or '').strip() else 0
        if tag in ('script', 'style', 'noscript'):
            self.skip += 1

    def handle_endtag(self, tag):
        if tag == 'title':
            self.in_title = False
        elif tag == self.cur:
            self.headings.append((tag, ' '.join(self.buf.split())))
            self.cur = None
        elif tag == 'script' and self.in_ld:
            self.ld.append(self.ld_buf)
            self.in_ld = False
        if tag in ('script', 'style', 'noscript') and self.skip:
            self.skip -= 1

    def handle_data(self, data):
        if self.in_title:
            self.title += data
        if self.cur:
            self.buf += data
        if self.in_ld:
            self.ld_buf += data
        if not self.skip:
            self.text.append(data)


def normalise(base, href):
    href = html.unescape(href).strip()
    if href.startswith(('mailto:', 'tel:', 'javascript:', '#', 'sms:')):
        return None
    p = urllib.parse.urlparse(urllib.parse.urljoin(base, href))
    if p.netloc.lower().replace('www.', '') != HOST.lower().replace('www.', ''):
        return None
    if re.search(r'\.(jpe?g|png|gif|webp|svg|pdf|mp4|css|js|ico|xml|woff2?)$', p.path, re.I):
        return None
    if p.path.startswith(('/wp-content', '/wp-json', '/wp-admin', '/wp-includes', '/xmlrpc')) or '/feed' in p.path:
        return None
    query = p.query if set(urllib.parse.parse_qs(p.query)) & {'p', 'page_id', 'cat', 'paged'} else ''
    return urllib.parse.urlunparse(('https', HOST, p.path or '/', '', query, ''))


def schema_types(blocks):
    found = set()

    def walk(o):
        if isinstance(o, dict):
            t = o.get('@type')
            if t:
                found.update(t if isinstance(t, list) else [t])
            for v in o.values():
                walk(v)
        elif isinstance(o, list):
            for v in o:
                walk(v)
    for b in blocks:
        try:
            walk(json.loads(b))
        except Exception:
            found.add('INVALID_JSONLD')
    return ';'.join(sorted(found))


queue = list(dict.fromkeys(l.strip() for l in open(SEEDS) if l.strip()))
seen, rows, pages, inlinks = set(), [], {}, {}
while queue and len(seen) < MAX:
    url = queue.pop(0)
    if url in seen:
        continue
    seen.add(url)
    status, headers, body = get(url)
    time.sleep(0.35)
    location = headers.get('Location') or headers.get('location') or ''
    row = {'url': url, 'status': status, 'location': location,
           'x_robots': headers.get('X-Robots-Tag', ''), 'title': '', 'meta_description': '',
           'robots': '', 'canonical': '', 'h1': '', 'h1_count': 0, 'h2': '', 'schema': '',
           'words': 0, 'internal_links_out': 0, 'img': 0, 'img_alt': 0}
    if location:
        nxt = normalise(url, location)
        if nxt and nxt not in seen:
            queue.append(nxt)
    if status == 200 and '<html' in body[:5000].lower():
        p = Page()
        p.feed(body)
        h1 = [t for k, t in p.headings if k == 'h1']
        text = ' '.join(' '.join(p.text).split())
        row.update(title=' '.join(p.title.split()), meta_description=p.meta.get('description', ''),
                   robots=p.meta.get('robots', ''), canonical=p.canonical, h1=' | '.join(h1),
                   h1_count=len(h1), h2=' | '.join(t for k, t in p.headings if k == 'h2')[:600],
                   schema=schema_types(p.ld), words=len(text.split()), img=p.imgs, img_alt=p.alts)
        out_links = {n for n in (normalise(url, h) for h in p.links) if n}
        row['internal_links_out'] = len(out_links)
        for n in out_links:
            inlinks.setdefault(n, set()).add(url)
            if n not in seen and n not in queue:
                queue.append(n)
        pages[url] = {'headings': p.headings, 'text': text[:20000]}
    rows.append(row)
    print(status, url, f'-> {location}' if location else '', flush=True)

for r in rows:
    r['inlinks'] = len(inlinks.get(r['url'], ()))
with open(f'{OUT}/old_crawl.csv', 'w', newline='', encoding='utf-8') as f:
    w = csv.DictWriter(f, fieldnames=list(rows[0]))
    w.writeheader()
    w.writerows(rows)
json.dump(pages, open(f'{OUT}/old_pages.json', 'w', encoding='utf-8'))
json.dump({k: sorted(v) for k, v in inlinks.items()}, open(f'{OUT}/old_inlinks.json', 'w'))
print(f'crawled {len(rows)}; {len(queue)} left in queue')
