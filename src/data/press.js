// Press coverage from the old /articles/ page (19 links). The live
// wraptorstricity.com/articles/ page lists the same 19 links (compared
// 2026-10-29). This is coverage of the wider Wraptors brand and its
// founder, not of the Tri-City studio. Titles, URLs and thumbnails are the
// old page's; thumbnails are Wraptors' own photos, copied into
// src/assets/press because the old WordPress uploads disappear at launch.
//
// status — checked 2026-10-29 for the source project's audit:
//   live         the original URL loads the article     → shown
//   unverified   behind a bot check, couldn't be read   → hidden until checked by hand
//   unavailable  404 / 410 / domain gone                → hidden, kept as a record
// label — only when the publisher itself says what the piece is (paid press
// release, syndicated, contributor post) or the page shows an editorial
// byline. No label means the publisher doesn't say; it is not a claim of
// independent coverage.
import press01 from '../assets/press/press-01.jpg';
import press02 from '../assets/press/press-02.jpg';
import press03 from '../assets/press/press-03.jpg';
import press04 from '../assets/press/press-04.jpg';
import press05 from '../assets/press/press-05.jpg';
import press06 from '../assets/press/press-06.jpg';
import press07 from '../assets/press/press-07.jpg';
import press08 from '../assets/press/press-08.jpg';
import press09 from '../assets/press/press-09.jpg';
import press12 from '../assets/press/press-12.jpg';
import press13 from '../assets/press/press-13.jpg';
import press16 from '../assets/press/press-16.jpg';
import press17 from '../assets/press/press-17.jpg';
import press18 from '../assets/press/press-18.jpg';

export const PRESS_CHECKED = '2026-10-29';

export const PRESS = [
  {
    id: 'globe-and-mail-car-wrap-industry',
    title: 'Booming car-wrap industry opens up vast possibilities for customization',
    publisher: 'The Globe and Mail',
    date: '2019-07',
    url: 'https://www.theglobeandmail.com/drive/technology/article-booming-car-wrap-industry-opens-up-vast-possibilities-for/',
    thumb: press07,
    label: 'Editorial',
    status: 'live',
    featured: true,
    note: 'Byline Jeremy Freed; publisher metadata marks it not sponsored. Subscriber article. Its description opens "Mississauga’s Wraptors is one of an increasing number of car-customization shops…".',
  },
  {
    id: 'yahoo-orlando-opening',
    title: 'Vinyl Vehicle Wrap Company Wraptors INC Announces Opening of Fourth U.S Store in Orlando, Florida',
    publisher: 'Yahoo Finance',
    date: '2022-11',
    url: 'https://finance.yahoo.com/news/vinyl-vehicle-wrap-company-wraptors-183600398.html',
    thumb: press04,
    label: 'Paid press release',
    status: 'live',
    featured: true,
    note: 'Page states "This is a paid press release" (distributed by Newsfile).',
  },
  {
    id: 'netnewsledger-dubai',
    title: 'Wraptors is Now Opening its Operations in Dubai and Mr. Wraptors to Mentor the Upcoming Millionaires',
    publisher: 'NetNewsLedger',
    date: '2022-12',
    url: 'https://www.netnewsledger.com/2022/12/05/wraptors-is-now-opening-its-operations-in-dubai-and-mr-wraptors-to-mentor-the-upcoming-millionaires',
    thumb: press03,
    label: null,
    status: 'live',
    featured: true,
  },
  {
    id: 'us-times-now-profile',
    title: 'Stas Kruvchuk: From Humble Beginnings to Setting Industry Trends, This Canadian Entrepreneur is an Inspiration to All',
    publisher: 'US Times Now',
    date: '2021-09',
    url: 'https://www.ustimesnow.com/stas-kruvchuk-from-humble-beginnings-to-setting-industry-trends-this-canadian-entrepreneur-is-an-inspiration-to-all/',
    thumb: press12,
    label: null,
    status: 'live',
    featured: true,
  },
  {
    id: 'weekly-mail-mentorship',
    title: 'Stas Kravchuk’s Mentorship Program: Helping Aspiring Millionaires Achieve Their Goals',
    publisher: 'The Weekly Mail',
    date: '2022-12',
    url: 'https://theweeklymail.com/stas-kravchuks-mentorship-program-helping-aspiring-millionaires-achieve-their-goals',
    thumb: press01,
    label: null,
    status: 'live',
  },
  {
    id: 'yahoo-covid-donation',
    title: 'WRAPTORS INC: Young CEO of Wraptors Inc donated $50k to the needy people at the crucial period of COVID 19',
    publisher: 'Yahoo Finance',
    date: '2020-04',
    url: 'https://finance.yahoo.com/news/wraptors-inc-young-ceo-wraptor-132530784.html',
    thumb: press05,
    label: 'Syndicated from Clout News',
    status: 'live',
    note: 'Yahoo Finance credits the article to Clout News.',
  },
  {
    id: 'bigtime-daily-profile',
    title: 'WRAPTORS INC – A Company Leading Towards the Heights of Success Efficaciously',
    publisher: 'Bigtime Daily',
    date: '2020-04',
    url: 'https://www.bigtimedaily.com/wraptor-inc-a-company-leading-towards-the-heights-of-success-efficaciously',
    thumb: press06,
    label: null,
    status: 'live',
    note: 'Redirects to a dated URL on the same site.',
  },
  {
    id: 'thrive-global-profile',
    title: 'Stas Kravchuk—- The leading representation of authentic entrepreneur who is steering the path of success',
    publisher: 'Thrive Global',
    date: '2020-02',
    url: 'https://thriveglobal.com/stories/stas-kravchuk-the-leading-representation-of-authentic-entrepreneur-who-is-steering-the-path-of-success/',
    thumb: press08,
    label: 'Contributor post',
    status: 'live',
    note: 'Redirects to community.thriveglobal.com, Thrive Global’s contributor platform.',
  },
  {
    id: 'business-deccan-profile',
    title: 'STAS KARVCHUK – A pre-eminent personality praiseworthy for his keen hardwork and determination in taking the company to another level',
    publisher: 'Business Deccan',
    date: '2020-04',
    url: 'https://businessdeccan.com/stas-karvchuk-a-pre-eminent-personality-praiseworthy-for-his-keen-hardwork-and-determination-in-taking-the-company-to-another-level/',
    thumb: press09,
    label: null,
    status: 'live',
  },
  {
    id: 'fab-world-today-profile',
    title: 'Stas Kravchuk: Serial Entrepreneur on Building Businesses and Passion',
    publisher: 'Fab World Today',
    date: '2021-10',
    url: 'https://www.fabworldtoday.com/stas-kravchuk-serial-entrepreneur-on-building-businesses-and-passion/',
    thumb: press16,
    label: null,
    status: 'live',
  },

  // Behind a bot check on 2026-10-29: open each in a normal browser, then
  // set status to 'live' (and add a date/label from the page) to show it.
  {
    id: 'digital-journal-dubai',
    title: 'Wraptors Expands to Dubai: A New Hub for Auto Enthusiasts',
    publisher: 'Digital Journal',
    date: null,
    url: 'https://www.digitaljournal.com/pr/wraptors-expands-to-dubai-a-new-hub-for-auto-enthusiasts',
    thumb: press02,
    label: 'Press release',
    status: 'unverified',
    note: 'URL is in Digital Journal’s /pr/ (press release) section.',
  },
  {
    id: 'entertainment-paper-profile',
    title: 'Stas Kravchuk on Founding Canada’s Biggest Car Wrapping Boutique and Hustle',
    publisher: 'Entertainment Paper',
    date: null,
    url: 'https://www.entertainmentpaper.com/stas-kravchuk-on-founding-canadas-biggest-car-wrapping-boutique-and-hustle/',
    thumb: press13,
    label: null,
    status: 'unverified',
  },
  {
    id: 'globestats-profile',
    title: 'Car Wrapping Mogul: An Inspiring Story of Stas Kravchuk, Founder of Wraptors Inc.',
    publisher: 'Globe Stats',
    date: null,
    url: 'https://www.globestats.com/car-wrapping-mogul-an-inspiring-story-of-stas-kravchuk-founder-of-wraptors-inc/',
    thumb: press17,
    label: null,
    status: 'unverified',
  },
  {
    id: 'disrupt-west-coast',
    title: 'Owners Stas Kravchuk and Christel Barbie Announce They Are Expanding Wraptors Inc. To The West Coast',
    publisher: 'Disrupt Magazine',
    date: null,
    url: 'https://disruptmagazine.com/owners-stas-kravchuk-and-christel-barbie-announce-they-are-expanding-wraptors-inc-to-the-west-coast/',
    thumb: press18,
    label: null,
    status: 'unverified',
  },

  // No longer available at the original URL (2026-10-29). Not shown.
  { id: 'toronto-times-profile', title: 'Adding luxuriousness to your cars with his impeccable car wrap services is young entrepreneur Stas Kravchuk', publisher: 'Toronto Times', date: null, url: 'http://toronto-times.com/2021/07/12/adding-luxuriousness-to-your-cars-with-his-impeccable-car-wrap-services-is-young-entrepreneur-stas-kravchuk/', thumb: null, label: null, status: 'unavailable', note: 'Domain no longer resolves.' },
  { id: 'influencive-profile', title: 'STAS KRAVCHUK, Founder of Wraptors Inc. shared his success mantra', publisher: 'Influencive', date: null, url: 'https://www.influencive.com/stas-kravchuk-founder-of-wraptors-inc-shared-his-success-mantra/', thumb: null, label: null, status: 'unavailable', note: 'HTTP 410 Gone.' },
  { id: 'maxtern-media-profile', title: 'Stas Kravchuk on How He Built the Biggest Car Wrap Boutique in Canada', publisher: 'Maxtern Media', date: null, url: 'https://maxternmedia.com/stas-kravchuk-on-how-he-built-the-biggest-car-wrap-boutique-in-canada/', thumb: null, label: null, status: 'unavailable', note: 'HTTP 404.' },
  { id: 'pop-diaries-profile', title: 'STAS KRAVCHUK—- The leading Entrepreneur who has given a new definition to it!', publisher: 'Pop Diaries', date: null, url: 'https://popdiaries.com/2020/stas-kravchuk-entrepreneur/', thumb: null, label: null, status: 'unavailable', note: 'HTTP 404.' },
  { id: 'bodyworx-thats-a-wrap', title: 'That’s a Wrap – The Case For Automotive Wraps', publisher: 'BodyWorx Magazine', date: null, url: 'https://bodyworxmag.com/thats-a-wrap-bwx-9-2/?utm_source=rss&utm_medium=rss&utm_campaign=thats-a-wrap-bwx-9-2', thumb: null, label: null, status: 'unavailable', note: 'Domain no longer resolves.' },
];

export const PRESS_LIVE = PRESS.filter((p) => p.status === 'live');
export const PRESS_FEATURED = PRESS_LIVE.filter((p) => p.featured);
