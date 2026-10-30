// The Wraptors network FAQ: the same 15 questions appear on the old
// wraptorstricity.com /faqs/ page (and its /ufaq/<id>/ pages) as on the
// other Wraptors WordPress sites (titles compared 2026-10-29).
// TODO(tricity): compare the answer wording against Tri-City's own pages. Each id
// is the old /ufaq/ slug, so public/_redirects can send every legacy
// question URL to its own answer at /faqs/#<id>.
//
// Wording is the old site's, lightly edited. Removed from the published
// answers: claims about in-house designers, an onsite print department and
// printing, which describe the wider Wraptors network and aren't confirmed
// for Tri-City.
export const FAQS = [
  {
    id: 'what-is-a-vehicle-wrap',
    q: 'What is a vehicle wrap?',
    a: 'A vehicle wrap is a vinyl film that is installed — "wrapped" — directly onto the vehicle\'s panels. The application is so precise it is often mistaken for a custom paint job.',
  },
  {
    id: 'whats-the-difference-between-a-half-quarter-and-full-wrap',
    q: 'What\'s the difference between a ½, ¼ and full wrap?',
    a: 'The size of the wrap (full, ½ or ¼) simply refers to the percentage of the car that is covered by the wrap. This is also referred to as a partial vehicle wrap and a full vehicle wrap.',
  },
  {
    id: 'will-the-car-wrap-damage-my-paint',
    q: 'Will the car wrap damage my paint?',
    a: 'No. A car wrap, when applied and removed correctly, does not damage your car\'s OEM paint. In fact, it protects it.',
  },
  {
    id: 'can-a-car-wrap-be-removed',
    q: 'Can a car wrap be removed?',
    a: 'Yes. The wrap can be removed. However, attempting to remove it yourself may cause damage to your paint. We suggest having Wraptors\' experts remove your vehicle wrap, as our installation team is best equipped for this task.',
  },
  {
    id: 'will-you-wrap-a-leased-vehicle',
    q: 'Will you wrap a leased vehicle?',
    a: 'Yes. Since a wrap can be removed without damaging a vehicle, there are no restrictions against wrapping a leased vehicle.',
  },
  {
    id: 'how-do-i-care-for-my-car-wrap',
    q: 'How do I care for my car wrap?',
    a: 'It is best to hand wash your wrapped vehicle. In general, avoid power washing and do not use an ice scraper. Brushing windows and using a rear defroster will cause no damage to your window wrap.',
  },
  {
    id: 'are-car-wraps-applied-to-windows',
    q: 'Are car wraps applied to windows?',
    a: 'Yes, but only on the rear side and rear windows. Window wraps use a special perforated vinyl that allows the driver to see through the rear and rear side windows.',
  },
  {
    id: 'if-the-company-information-on-my-vehicle-wrap-changes-can-it-be-replaced',
    q: 'If the company information on my vehicle wrap changes, can it be replaced?',
    a: 'Yes. Graphics, logos and phone numbers (or any part of the design) can be changed and re-installed as overlays on the car wrap.',
  },
  {
    id: 'will-you-pay-me-to-drive-my-car-with-someone-elses-advertising',
    q: 'Will you pay me to drive my car with someone else\'s advertising?',
    a: 'No. We wrap vehicles for businesses looking to advertise on their own vehicles. We are not a driver–advertiser broker (we do not find or run a database of drivers for advertisers, or vice versa).',
  },
];

// Old-site answers that state specific studio commitments or capabilities.
// NOT rendered until the shop confirms each one is true for Tri-City; their
// legacy /ufaq/ URLs redirect to /faqs/ without an anchor meanwhile. To
// publish one, move it (edited if needed) into FAQS above and point its
// redirect at /faqs/#<id>.
export const FAQS_PENDING_APPROVAL = [
  { id: 'is-there-a-guarantee-on-the-vehicle-wrap', q: 'Is there a guarantee on the vehicle wrap?', a: 'Yes, Wraptors vehicle wrap has a full warranty of 3 years.' },
  { id: 'how-long-does-it-take-to-wrap-a-car', q: 'How long does it take to wrap a car?', a: 'Our vinyl car wraps are typically completed in 2-4 days, depending on the size of the vehicle and intricacy of the wrap. Time estimates are given to our customers prior to beginning the installation process.' },
  { id: 'do-you-wrap-anything-other-than-vehicles', q: 'Do you wrap anything other than vehicles?', a: 'Yes. We have wrapped boats, jet skis, motorcycles, buildings, storefronts, tradeshow walls, appliances.' },
  { id: 'how-is-a-vehicle-wrap-designed', q: 'How is a vehicle wrap designed?', a: 'Our in-house staff of designers specialize in vehicle wrap design. They work with the client throughout the process to ensure that the message conveyed in the design accurately and appropriately reflects that of the company, product or person. Final proofs, mockups and explanations of the car wrap design are always reviewed prior to sending the job to print.' },
  { id: 'how-are-car-wraps-printed', q: 'How are car wraps printed?', a: 'Our onsite printing department and staff ensures the accurate transfer of the images through its advanced art print server. The large format printers are fitted with state of the art ink systems insuring the best color schemes and resolution available in the car wrap industry. We have carefully chosen the media we print on, which has been time tested for use in vehicle wraps.' },
  { id: 'how-do-you-wrap-a-vehicle', q: 'How do you wrap a vehicle?', a: 'Our installers are put through a rigorous apprentice program before they are given the title of expert installer. Once they have reached this level, they are capable of handling the most intricate design wrap installations. The vinyl material is accurately laid out and applied to the vehicle — the actual process is extremely precise, requires a lot of experience and is difficult to explain in writing.' },
];
