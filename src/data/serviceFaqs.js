// Service-page FAQs — customer-facing questions answered before someone
// books, not SEO copy. Keyed by the same service id used across
// SERVICE_PAGES / aftercareProducts.js (wraps, ppf, ceramic, tint).
// A service with no entry here simply doesn't render an FAQ section (see
// ServiceFaqSection.jsx) rather than showing placeholder questions.
export const SERVICE_FAQS = {
  wraps: [
    {
      q: 'How do I choose the right wrap finish for my car?',
      a: 'We normally look at the body shape, factory trim, wheels, interior colour and how loud you actually want the car to be before choosing the finish. The best wrap is the one that looks like it belongs on that specific car.',
    },
    {
      q: 'How do I keep a wrapped car looking good through an Ontario winter?',
      a: 'Do not treat it like bare paint. Hand washing is the safest option, and in winter that means rinsing road salt and slush off regularly, especially along the lower doors, rocker panels and behind the wheels. Avoid aggressive automatic brush washes, harsh degreasers and blasting a pressure washer directly into wrap edges, and clear snow with a soft brush rather than scraping the film. In summer, do not let bird droppings or tree sap sit on the wrap for days.',
    },
    {
      q: 'Can a wrap look as clean as paint up close?',
      a: 'Yes, when the installation is done properly. The difference shows around edges, corners, handles, trim and complicated body lines. A premium wrap should feel integrated into the vehicle, not like vinyl was simply laid over it.',
    },
  ],
  ppf: [
    {
      q: 'What does PPF actually protect the paint from?',
      a: 'PPF (also called clear bra, rock guard or hood film) creates a physical layer over the paint to help protect against stone chips, light scratches, road debris and everyday wear. It is especially useful on exposed areas such as the bonnet, bumper, mirrors and front fenders, where damage tends to happen first.',
    },
    {
      q: 'Do I need full body PPF or just the high impact areas?',
      a: 'Not every vehicle needs the same coverage. High impact protection makes sense when the priority is protecting the areas that take the most abuse, while full body PPF is better for owners who want more complete protection across the entire exterior. How you drive, where the car is parked and how important preserving the original paint is should determine the coverage.',
    },
    {
      q: 'Will PPF change the way my car looks?',
      a: 'Clear PPF is designed to preserve the original appearance of the paint while adding protection. There are also different finishes and colour PPF options if you actually want to change the character of the vehicle while protecting it. The installation should look integrated into the car rather than like a layer sitting on top of it.',
    },
    {
      q: 'What separates a proper PPF installation from a bad one?',
      a: 'A good installation comes down to preparation, clean alignment, controlled stretching, properly finished edges and attention around difficult panels. Poor installation usually starts showing itself around edges, corners, seams and complicated body lines. The film matters, but the person installing it matters just as much.',
    },
  ],
  ceramic: [
    {
      q: 'What does ceramic coating actually protect against?',
      a: 'It chemically bonds to the paint to create a harder, glossier, more hydrophobic surface. Water beads and slides off more easily, which carries dust and light contamination with it, and it adds a real layer of UV and chemical resistance that helps the paint hold its colour and depth over time.',
    },
    {
      q: 'Will it stop stone chips or scratches?',
      a: 'No. A coating has no meaningful thickness to absorb a physical impact like a stone chip or a key dragged across a panel. If chip and scratch protection is the priority, that is what PPF is built for — many owners run PPF on the highest-impact panels with ceramic coating over the whole car for gloss and easy maintenance.',
    },
    {
      q: 'Does my car need paint correction before coating?',
      a: 'It depends on the paint condition. A car with visible swirl marks or light scratches benefits from correction first, since coating seals the paint exactly as it finds it — existing haze or scratching is still there afterward, just under a glossier surface. Paint that is already in good shape may only need a light enhancement polish.',
    },
    {
      q: 'How do I look after a ceramic-coated car day to day?',
      a: 'Washing gets easier since less grime bonds to the surface, but it is not maintenance-free. Bird droppings, tree sap and heavy contamination should still be cleaned off in reasonable time. Fresh water spots left by tap or rinse water drying on the surface are normal and usually wipe off with a soft microfiber towel — reduced beading and a duller finish are the real signs the coating needs attention.',
    },
    {
      q: 'How long does a coating last, and does it need reapplying?',
      a: 'Longevity depends on the product used, how the car is maintained and how it is parked and driven day to day. Ask our team about the specific coating and expected lifespan as part of your quote, so you know what to expect before booking.',
    },
  ],
  tint: [
    {
      q: 'What are the benefits of window tinting?',
      a: 'Tint cuts the UV rays that fade and discolour upholstery over time, which also helps protect resale value. It reduces glare, which is a safety issue as much as a nuisance on bright days. It keeps heat out, so the cabin stays cooler for passengers and pets. And it adds privacy, making valuables inside the car harder to see, while refining the vehicle’s appearance.',
    },
    {
      q: 'How long does window tinting take?',
      a: 'Most installations take 2–4 hours, depending on the vehicle and number of windows. We take the time needed for precise application and a clean finish.',
    },
    {
      q: 'What tint options can I choose in Ontario?',
      a: 'Our team can help you choose a film for your vehicle and the look you want, and talk you through the Ontario rules that apply to tint on each window before anything is installed.',
    },
    {
      q: 'How do I care for my tinted windows?',
      a: 'Follow the installer’s recommended curing time before lowering your windows. Clean with a soft cloth and an ammonia-free cleaner, and avoid abrasive materials or sharp objects near the film.',
    },
    {
      q: 'Does window tinting come with a warranty?',
      a: 'Ask our team about the manufacturer and installation warranty available with your selected film.',
    },
  ],
  starlight: [
    {
      q: 'How many stars and what colours can I choose?',
      a: 'Density runs from 500 stars for a subtle effect up to 2,500 for a fuller night sky, and colour is fully customisable — from Pure White and Ice Blue through Warm Gold, Purple, Emerald and more. You can preview combinations before committing to a layout.',
    },
    {
      q: 'Can I add a shooting star effect?',
      a: 'Yes, it is an optional addition on top of the standard fixed layout, giving the ceiling occasional movement rather than a completely static field.',
    },
    {
      q: 'Will the installation fit my vehicle’s headliner?',
      a: 'Layout, density and visual direction are planned around your specific cabin so the finished installation feels integrated into the vehicle rather than added afterward. We assess the headliner before confirming a design.',
    },
    {
      q: 'What is a galaxy ceiling?',
      a: 'A galaxy ceiling turns the inside of the roof into a starry-night design feature. It is planned the same way as a starlight headliner — around your cabin, with the look agreed before anything is installed.',
    },
    {
      q: 'How long does a starlight installation take?',
      a: 'Timelines vary depending on star count, headliner complexity and whether the shooting star effect is included. We can give you a clearer timeframe once we have reviewed your vehicle.',
    },
  ],
  detailing: [
    {
      q: 'What does the standard detailing package include?',
      a: 'Both the interior and exterior. Outside, the vehicle is hand washed with pH-neutral soap and finished without streaks or water spots. Inside, it is fully vacuumed and the dashboard, console, door trims, door jambs and footwells are cleaned.',
    },
    {
      q: 'Is detailing worth doing in winter?',
      a: 'Yes. Salt and sand from winter roads build up on paint, wheels and the underbody, and regular cleaning removes them before they have months to sit on the car.',
    },
    {
      q: 'Can detailing be combined with ceramic coating?',
      a: 'Yes. A properly cleaned and prepared surface is the starting point for a ceramic coating, so the two can be planned together.',
    },
    {
      q: 'How is the price worked out?',
      a: 'Once you get in touch, our team calls you to arrange an in-person, fixed-price offer — and you only pay once the job is completed and you are satisfied.',
    },
  ],
  'custom-interiors': [
    {
      q: 'What are the custom floor mats made from?',
      a: 'They are handmade in genuine materials, chosen with you during the design process. We talk through the options for your vehicle at consultation.',
    },
    {
      q: 'Can you change the colour of my interior?',
      a: 'Yes — interior colour can be changed with custom leather or leather-feel vinyl.',
    },
    {
      q: 'Do I need to have a design in mind?',
      a: 'No. Every project starts from scratch with you, working through layout, artwork and materials together.',
    },
  ],
  'stripes-decals': [
    {
      q: 'Can you design a stripe or decal from scratch?',
      a: 'Yes. You can choose from a range of pre-made stripes, or work with the team on a bespoke design — and decals can be sourced for you or designed from scratch.',
    },
    {
      q: 'Where on the car can stripes go?',
      a: 'Common placements are over the hood, across the trunk and along the sides. Placement is planned around the car’s body lines.',
    },
    {
      q: 'Can I mix colours?',
      a: 'Yes — a monochrome stripe for a subtle look, or a colour combination that contrasts with the paint.',
    },
  ],
  'caliper-painting': [
    {
      q: 'Can you match my calipers to my paint colour?',
      a: 'Yes. Calipers can be painted to match the existing body colour, or in a contrasting colour or design.',
    },
    {
      q: 'Can caliper painting be part of a bigger build?',
      a: 'Yes — it works well as part of a complete restyle alongside a wrap, wheel painting or stripes.',
    },
    {
      q: 'How do I get a price?',
      a: 'Send your vehicle details through the quote form. Our team then arranges an in-person, fixed-price offer, and you only pay once the job is completed.',
    },
  ],
  'wheel-painting': [
    {
      q: 'Which wheels can you paint?',
      a: 'Wheels of all sizes, makes and models. We look at the wheels before confirming the work.',
    },
    {
      q: 'Is it only full colour changes?',
      a: 'No — it can be a complete colour change or smaller detail work, depending on the look you want.',
    },
    {
      q: 'Why not paint wheels myself?',
      a: 'Using the wrong materials on wheels can cost far more than the job itself. The Wraptors team uses premium-quality products chosen for both the finish and the safety of the wheel.',
    },
  ],
  'custom-builds': [
    {
      q: 'Will a body kit fit my vehicle?',
      a: 'Fitment depends on your specific make, model and the kit itself. We assess compatibility for your vehicle before confirming any installation.',
    },
    {
      q: 'Can I supply my own body kit?',
      a: 'Yes, we can work with a body kit you provide. We review the parts alongside your vehicle to confirm fitment and installation requirements before starting.',
    },
    {
      q: 'How long does a custom build take?',
      a: 'Timelines vary depending on the scope of the build, parts availability and the amount of fitment work involved. We can give you a clearer timeframe once we have reviewed your project.',
    },
    {
      q: 'How do I get a quote for a custom build?',
      a: 'Share your vehicle details and what you have in mind through the quote form on this page, or reach out to our team directly, and we will walk you through the next steps.',
    },
  ],
};
