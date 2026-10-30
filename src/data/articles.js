// ══ LEARN / INSIGHTS SYSTEM — single source of truth ══
//
// One reusable template (ArticlePage.jsx) renders every article from the
// data below. Add a new article by adding an entry to ARTICLES; add a new
// category by adding an entry to CATEGORIES — nothing else needs to
// change to support more categories later.
//
// Written for Wraptors Tri-City (2026-10-30) on topics the source
// project's guides don't cover, so the two sites don't publish the same
// articles. No prices, warranty terms, durability figures, cure times or
// legal percentages: the tint guide cites only what Ontario's Highway
// Traffic Act says (ss. 73–74) and leaves timings to the installer.
//
// Field reference — see any entry below for the shape. tableOfContents
// is intentionally NOT a stored field — it's derived from `sections` in
// ArticlePage.jsx, so editing sections can never leave a stale TOC behind.

export { SITE_URL } from '../lib/siteConfig.js';

export const CATEGORIES = [
  { slug: 'vehicle-wraps',          label: 'Vehicle Wraps',         relatedService: 'wraps' },
  { slug: 'paint-protection-film',  label: 'Paint Protection Film', relatedService: 'ppf' },
  { slug: 'ceramic-coating',        label: 'Ceramic Coating',       relatedService: 'ceramic' },
  { slug: 'window-tint',            label: 'Window Tint',           relatedService: 'tint' },
];

export const ARTICLES = [
  // ══ VEHICLE WRAPS ══════════════════════════════════════════════════
  {
    title: 'Wrapping a Leased Car: What to Know Before You Start',
    slug: 'wrapping-a-leased-car',
    category: 'vehicle-wraps',
    relatedService: 'wraps',
    seoTitle: 'Wrapping a Leased Car in Waterloo Region | Wraptors Tri-City',
    metaDescription: 'Can you wrap a leased car? What a wrap does to the paint underneath, what to check in your lease, and how removal works before the car goes back.',
    excerpt: 'A wrap is one of the few ways to change a leased car without changing the car. A few things are worth checking first.',
    heroImageKey: 'wraps10',
    publishDate: '2026-10-30',
    updatedDate: '2026-10-30',
    featured: true,
    intro: 'Leasing and wrapping fit together well: you get the colour or finish you want for the length of the lease, and the factory paint is still underneath when the car goes back. The details that make it work are the condition of the paint going in, what your lease agreement says, and planning the removal.',
    sections: [
      {
        heading: 'Why Wraps Suit Leased Cars',
        body: [
          'A wrap sits on top of the paint rather than replacing it. Changing colour with paint is permanent; changing it with vinyl can be undone. That is the whole appeal for a car you do not own outright.',
          'While it is on, the film also takes some of the everyday wear the paint would otherwise get, such as light scuffs, swirl marks from washing and fading from the sun, which can help when the car is inspected at the end of the lease.',
        ],
      },
      {
        heading: 'Check Your Lease Agreement First',
        body: [
          'Leasing companies set their own rules about modifications and the condition a vehicle has to be returned in. Some say nothing about wraps, some ask to be told, and some require the car to come back in its original colour. Read the agreement, or ask the leasing company, before booking.',
          'In almost every case the expectation is the same: the car goes back in its factory finish. That means the wrap should be planned with removal in mind from the start.',
        ],
      },
      {
        heading: 'The Paint Underneath Matters',
        image: 'wraps11',
        body: [
          'Quality wrap films are designed to be removed cleanly from sound factory paint. Problems come from paint that was already damaged: chips, peeling clear coat or a previous respray can lift with the film when it comes off.',
          'A new or nearly new leased car is usually the best possible starting point. Any existing chips or repairs are worth pointing out at the consultation, so everyone knows what was there before the wrap went on.',
        ],
      },
      {
        heading: 'Planning the Removal',
        body: [
          'Give yourself time before the lease ends. Removal is a careful job of warming the film and peeling it at the right angle, followed by cleaning off any adhesive residue. It is not something to leave until the day before the car is due back.',
          'Film that has been on a long time, or that has been baked by years of sun, takes more work to remove, so booking removal while the wrap is still in good condition keeps it straightforward.',
        ],
      },
    ],
    faqs: [
      { q: 'Will a wrap damage the paint on my leased car?', a: 'On sound factory paint, a quality film installed and removed properly should come off cleanly. Paint that was already chipped, peeling or resprayed is the main risk, which is why the paint is checked before anything is installed.' },
      { q: 'Do I have to tell my leasing company?', a: 'It depends on your agreement. Some leases do not mention wraps; others ask to be told or require the original colour at return. Check the agreement or ask the leasing company before booking.' },
      { q: 'Can I wrap just part of a leased car?', a: 'Yes. Roofs, mirrors, trim pieces, stripes and accents are common on leased cars, and they come off the same way as a full wrap.' },
      { q: 'Can I add PPF to a leased car?', a: 'Yes. Paint protection film is also removable and is a popular way to keep the front end free of chips before the car goes back.' },
    ],
    relatedArticles: ['matte-and-satin-ppf'],
    relatedGeo: 'waterloo',
  },

  // ══ PAINT PROTECTION FILM ══════════════════════════════════════════
  {
    title: 'Matte and Satin PPF: Protecting a Flat Finish',
    slug: 'matte-and-satin-ppf',
    category: 'paint-protection-film',
    relatedService: 'ppf',
    seoTitle: 'Matte & Satin Paint Protection Film Explained | Wraptors Tri-City',
    metaDescription: 'How matte and satin PPF protect a factory matte finish, how they can turn gloss paint satin, and what changes when you wash a flat-finish car.',
    excerpt: 'Matte paint is hard to repair and easy to mark. Matte film protects it without bringing back the shine.',
    heroImageKey: 'ppf8',
    publishDate: '2026-10-30',
    updatedDate: '2026-10-30',
    featured: true,
    intro: 'Clear gloss film is what most people picture when they hear "PPF". It isn\'t the only option. Matte and satin films protect paint in the same way but have a flat surface, which matters in two situations: protecting a car that already has a matte or satin factory finish, and giving a gloss car a satin look without a colour change.',
    sections: [
      {
        heading: 'Why Matte Paint Needs Protecting',
        body: [
          'Factory matte and satin finishes are hard to look after. They cannot be polished or machine-corrected like gloss paint, because polishing brings back a shine in that spot. A scratch or a polished patch on matte paint often means repainting the whole panel.',
          'That makes stone chips, bird droppings left too long and careless washing more costly on a matte car than on a gloss one, and it is why many owners of factory matte cars protect the front end, or the whole car, from new.',
        ],
      },
      {
        heading: 'How Matte Film Works',
        image: 'ppf5',
        body: [
          'Matte and satin PPF have a textured top layer that diffuses light instead of reflecting it. Over a matte finish the film keeps the look the car came with. Clear gloss film over matte paint would leave glossy patches wherever it was applied.',
          'Underneath that top layer it is still paint protection film: a thick urethane layer that takes stone chips and scuffs instead of the paint, and that can be removed later.',
        ],
      },
      {
        heading: 'Turning Gloss Paint Satin',
        body: [
          'The same film over gloss paint changes its look. The colour stays the same, but the finish becomes satin. Covering the whole car gives a factory-satin look while protecting the paint at the same time.',
          'It is a useful middle ground for owners who want a different look without a colour-change wrap, and it can be removed if the car is sold or the owner wants the gloss back.',
        ],
      },
      {
        heading: 'Washing a Matte or Satin Car',
        body: [
          'Flat finishes, whether paint or film, should be washed with products made for matte surfaces. Waxes, polishes and "shine" products fill the texture and leave blotchy glossy areas.',
          'Through salt season, regular gentle rinsing matters more than ever. Grit dragged across a flat finish is harder to hide than it would be on gloss.',
        ],
      },
    ],
    faqs: [
      { q: 'Can I put clear gloss PPF on matte paint?', a: 'You can, but it will look glossy wherever it is applied. Matte or satin film is used on matte paint to keep the original look.' },
      { q: 'Will satin PPF change the colour of my car?', a: 'No. The colour underneath stays the same; the film changes the finish from gloss to satin.' },
      { q: 'Can matte PPF be polished?', a: 'Matte and satin surfaces should not be polished, as it adds shine. Clean them with products made for matte finishes.' },
      { q: 'Does ceramic coating work over matte PPF?', a: 'Yes, as long as the coating is made for matte surfaces. It makes the film easier to clean without adding gloss.' },
    ],
    relatedArticles: ['ceramic-coating-aftercare', 'wrapping-a-leased-car'],
    relatedGeo: 'waterloo',
  },

  // ══ CERAMIC COATING ════════════════════════════════════════════════
  {
    title: 'Ceramic Coating Aftercare: The First Weeks and Beyond',
    slug: 'ceramic-coating-aftercare',
    category: 'ceramic-coating',
    relatedService: 'ceramic',
    seoTitle: 'Ceramic Coating Aftercare Guide | Wraptors Tri-City, Waterloo',
    metaDescription: 'How to look after a new ceramic coating: the curing period, safe washing, what to avoid, and how to tell the coating is still working.',
    excerpt: 'A coating makes a car easier to keep clean. It still needs the right washing habits to keep working.',
    heroImageKey: 'ceramic5',
    publishDate: '2026-10-30',
    updatedDate: '2026-10-30',
    featured: true,
    intro: 'A ceramic coating is a hard, slick layer bonded to the paint (or wheels, glass or film) that makes dirt and water slide off more easily. How long it keeps doing that depends a lot on what happens after the car leaves the studio: how it is treated while the coating cures, and how it is washed after that.',
    sections: [
      {
        heading: 'The Curing Period',
        body: [
          'A coating feels dry within hours, but it keeps hardening for some time afterwards. During that period it is more vulnerable to water spots, bird droppings and harsh chemicals than it will be later.',
          'Your installer will tell you how long to wait before the first wash and what to avoid in the meantime, as this depends on the product used. If something does land on the car, such as a bird dropping or tree sap, rinse it off gently with water rather than leaving it to sit.',
        ],
      },
      {
        heading: 'Washing a Coated Car',
        image: 'ceramic8',
        body: [
          'Coated cars are easier to wash, not wash-free. A pH-neutral shampoo, a clean wash mitt and a separate bucket for rinsing the mitt keep grit from being dragged across the surface. Dry with a soft microfibre towel or a blower rather than letting water dry on the paint.',
          'Brush-type automatic washes are best avoided, because they cause the fine scratches a coating is meant to help prevent. In winter, when hand washing is not practical, a touchless wash is the safer option.',
        ],
      },
      {
        heading: 'What to Avoid',
        body: [
          'Strong degreasers, harsh traffic-film removers and abrasive polishes can wear the coating down. Waxes and sealants are not needed on top of a coating and can hide its water-beading behaviour.',
          'Salt and brine are not dangerous to the coating itself, but leaving them on the car for weeks makes them harder to remove. Rinsing the lower panels regularly through winter keeps the coating doing its job.',
        ],
      },
      {
        heading: 'Is It Still Working?',
        body: [
          'The easiest check is how water behaves. A healthy coating makes water bead up and run off quickly. If water starts to sheet slowly or sit in flat patches, the surface may just be dirty, so wash it properly before judging.',
          'If a properly washed car still is not beading, it may be time for a maintenance product recommended for that coating, or for an inspection at the studio.',
        ],
      },
    ],
    faqs: [
      { q: 'How soon can I wash my car after ceramic coating?', a: 'It depends on the product, so follow the timing your installer gives you. Until then, rinse off anything that lands on the car gently with water.' },
      { q: 'Can I take a coated car through a car wash?', a: 'Touchless washes are fine occasionally. Brush or cloth washes are best avoided, as they cause fine scratches.' },
      { q: 'Do I still need to wax a coated car?', a: 'No. Wax is not needed on top of a coating and can mask how the coating behaves.' },
      { q: 'Can ceramic coating go over PPF or a wrap?', a: 'Yes, using a coating made for film. It makes the film easier to clean; matte and satin films need matte-safe products.' },
    ],
    relatedArticles: ['matte-and-satin-ppf'],
    relatedGeo: 'waterloo',
  },

  // ══ WINDOW TINT ════════════════════════════════════════════════════
  {
    title: 'Getting Your Windows Tinted: The Appointment and the Days After',
    slug: 'window-tint-appointment-aftercare',
    category: 'window-tint',
    relatedService: 'tint',
    seoTitle: 'Window Tint Appointment & Aftercare Guide | Wraptors Tri-City',
    metaDescription: 'What happens when your car is tinted, why haze and small water pockets are normal at first, how long to keep the windows up, and how to clean tint.',
    excerpt: 'Tint looks finished the day you pick the car up, but it is still curing. Here is what to expect.',
    heroImageKey: 'tint2',
    publishDate: '2026-10-30',
    updatedDate: '2026-10-30',
    featured: true,
    intro: 'Window tint is a film applied to the inside of the glass. The installation itself is quick to describe: the glass is cleaned, the film is cut and shaped to the window, and it is applied with a slip solution that is squeegeed out. What surprises people is the period afterwards, while the last of that moisture dries out.',
    sections: [
      {
        heading: 'Before the Appointment',
        body: [
          "Think about what you want from the tint: privacy, less glare, less heat, or a particular look. Then talk it through with the installer, including which windows you want done. Ontario's Highway Traffic Act sets rules for the windshield and the windows beside the driver, and it doesn't give a single percentage, so it is worth discussing what is appropriate for your vehicle before anything is installed.",
          'Bring the car in reasonably clean inside, and clear out anything stored against the rear window or the door panels so the installer can reach the glass.',
        ],
      },
      {
        heading: 'Haze and Water Pockets Are Normal',
        image: 'tint3',
        body: [
          'For a while after installation, the film can look slightly hazy or show small pockets of water. That is the slip solution drying out through the film. It clears on its own, usually faster in warm, sunny weather and more slowly in cold or damp weather.',
          'Do not push on the film to try to move the pockets. If a bubble is still there once the film has had time to cure, have it looked at by the installer.',
        ],
      },
      {
        heading: 'Keep the Windows Up',
        body: [
          'Rolling a window down before the film has bonded can catch the bottom edge and lift or crease it. Your installer will tell you how long to leave the windows up; it is usually a few days, and longer in cold weather.',
          'The rear defroster lines are fine to use once the film has cured. Until then, be gentle with the rear window.',
        ],
      },
      {
        heading: 'Cleaning Tinted Windows',
        body: [
          'Clean the tinted side with a soft microfibre cloth and a cleaner that does not contain ammonia, which can damage window film over time. Avoid scrapers, abrasive pads and rings or keys dragged across the glass.',
          'Ice scrapers are for the outside of the glass only. Tint is on the inside, so it is not affected by scraping ice off the outside, but it can be scratched if something hard is used inside the car.',
        ],
      },
    ],
    faqs: [
      { q: 'How long does tinting a car take?', a: 'It depends on the vehicle and how many windows are being done. The studio will give you a time when you book.' },
      { q: 'Why does my new tint look hazy?', a: 'Moisture from installation is still drying out through the film. It clears on its own; cold, damp weather makes it take longer.' },
      { q: 'When can I roll my windows down?', a: 'Follow the time your installer gives you. It is usually a few days, and longer in cold weather.' },
      { q: 'Is window tint legal in Ontario?', a: "The Highway Traffic Act prohibits coatings that obstruct the driver's view, and coloured or reflective material on the windshield or the windows beside the driver that substantially obscures the interior from outside. The Act does not set a percentage, so the options for each window are discussed before installation." },
    ],
    relatedArticles: ['ceramic-coating-aftercare'],
    relatedGeo: 'waterloo',
  },
];

// The Learn hub only exists once there is something in it.
export const LEARN_ENABLED = ARTICLES.length > 0;

export function getArticleBySlug(slug) {
  return ARTICLES.find((a) => a.slug === slug);
}

export function getArticlesByCategory(categorySlug) {
  return ARTICLES.filter((a) => a.category === categorySlug);
}

export function getFeaturedArticles(limit = 3) {
  return ARTICLES.filter((a) => a.featured).slice(0, limit);
}

export function getRelatedArticleObjects(article) {
  return (article.relatedArticles || []).map(getArticleBySlug).filter(Boolean);
}

export function getCategoryBySlug(categorySlug) {
  return CATEGORIES.find((c) => c.slug === categorySlug);
}
