// ══ LOCAL NOTES ON SERVICE PAGES ══
// One short Waterloo Region section per core service page, rendered by
// ServiceLocal just before the quote form. The rest of each service page
// is brand copy shared with other Wraptors locations; this is the part
// that's specific to this studio and the drivers it serves.
//
// Rules for this copy (see SEO-MIGRATION-AUDIT.md):
//  - one physical studio, in Waterloo; customers bring their vehicles to
//    it. No second location, pickup or mobile service is implied;
//  - local facts only where they're general and checkable (road names,
//    the townships, winter road salt); no prices, durations, warranties
//    or statistics;
//  - no repeat of what the page's own FAQ already says (winter wrap care,
//    winter detailing, tint options).
// A service with no entry here simply has no local section.

import { LOCATION } from '../config/location.js';

const STUDIO = LOCATION.address.display;

// Small label above each local section's heading.
export const SERVICE_LOCAL_EYEBROW = 'Waterloo Region';

export const SERVICE_LOCAL = {
  wraps: {
    heading: 'Wrapped In Waterloo.',
    body: [
      `Every wrap is planned and installed at our studio at ${STUDIO}. ${LOCATION.brandName} has one studio, here in Waterloo, and customers from Kitchener, Cambridge and the surrounding townships bring their vehicles to it.`,
      'For a business vehicle, the Region is the audience. A van or pickup that works the 401, the Conestoga Parkway and Highway 8 every day is seen by a lot of local drivers, so we lay out commercial designs to read at a distance and in traffic, and to stay legible under a winter of road spray.',
    ],
  },
  ppf: {
    heading: 'Built For Highway Kilometres.',
    body: [
      'A lot of driving in Waterloo Region happens on the 401, Highway 8 and the Conestoga Parkway, and winter roads add sand and grit to the traffic. That is where chips come from: the front bumper, the leading edge of the hood, the mirrors and the panels behind the wheels.',
      `If most of your kilometres are highway commuting, the front end is the sensible place to start. Cars that also see gravel roads out in the townships benefit from coverage low on the doors and behind the wheels. We look at how the car is actually driven before recommending coverage, and every installation is done at our studio in ${LOCATION.address.locality}.`,
    ],
  },
  ceramic: {
    heading: 'Easier Through Salt Season.',
    body: [
      'Winters here mean months of road salt and slush on the paint. A ceramic coating does not stop that from landing on the car, but it makes it easier to rinse off, and less of it stays bonded to the surface between washes. Spring tree sap and pollen are the same story.',
      `Cars often arrive straight out of winter, so inspection and decontamination come first: the coating is only applied once the paint is clean and ready. All of it happens at our studio in ${LOCATION.address.locality}, which customers from Kitchener and Cambridge drive in to.`,
    ],
  },
  tint: {
    heading: 'Summer Sun, Winter Glare.',
    body: [
      'Southern Ontario summers bring long, hot days, and a car parked in an open lot all day gets the full sun through the glass. Low winter sun reflecting off snow can be just as hard on the eyes. A quality film helps with heat and glare in both seasons and keeps the interior out of the sun.',
      `Ontario's Highway Traffic Act sets rules for tint on vehicle windows, so we go through what applies to each window of your car before anything is fitted. Tint is installed at our studio in ${LOCATION.address.locality}; customers come in from across Waterloo Region.`,
    ],
  },
  detailing: {
    heading: 'After The Snow, Before The Next.',
    body: [
      'Salt season in Waterloo Region runs for months, and what builds up on the paint, wheels and carpets does not leave on its own. A detail once the snow is gone clears it before it sits through another season, and one in the fall gets the car clean before the roads are treated again.',
      `Detailing is done at our studio at ${STUDIO}. Customers from Waterloo, Kitchener, Cambridge and the townships bring their cars to us.`,
    ],
  },
};
