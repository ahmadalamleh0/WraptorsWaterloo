import { Routes, Route, useLocation, useNavigationType } from 'react-router-dom';
import { useEffect } from 'react';
import './App.css';

function ScrollToTop() {
  const { pathname } = useLocation();
  const navType = useNavigationType();
  useEffect(() => {
    // PUSH = user clicked a link forward → go to top
    // POP  = browser back/forward → let browser restore previous position
    if (navType !== 'POP') {
      window.scrollTo(0, 0);
    }
  }, [pathname, navType]);
  // A first visit with a #hash (e.g. a legacy URL redirected to
  // /faqs/#<question> or /services/wraps/#commercial-wraps) arrives before
  // React has rendered the target, so the browser's own jump misses it.
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1));
    if (!id) return undefined;
    const frame = requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({ block: 'start' });
    });
    return () => cancelAnimationFrame(frame);
  }, []);
  return null;
}

import OfflinePresentationMode from './components/OfflinePresentationMode';

// Home page sections
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import HeroVideo from './components/HeroVideo';
import Statement from './components/Statement';
import ServicesIntro from './components/ServicesIntro';
import Services from './components/Services';
// Restored services section from the Dubai coming-soon landing page
// (see components/original-services). Switch HOME_SERVICES back to
// 'tiles' to return to the image-tile Services section above.
import OriginalServicesSection from './components/original-services/ServicesSection';
const HOME_SERVICES = 'original'; // 'original' | 'tiles'
import SignatureBuilds from './components/SignatureBuilds';
import NeonSign from './components/NeonSign';
// Vehicle selector and quote form preserved but disabled for this deploy —
// see src/features/vehicle-selector/README.md and
// src/features/quote-form-draft/README.md to restore either one.
import VisitUs from './components/VisitUs';
import TrustedBrands from './components/TrustedBrands';
import GlobalLocations from './components/GlobalLocations';
import QuoteSection from './components/QuoteSection';
import ClientReviews from './components/ClientReviews';
import ServiceAreas from './components/ServiceAreas';
// Contact section temporarily taken off the live site — component
// untouched at src/components/ContactSection.jsx, restore by re-adding
// this import and <ContactSection /> below ClientReviews.
import Icons from './components/Icons';
import YoutubeReel from './components/YoutubeReel';
// Reviews ("Proof in every finish") and BookingCTA ("Ready when you are.
// Book your Wraptors visit.") temporarily taken off the home page —
// components untouched, restore by re-adding these imports and
// <Reviews /> <BookingCTA /> below <YoutubeReel />.
// Academy ("Learn the craft behind the transformation") temporarily taken
// off the live site — component untouched at src/components/Academy.jsx,
// restore by re-adding this import and <Academy /> below Reviews.
import Footer from './components/Footer';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import MobileQuoteCta from './components/MobileQuoteCta';

// Service page template
import ServicePage from './components/ServicePage';
import StarlightPage from './components/StarlightPage';
import PPFPage from './components/PPFPage';

// GEO system — one reusable template rendered from centralized data.
// Add/edit/remove a service area in src/data/geoLocations.js only.
import GeoPage from './components/GeoPage';
import { LOCATIONS } from './data/geoLocations';

// Learn / Insights system — one reusable hub + one reusable article
// template, both rendered from src/data/articles.js.
import LearnHub from './components/LearnHub';
import ArticlePage from './components/ArticlePage';
import { LEARN_ENABLED } from './data/articles';
import NotFoundPage from './components/NotFoundPage';
import AboutPage from './components/AboutPage';
import BookingPage from './components/BookingPage';
import FranchisePage from './components/FranchisePage';
import { ServicesHubPage, GalleryPage, LocationsPage, VideosPage, FaqPage, PressPage } from './components/LegacyPages';
import WrapsPage from './components/WrapsPage';
import TintPage from './components/TintPage';

// Hero images for each generic service page (Vehicle Wraps, PPF and
// Starlight have their own dedicated page components with bespoke
// content; these three share the ServicePage template).
import heroCeramic    from '../47325374-c1b0-4233-8a29-5edee0bf07b4.png';
import ceramicNew1    from '../Ceramic Coating(new1).jpeg';
import ceramicNew2    from '../Ceramic Coating(new2).jpeg';
import ceramicNew3    from '../Ceramic Coating(new3).jpeg';
import lambo1         from '../Wraptors Media/572658115_18375844528146462_7044016670246006823_n.jpg';
import lambo2         from '../Wraptors Media/573643633_18375844501146462_1338566802707597600_n.jpg';
import lambo3         from '../Wraptors Media/574454404_18375844462146462_4088331334435453680_n.jpg';
import heroCustomBuilds from '../Wraptors Media/Custom Builds/531390763_18364031848146462_3978469811072555494_n.jpg';
// Cadillac Escalade widebody (client photos, 2026-11-04) — second
// collection on the Custom Builds page.
import escaladeWidebody1 from '../Wraptors Media/Custom Builds/escalade-widebody-1.jpg';
import escaladeWidebody2 from '../Wraptors Media/Custom Builds/escalade-widebody-2.jpg';
import escaladeWidebody3 from '../Wraptors Media/Custom Builds/escalade-widebody-3.jpg';
import customBuild1     from '../Wraptors Media/Custom Builds/673155098_18356001145208168_5151499152980611431_n.jpg';
import customBuild2     from '../Wraptors Media/Custom Builds/561637580_18371224492146462_3850630907551928576_n.jpg';
import customBuild3     from '../Wraptors Media/Custom Builds/773757448_18417489721146462_1403236065123085975_n.jpg';
// A second, dedicated collection just for the Bentley — front 3/4 plus two
// detail shots of the same car.
import bentley1         from '../Wraptors Media/Custom Builds/621837139_18385536877146462_5187708123866638297_n - Copy.jpg';
import bentley2         from '../Wraptors Media/Custom Builds/621830079_18385536943146462_3092230599324494560_n.jpg';
import bentley3         from '../Wraptors Media/Custom Builds/621972300_18385536895146462_9042249166876917996_n.jpg';
import bentley4         from '../Wraptors Media/Custom Builds/621825480_18385536931146462_7726450832093630152_n.jpg';
import bentley5         from '../Wraptors Media/Custom Builds/621855805_18385536934146462_1336625565261466261_n.jpg';
import { LOCATION } from './config/location.js';
// Hero images for the services carried over from the old WordPress site.
// All existing Wraptors photography — used as illustrative heroes only,
// not captioned as examples of that specific service.
import heroDetailing      from '../Detailing.jpeg';
import heroInteriors      from '../Wraptors Media/616229612_18384175534146462_9012363648025181528_n.jpg';
import heroStripes        from '../Wraptors Media/777023973_18418163749146462_8520045824263708492_n.jpg';
import heroCalipers       from '../Ferrari(white_3).jpeg';
import heroWheels         from '../Wraptors Media/561235066_18371224444146462_3625533511021440012_n.jpg';

// The studio's own three-step booking process, as published on the old
// wraptorstricity.com service pages (checked 2026-10-29) — shared by the
// services carried over from it.
const STUDIO_PROCESS = [
  { n: '01', title: 'Contact Our Team',   desc: 'Tell us about your vehicle and what you have in mind using the quote form below, or call the studio.' },
  { n: '02', title: 'We Book You In',     desc: 'Our team calls you to arrange an in-person, fixed-price offer before any work begins.' },
  { n: '03', title: 'Pay When Completed', desc: 'You only pay once the job is finished and you are satisfied with the result.' },
];

// Every service page follows the same hero + intro system (see
// ServiceHero / ServiceIntroSection) — only media and wording change here.
const SERVICE_PAGES = [
  {
    path:     '/services/ceramic',
    title:    'Ceramic Coating',
    heroEyebrow: `${LOCATION.brandName} · Ceramic Coating`,
    heroHeadline: 'Exceptional Finish.\nLasting Protection.',
    heroHeadlineCompact: true,
    heroSupportingLine: 'Paint Enhancement · Ceramic Protection · Deep Gloss',
    heroImg:  heroCeramic,
    introImage: ceramicNew2,
    benefits: [
      { num: '01', title: 'Long-Lasting Shine',        desc: 'Helps keep the paint glossy, vibrant and easier to maintain over time.' },
      { num: '02', title: 'Showroom-Quality Finish',   desc: 'Adds depth and clarity to the paint for a smoother, more reflective finish.' },
      { num: '03', title: 'Paint Defense',             desc: 'Helps protect against oxidation, stains, bird droppings and light surface marks.' },
      { num: '04', title: 'Easier Maintenance',        desc: 'Dirt and contamination are easier to remove, reducing the effort needed to keep the car looking clean.' },
    ],
    galleryImages: [lambo1, lambo2, lambo3],
    tagline:  'Glass-hard protection with a permanent shine. 9H-rated ceramic formula that bonds to your paint for years of effortless gloss.',
    introKicker: 'Your Finish',
    introStatement: 'Refined.',
    introDescription: 'Ceramic coating at Wraptors starts with the condition of the paint. We inspect and prepare the surface first, correct or enhance it where required, then apply the coating to preserve the finish, improve gloss and make ongoing maintenance easier.',
    processEyebrow: 'The Process',
    processHeading: 'From Prep To Protection.',
    processSteps: [
      {
        n: '01',
        title: 'Inspection',
        desc: 'We begin by checking the condition of the paint and understanding what the vehicle needs before any coating is applied. This tells us whether the finish is ready as it is or needs correction first.',
      },
      {
        n: '02',
        title: 'Preparation',
        desc: 'The vehicle is washed, decontaminated and properly prepared so the surface is clean and ready for correction or coating. This stage is critical to how well the final result performs.',
      },
      {
        n: '03',
        title: 'Paint Refinement',
        desc: 'Where needed, the paint is corrected or enhanced to improve gloss, clarity and overall finish before it is sealed. Coating should preserve a strong finish, not cover a weak one.',
      },
      {
        n: '04',
        title: 'Coating & Final Finish',
        desc: 'The ceramic coating is applied with attention to coverage and finish, then the vehicle is checked and completed so the final result looks clean, deep and properly protected.',
      },
    ],
    splitBanner: {
      img1: ceramicNew1,
      img2: ceramicNew3,
      text: 'PRESERVE THE FINISH.',
    },
    learnCategory: 'ceramic-coating',
  },
  {
    path:     '/services/custom-builds',
    title:    'Custom Builds & Body Kits',
    heroEyebrow: `${LOCATION.brandName} · Custom Builds & Body Kits`,
    heroHeadline: 'Custom Builds &\nBody Kits',
    heroHeadlineCompact: true,
    heroLowerContent: true,
    heroSupportingLine: 'A more individual expression of your vehicle, through considered styling, precise fitment and attention to the complete build.',
    heroImg:  heroCustomBuilds,
    tagline:  `Custom builds and body kits at ${LOCATION.brandName} — styling upgrades and exterior transformations fitted with precision at our ${LOCATION.address.locality} studio.`,
    introKicker: 'Your Vision',
    introStatement: 'Realized.',
    introDescription: 'Custom builds and body kits are approached around the individual vehicle — fitment, proportions and finish are planned together before any panel is touched. From considered styling upgrades to complete exterior transformations, every build is carried out with attention to how each piece integrates with the car.',
    galleryImages: [customBuild1, customBuild2, customBuild3],
    galleryCaption: 'Custom Builds & Body Kits',
    midSectionTitle: 'Every Detail. One Vision.',
    midSectionDescription: 'A distinctive build comes from how the details work together. Body lines, materials and finishing touches are considered as a whole, creating a vehicle that feels individual from every angle.',
    featuredProject: {
      label: 'Featured Project',
      title: 'Bentley Bentayga',
      mainImage: bentley1,
      detailImages: [bentley4, bentley2, bentley5, bentley3],
    },
    secondaryGalleryImages: [escaladeWidebody1, escaladeWidebody2, escaladeWidebody3],
    secondaryGalleryCaption: 'Cadillac Escalade Widebody',
    learnCategory: 'custom-builds',
  },
  // ── Services carried over from the old WordPress site ──
  // Copy sticks to what the live site describes for each service — no
  // prices, products, durations or warranties that weren't stated there.
  {
    path:     '/services/detailing',
    title:    'Auto Detailing',
    heroEyebrow: `${LOCATION.brandName} · Auto Detailing`,
    heroHeadline: 'Showroom Clean.\nInside And Out.',
    heroHeadlineCompact: true,
    heroSupportingLine: 'Exterior Detailing · Interior Detailing · Winter Salt Removal',
    heroImg:  heroDetailing,
    tagline:  `Interior and exterior auto detailing at ${LOCATION.brandName} in ${LOCATION.address.locality}: pH-neutral hand washing, a full interior clean and winter salt removal.`,
    introKicker: 'Your Car',
    introStatement: 'Restored.',
    introDescription: 'Our standard detailing package covers both the interior and the exterior. Outside, the vehicle is hand washed with pH-neutral soap and finished without streaks or water spots. Inside, it gets a complete vacuum and a careful clean of the dashboard, console, door trims, door jambs and footwells — so the car looks right from every angle, not just the paintwork.',
    benefitsHeading: 'Why Detail Regularly',
    benefits: [
      { num: '01', title: 'Paint That Lasts',      desc: 'Regular washing, polishing and protection help keep paint from dulling and oxidising over time.' },
      { num: '02', title: 'Winter Salt Removed',   desc: 'Salt and sand from Ontario winter roads are cleaned off before they spend months on the paint, wheels and underbody.' },
      { num: '03', title: 'A Fresher Interior',    desc: 'Stains, dust and grime are lifted from carpets, seats and trim, keeping the cabin clean and fresh.' },
      { num: '04', title: 'Better Resale Value',   desc: 'A well-maintained car presents better when it is time to sell or trade it in.' },
    ],
    processEyebrow: 'How It Works',
    processHeading: 'Three Steps To A Fresh Ride.',
    processSteps: STUDIO_PROCESS,
    learnCategory: 'ceramic-coating',
  },
  {
    path:     '/services/custom-interiors',
    title:    'Custom Interiors',
    heroEyebrow: `${LOCATION.brandName} · Custom Interiors`,
    heroHeadline: 'Stock Is Boring.\nMake It Yours.',
    heroHeadlineCompact: true,
    heroSupportingLine: 'Custom Floor Mats · Leather & Leatherette · Interior Colour Change',
    heroImg:  heroInteriors,
    tagline:  `Custom interiors at ${LOCATION.brandName} in ${LOCATION.address.locality}: handmade floor mats designed with you, and interior colour changes in leather or leather-feel vinyl.`,
    introKicker: 'Your Interior',
    introStatement: 'Personalised.',
    introDescription: 'Every custom interior starts from scratch with you — layout, artwork and materials are worked out together before anything is made. Floor mats are handmade in genuine materials and inspected before they go into the car, and the interior colour itself can be changed with custom leather or leather-feel vinyl.',
    benefitsHeading: 'What We Can Do',
    benefits: [
      { num: '01', title: 'Handmade Floor Mats',    desc: 'Custom vehicle floor mats made by hand in genuine materials, each one inspected before it is fitted.' },
      { num: '02', title: 'Designed With You',      desc: 'Layout, artwork and materials are chosen together from the first conversation, not picked from a catalogue.' },
      { num: '03', title: 'Interior Colour Change', desc: 'Change the colour of your interior with custom leather or leather-feel vinyl.' },
      { num: '04', title: 'A Complete Cabin',       desc: 'Combine new mats and trim with a starlight headliner or galaxy ceiling for a fully reworked interior.' },
    ],
    processEyebrow: 'How It Works',
    processHeading: 'From Idea To Interior.',
    processSteps: STUDIO_PROCESS,
  },
  {
    path:     '/services/stripes-decals',
    title:    'Racing Stripes & Decals',
    heroEyebrow: `${LOCATION.brandName} · Racing Stripes & Decals`,
    heroHeadline: 'Stripes & Decals.\nInstant Character.',
    heroHeadlineCompact: true,
    heroSupportingLine: 'Racing Stripes · Pre-Made & Bespoke Designs · Custom Decals',
    heroImg:  heroStripes,
    tagline:  `Racing stripes and decals at ${LOCATION.brandName} in ${LOCATION.address.locality}: pre-made or bespoke designs on the hood, trunk or sides, and decals sourced or designed for you.`,
    introKicker: 'Your Style',
    introStatement: 'Signed.',
    introDescription: 'Racing stripes are a Wraptors specialty. Choose from a wide range of pre-made stripes or work with the team on something completely bespoke — monochrome or an eye-catching colour combination, on the hood, across the trunk or down the sides. Decals are one of the quickest ways to add personality: we can source the decal you have in mind or design one from scratch.',
    benefitsHeading: 'Your Options',
    benefits: [
      { num: '01', title: 'Pre-Made Or Bespoke',        desc: 'Pick from a range of pre-made stripe designs or develop a one-off design with the team.' },
      { num: '02', title: 'Placement That Fits',        desc: 'Over the hood, across the trunk or along the sides — placed to suit the car’s lines.' },
      { num: '03', title: 'Colour Your Way',            desc: 'Monochrome for a subtle look, or a contrasting colour combination that stands out.' },
      { num: '04', title: 'Decals, Sourced Or Designed', desc: 'We can source and apply the decal you want, or design something from scratch.' },
    ],
    processEyebrow: 'How It Works',
    processHeading: 'From Sketch To Street.',
    processSteps: STUDIO_PROCESS,
    learnCategory: 'vehicle-wraps',
  },
  {
    path:     '/services/caliper-painting',
    title:    'Caliper Painting',
    heroEyebrow: `${LOCATION.brandName} · Caliper Painting`,
    heroHeadline: 'Colour Behind\nThe Spokes.',
    heroHeadlineCompact: true,
    heroSupportingLine: 'Colour-Matched · Contrast Finishes · Custom Designs',
    heroImg:  heroCalipers,
    tagline:  `Brake caliper painting at ${LOCATION.brandName} in ${LOCATION.address.locality}: matched to your body colour or chosen as a contrast, on its own or as part of a full restyle.`,
    introKicker: 'Your Calipers',
    introStatement: 'Restyled.',
    introDescription: 'Calipers are one of the details people notice once the wheels stop turning. We can paint yours to match the existing body colour, pick a contrast that shows through the spokes, or include them in a complete restyling package alongside wraps, wheels and stripes.',
    benefitsHeading: 'Ways To Go',
    benefits: [
      { num: '01', title: 'Match The Body',      desc: 'Calipers painted to tie in with the car’s existing colour.' },
      { num: '02', title: 'Make Them Stand Out', desc: 'A contrasting colour or design that shows through the wheel spokes.' },
      { num: '03', title: 'Part Of A Restyle',   desc: 'Planned together with a wrap, wheels or stripes so every detail works as one.' },
      { num: '04', title: 'A Wide Colour Range', desc: 'A large range of colours and designs to choose from, talked through at consultation.' },
    ],
    processEyebrow: 'How It Works',
    processHeading: 'Three Steps To New Calipers.',
    processSteps: STUDIO_PROCESS,
  },
  {
    path:     '/services/wheel-painting',
    title:    'Wheel Painting',
    heroEyebrow: `${LOCATION.brandName} · Wheel Painting`,
    heroHeadline: 'Wheels That\nFinish The Look.',
    heroHeadlineCompact: true,
    heroSupportingLine: 'Colour Changes · Detail Work · All Sizes, Makes & Models',
    heroImg:  heroWheels,
    tagline:  `Wheel painting at ${LOCATION.brandName} in ${LOCATION.address.locality}: wheels of all sizes, makes and models, finished with premium-quality products for style and safety.`,
    introKicker: 'Your Wheels',
    introStatement: 'Refinished.',
    introDescription: 'Wheels are not the place for shortcuts. Whether it is a full colour change or a bit of detail work, using the wrong materials can cost far more than the job itself. That is why the Wraptors team uses premium-quality products, chosen for the finish and for the safety of the wheel, on wheels of all sizes, makes and models.',
    benefitsHeading: 'Why Wraptors',
    benefits: [
      { num: '01', title: 'Any Size, Make Or Model', desc: 'Wheels of all sizes, makes and models.' },
      { num: '02', title: 'Premium Products',        desc: 'Materials chosen for the quality of the finish and the safety of the wheel.' },
      { num: '03', title: 'A Wide Colour Range',     desc: 'A broad range of colours to match the car, contrast with it or change the look completely.' },
      { num: '04', title: 'Full Colour Or Detail',   desc: 'A complete colour change or smaller detail work — whichever the build needs.' },
    ],
    processEyebrow: 'How It Works',
    processHeading: 'Three Steps To New Wheels.',
    processSteps: STUDIO_PROCESS,
  },
];

function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <HeroVideo />
        <ServicesIntro />
        {HOME_SERVICES === 'original' ? (
          // id keeps the /#services links working; the wrapper has no styling.
          <div id="services"><OriginalServicesSection /></div>
        ) : (
          <Services />
        )}
        <Statement />
        <SignatureBuilds />
        {/* Where the studio is, who it serves (brands banner after it, as before), the wider network, then the quote form. */}
        <VisitUs />
        <ServiceAreas />
        <TrustedBrands />
        <GlobalLocations />
        <QuoteSection id="cta" />
        <NeonSign location="Tri-City" />
        <ClientReviews />
        <Icons />
        <YoutubeReel />
      </main>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <>
    <ScrollToTop />
    <OfflinePresentationMode />
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/services/wraps"    element={<WrapsPage />} />
      <Route path="/services/starlight" element={<StarlightPage />} />
      <Route path="/services/ppf"      element={<PPFPage />} />
      <Route path="/services/tint"     element={<TintPage />} />
      {SERVICE_PAGES.map(svc => (
        <Route
          key={svc.path}
          path={svc.path}
          element={<ServicePage {...svc} />}
        />
      ))}
      {LOCATIONS.map(loc => (
        <Route
          key={loc.slug}
          path={`/areas/${loc.slug}`}
          element={<GeoPage location={loc} />}
        />
      ))}
      {LEARN_ENABLED && <Route path="/learn" element={<LearnHub />} />}
      {LEARN_ENABLED && <Route path="/learn/category/:categorySlug" element={<LearnHub />} />}
      {LEARN_ENABLED && <Route path="/learn/:articleSlug" element={<ArticlePage />} />}
      <Route path="/about" element={<AboutPage />} />
      <Route path="/book" element={<BookingPage />} />
      <Route path="/franchise" element={<FranchisePage />} />
      {/* Old WordPress URLs kept as real pages (SEO-MIGRATION-AUDIT.md) */}
      <Route path="/services" element={<ServicesHubPage />} />
      <Route path="/gallery" element={<GalleryPage />} />
      <Route path="/locations" element={<LocationsPage />} />
      <Route path="/videos" element={<VideosPage />} />
      <Route path="/faqs" element={<FaqPage />} />
      <Route path="/articles" element={<PressPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
    {/* Mobile-only floating Get a Quote link, site-wide. */}
    <MobileQuoteCta />
    {/* Site-wide floating WhatsApp button (every route), opposite the
        mobile Get a Quote pill. */}
    <FloatingWhatsApp />
    </>
  );
}
