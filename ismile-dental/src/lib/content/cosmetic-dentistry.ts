import type { PageContent } from "@/lib/content/types";

// Copy transcribed verbatim from copy/03-cosmetic-dentistry.md, page 1 (hub).
//
// TWO LAUNCH BLOCKERS carried from the old page, both omitted here:
//  - The "10-year guarantee ... to all our patients with any treatment that is
//    completed" claim. Under CAP a guarantee needs written terms available to
//    the consumer, and under GDC guidance clinical outcomes cannot be
//    guaranteed. It also contradicts the five-year claim on the old Our Story
//    page.
//  - The comparative mercury-free claim, which needs evidence under CAP.
//    Reduced to the plain factual statement.
//
// The old page's amalgam toxicity passage — comparing mercury to lead, cadmium
// and arsenic and citing an absorption rate — is deliberately not carried
// over. Health claims of that kind need cited evidence held on file and sit
// awkwardly against GDC guidance on not causing unnecessary alarm.
//
// Irreversibility of veneer and crown preparation is stated in three places on
// this page. That repetition is deliberate; do not tidy it away.

export const cosmeticDentistry: PageContent = {
  slug: "/cosmetic-dentistry/",
  metaTitle: "Cosmetic Dentistry Tunbridge Wells | iSmile Dental",
  metaDescription:
    "Veneers, bonding, whitening and Invisalign in Tunbridge Wells. See which cosmetic treatment suits your teeth and what it costs. Call 01892 547286.",
  h1: "Cosmetic Dentistry in Tunbridge Wells — Like Your Own Smile Again",
  primaryKeyword: "cosmetic dentistry Tunbridge Wells",
  secondaryKeywords: [
    "cosmetic dentist Tunbridge Wells",
    "smile makeover Tunbridge Wells",
    "cosmetic dental treatment cost UK",
    "how to fix chipped teeth",
    "teeth straightening and whitening Kent",
  ],
  coreDesire:
    "To like their own smile. To know what the options actually are, what each one costs, and which one is right for the specific thing that bothers them.",
  breadcrumb: [
    { label: "Home", href: "/" },
    { label: "Cosmetic Dentistry", href: "/cosmetic-dentistry/" },
  ],
  procedure: {
    name: "Cosmetic Dentistry",
    description:
      "Dental treatment carried out mainly to improve how teeth look — their colour, shape, size, alignment or spacing — rather than to treat pain or disease.",
  },
  reviewed: {
    by: "Dr Simon Azimi, GDC 81382",
    date: { placeholder: "[PLACEHOLDER: last reviewed date]" },
  },

  sections: [
    {
      type: "hero",
      h1: "Cosmetic Dentistry in Tunbridge Wells — Like Your Own Smile Again",
      subhead:
        "Whitening, bonding, veneers and clear aligners, explained plainly — so you can work out which one actually fixes the thing that bothers you.",
      formHeading: "Book your cosmetic consultation",
      formOptions: [
        "Cosmetic Dentistry — not sure yet",
        "Teeth whitening",
        "Composite bonding",
        "Dental veneers",
        "Invisalign clear aligners",
        "Dental implants",
      ],
      buttonLabel: "Request my consultation",
      underForm: [
        "Prefer to talk? Call **01892 547286**",
        "No pressure and no obligation — just a conversation about what's possible and what it costs.",
      ],
    },

    {
      type: "trustStrip",
      items: [
        "Treated by Dr Simon Azimi, GDC 81382",
        "Opposite Tunbridge Wells station",
        "Mercury-free practice",
        { placeholder: "[PLACEHOLDER: X.X ★ on Google]" },
        "Written plan and price before you commit",
      ],
    },

    {
      type: "recognise",
      h2: "Most people don't want a different smile. They want to stop noticing their own.",
      body: [
        [
          "You have a photograph face. You know the one — the closed-mouth version you do without thinking, because the open version shows the tooth.",
        ],
        [
          "Maybe it's one tooth that's darker than the rest and always has been. Maybe it's the chip from a hockey ball in 1998 that you've stopped mentioning because everyone says they can't see it, and you can. Maybe your teeth have crowded slowly over twenty years and the front two now overlap in a way they didn't used to.",
        ],
        [
          "Or it's nothing that specific. Your teeth just look older than the rest of you, and you can't quite say why.",
        ],
        [
          "Then something puts a date on it. A wedding. A round of interviews. A big birthday, or a photograph you'd like to keep.",
        ],
        [
          "None of this is vanity. Your smile is the first thing people see and the thing you have least control over. Wanting it to look like you on a good day is an entirely reasonable thing to want.",
        ],
      ],
    },

    {
      type: "outcome",
      h2: "What actually changes",
      body: [
        ["The change most people describe isn't dramatic. It's that they stop editing."],
        [
          "They stop checking photos before anyone else sees them. They stop covering their mouth in meetings. They laugh at the thing that's funny instead of half a second later, with a hand up.",
        ],
        [
          "Good cosmetic dentistry doesn't announce itself. Done well, nobody says “you've had your teeth done.” They say you look well, and they can't work out why. The shade suits your face. The edges are slightly irregular, the way real teeth are. The tooth that used to catch your eye simply doesn't any more.",
        ],
        [
          "And underneath the appearance, something practical usually improves too. Straighter teeth are easier to clean. A repaired chip stops catching your lip. A worn edge that's been rebuilt takes the load properly again.",
        ],
        ["You get to stop thinking about it. That's the whole point."],
      ],
    },

    {
      type: "whyChoose",
      h2: "Why patients across Tunbridge Wells choose us for cosmetic treatment",
      points: [
        {
          title: "One dentist, who tells you what he'd do and what he wouldn't.",
          body: [
            "Dr Simon Azimi plans and carries out your treatment himself. If the answer to what's bothering you is whitening and a small bit of bonding rather than eight veneers, that's what you'll be told — even though it's the smaller job.",
          ],
        },
        {
          title: "We start with what's underneath.",
          body: [
            "Cosmetic work goes on top of healthy teeth and gums, not instead of them. Decay, gum disease and a heavy bite get dealt with first. It isn't the exciting part, but it's the difference between work that lasts and work that fails in eighteen months.",
          ],
        },
        {
          title: "Conservative first.",
          body: [
            "Where two treatments would get you a similar result, we'll usually recommend the one that removes less of your tooth. Bonding before veneers. Aligners before crowns. Tooth structure is the one thing you can't get back.",
          ],
        },
        {
          title: "You'll know the cost before you decide.",
          body: [
            "You leave the consultation with a written plan, the options set out side by side, and a full price on each. ",
            {
              placeholder:
                "[PLACEHOLDER: confirm whether payment plans or finance are offered — if so, FCA-compliant wording is required]",
            },
          ],
        },
        {
          title: "Built for people who don't like the dentist.",
          body: [
            "Plenty of people who come in for cosmetic treatment haven't been to a dentist in years, often because of something that happened a long time ago. That's normal here. We explain before we do, we stop when you ask, and nobody is made to feel foolish.",
          ],
        },
        {
          title: "A mercury-free practice.",
          body: [
            "We use tooth-coloured, mercury-free materials throughout, and we can replace old amalgam fillings with white composite where you'd like them changed.",
          ],
        },
        {
          title: "Two minutes from the station, at the entrance to Calverley Park.",
          body: [
            "Straightforward whether you're driving in from Tonbridge or stepping off a train from London.",
          ],
        },
      ],
    },

    {
      type: "reviews",
      h2: "What our patients say",
      aggregate: { placeholder: "[PLACEHOLDER: X.X ★ from XX Google reviews]" },
      embed: true,
      quotes: [
        {
          quote: {
            placeholder:
              "[PLACEHOLDER: real review — ideally mentioning a cosmetic result looking natural]",
          },
          attribution: "— First name, Town",
        },
        {
          quote: {
            placeholder: "[PLACEHOLDER: real review — ideally from a previously nervous patient]",
          },
          attribution: "— First name, Town",
        },
        {
          quote: {
            placeholder: "[PLACEHOLDER: real review — ideally mentioning Dr Azimi by name]",
          },
          attribution: "— First name, Town",
        },
      ],
      link: { label: "Read all our reviews on Google", href: "/contact/" },
    },

    {
      type: "explainer",
      h2: "What is cosmetic dentistry?",
      blocks: [
        {
          kind: "definition",
          text: "Cosmetic dentistry is dental treatment carried out mainly to improve how your teeth look — their colour, shape, size, alignment or spacing — rather than to treat pain or disease.",
        },
        {
          kind: "p",
          text: [
            "In practice most cosmetic treatments do both, because straighter, better-shaped teeth are also easier to keep clean and healthier long term.",
          ],
        },
        {
          kind: "p",
          text: [
            "At iSmile Dental Practice the cosmetic treatments available are teeth whitening, composite bonding, porcelain and composite veneers, Invisalign clear aligners, and dental implants for missing teeth. Crowns, white fillings and hygiene treatment often form part of a cosmetic plan too.",
          ],
        },

        { kind: "h3", text: "What cosmetic treatments do you offer?" },
        {
          kind: "table",
          table: {
            headers: ["Treatment", "Best for", "Typical time", "Reversible?"],
            rows: [
              {
                cells: [
                  "Teeth whitening",
                  "Yellowing and general dullness across all the teeth",
                  "Days to a few weeks",
                  "The colour change is not reversed, but nothing is removed",
                ],
              },
              {
                cells: [
                  "Composite bonding",
                  "Chips, small gaps, short or uneven edges",
                  "Usually one appointment",
                  "Yes — usually no tooth is removed",
                ],
              },
              {
                cells: [
                  "Composite veneers",
                  "Reshaping several front teeth at lower cost",
                  "One appointment",
                  "Often, depending on preparation",
                ],
              },
              {
                cells: [
                  "Porcelain veneers",
                  "Deep discolouration, worn or uneven front teeth",
                  "Two to three appointments",
                  "No — tooth preparation is usually permanent",
                ],
              },
              {
                cells: [
                  "Invisalign clear aligners",
                  "Crowding, gaps, and bite problems",
                  "Months, depending on the case",
                  "The movement is held with retainers",
                ],
              },
              {
                cells: [
                  "Dental implants",
                  "Replacing a missing tooth",
                  "Several months, mostly healing",
                  "No",
                ],
              },
              {
                cells: [
                  "Dental crowns",
                  "Teeth too broken or heavily filled for a veneer",
                  "Two appointments",
                  "No",
                ],
              },
            ],
          },
        },
        {
          kind: "list",
          items: [
            ["**Teeth Whitening** — /teeth-whitening-tunbridge-wells/"],
            ["**Composite Bonding** — /composite-bonding/"],
            ["**Dental Veneers** — /dental-veneers/"],
            ["**Invisalign & Clear Aligners** — /invisalign/"],
            ["**Dental Implants** — /dental-implants/"],
            ["**Dental Crowns** — /crown/"],
          ],
        },
      ],
    },

    {
      type: "explainer",
      h2: "Which cosmetic treatment is right for me?",
      blocks: [
        {
          kind: "p",
          text: [
            "The honest answer is that it depends less on which treatment sounds appealing and more on what specifically is wrong. Staining, chips, gaps, crowding, wear and missing teeth are six different problems, and the treatment that solves one will usually not solve another. Start with the problem, not the treatment.",
          ],
        },
        {
          kind: "table",
          table: {
            headers: ["What's bothering you", "Usually considered first", "Also worth discussing"],
            rows: [
              {
                cells: [
                  "Teeth look yellow or dull",
                  "Professional whitening",
                  "Hygiene treatment first; bonding or veneers if whitening won't shift it",
                ],
              },
              {
                cells: [
                  "A chipped or broken edge",
                  "Composite bonding",
                  "A veneer or crown if the tooth is badly damaged",
                ],
              },
              {
                cells: [
                  "Gaps between the teeth",
                  "Bonding for small gaps; aligners for wider ones",
                  "Veneers; an implant or bridge if a tooth is missing",
                ],
              },
              {
                cells: [
                  "Crooked or crowded teeth",
                  "Invisalign clear aligners",
                  "Fixed braces; veneers only where movement isn't wanted",
                ],
              },
              {
                cells: [
                  "Teeth look short or worn down",
                  "Bonding to rebuild the edges",
                  "Veneers or crowns; treating the cause of the wear",
                ],
              },
              { cells: ["A missing tooth", "Dental implant", "Bridge or denture"] },
            ],
          },
        },

        { kind: "h3", text: "My teeth are stained or yellow" },
        {
          kind: "p",
          text: [
            "Start with hygiene treatment and professional whitening. A hygiene appointment removes surface staining from tea, coffee, red wine and tobacco, and it's surprising how often that alone is most of what people wanted. Whitening then lightens the natural colour of the tooth itself.",
          ],
        },
        {
          kind: "p",
          text: [
            "Whitening works on natural tooth enamel. It will not change the colour of crowns, veneers or white fillings, and it does not lift every kind of discolouration — a single dark tooth that has had root canal treatment, or greyish staining from antibiotics taken in childhood, often needs a different approach.",
          ],
        },
        {
          kind: "link",
          link: {
            label: "Teeth Whitening in Tunbridge Wells →",
            href: "/teeth-whitening-tunbridge-wells/",
          },
        },

        { kind: "h3", text: "I've chipped a tooth" },
        {
          kind: "p",
          text: [
            "Composite bonding is usually the first thing to consider. Tooth-coloured resin is shaped directly onto the chip, hardened with a light, and polished to match. It's normally done in one appointment, usually without drilling, and it's the least invasive way to repair a chipped edge.",
          ],
        },
        {
          kind: "p",
          text: [
            "If the tooth is badly broken, heavily filled, or the chip goes below the gum, a veneer or a crown may be needed instead — because bonding needs enough sound tooth to hold on to.",
          ],
        },
        { kind: "link", link: { label: "Composite Bonding →", href: "/composite-bonding/" } },

        { kind: "h3", text: "I have gaps between my teeth" },
        {
          kind: "p",
          text: [
            "Small gaps can often be closed with composite bonding in a single visit, by adding a little width to the teeth either side. Wider gaps are usually better closed by moving the teeth with clear aligners, because bonding teeth out too far makes them look broad and unnatural.",
          ],
        },
        {
          kind: "p",
          text: [
            "Where the gap is there because a tooth is missing, closing it cosmetically isn't the answer — that's a case for an implant, a bridge or a denture.",
          ],
        },
        { kind: "link", link: { label: "Invisalign & Clear Aligners →", href: "/invisalign/" } },

        { kind: "h3", text: "My teeth are crooked or crowded" },
        {
          kind: "p",
          text: [
            "Clear aligners move your own teeth into a better position, which is almost always preferable to disguising crowding with veneers. Moving teeth keeps them intact; veneering crooked teeth means removing tooth structure to make room for the porcelain.",
          ],
        },
        {
          kind: "p",
          text: [
            "Some cases need fixed braces rather than aligners, particularly where teeth have to move a long way or the bite needs significant change. That's assessed at the consultation, and if a referral is the right answer you'll be told.",
          ],
        },

        { kind: "h3", text: "My teeth look short or worn down" },
        {
          kind: "p",
          text: [
            "Worn front teeth are usually rebuilt with composite bonding, which adds length and shape back to the edges without drilling. In more advanced wear, veneers or crowns may be needed to restore both the appearance and the function.",
          ],
        },
        {
          kind: "p",
          text: [
            "Wear has a cause — grinding, clenching, acid from diet or reflux — and rebuilding the teeth without addressing that cause tends to end badly. Expect the conversation about a night guard.",
          ],
        },

        { kind: "h3", text: "I'm missing a tooth" },
        {
          kind: "p",
          text: [
            "A missing tooth is a restorative problem before it's a cosmetic one, because the bone under the gap begins to shrink and the neighbouring teeth start to drift. The three options are an implant, a bridge or a denture, and they're compared in detail on the implants page.",
          ],
        },
        { kind: "link", link: { label: "Dental Implants →", href: "/dental-implants/" } },
      ],
    },

    {
      type: "explainer",
      h2: "What is a smile makeover?",
      blocks: [
        {
          kind: "definition",
          text: "A smile makeover is not a single treatment. It's a plan that combines two or more cosmetic treatments in a deliberate order to improve how your smile looks as a whole.",
        },
        {
          kind: "p",
          text: [
            "Commonly hygiene, then straightening, then whitening, then bonding or veneers to finish. The order matters more than most people expect:",
          ],
        },
        {
          kind: "list",
          items: [
            [
              "**Health first.** Any decay, gum disease or infection is treated before cosmetic work begins.",
            ],
            [
              "**Position next.** If teeth are going to be moved, that happens before anything is bonded or veneered — otherwise the new work moves too.",
            ],
            [
              "**Colour after that.** Whitening is done before bonding or veneers, because those materials do not lighten. The new work is then matched to your whitened shade.",
            ],
            [
              "**Shape last.** Bonding, veneers or crowns finish the edges and fill the remaining gaps.",
            ],
            ["**Hold it.** Retainers if teeth were moved, and hygiene visits to protect the result."],
          ],
        },
        {
          kind: "p",
          text: [
            "Skipping steps is the most common reason cosmetic work disappoints. Whitening after veneers, for example, leaves you with veneers that no longer match.",
          ],
        },

        { kind: "h3", text: "How long before a wedding should I start?" },
        {
          kind: "p",
          text: [
            "Start early — several months at minimum, and considerably longer if teeth are going to be moved. Aligner treatment runs into months. Whitening takes a few weeks and needs settling time before anything is matched to it. Veneers involve a trial stage you'll want time to think about.",
          ],
        },
        {
          kind: "p",
          text: [
            "Leaving it late narrows your options to whatever can be done quickly, which is rarely the option you'd have chosen with more time. ",
            {
              placeholder:
                "[PLACEHOLDER: confirm minimum lead time Dr Azimi is comfortable quoting for a full cosmetic plan]",
            },
          ],
        },
      ],
    },

    {
      type: "explainer",
      h2: "What cosmetic dentistry can and can't do",
      blocks: [
        {
          kind: "p",
          text: [
            "This section is here because expectations are the single biggest factor in whether someone is happy afterwards.",
          ],
        },
        { kind: "h3", text: "What it does well" },
        {
          kind: "list",
          items: [
            ["Lightens teeth that have yellowed with age, food, drink and smoking"],
            ["Repairs chips, worn edges and uneven shapes"],
            ["Closes small and moderate gaps"],
            ["Straightens crowded or crooked teeth"],
            ["Replaces missing teeth so the gap no longer shows"],
            ["Makes teeth look consistent with each other in shade and shape"],
          ],
        },
        { kind: "h3", text: "What it can't do, or can't do on its own" },
        {
          kind: "list",
          items: [
            [
              "**It can't make everyone's teeth the same white.** Natural enamel varies, and there's a limit to how light a given tooth will go. Very bright, uniform white usually means veneers or crowns, with everything that involves.",
            ],
            [
              "**It can't fix a smile while the gums are unhealthy.** Bleeding, receding or inflamed gums have to be treated first, and they affect what the finished result will look like.",
            ],
            [
              "**It can't stop teeth ageing.** Bonding stains and chips. Whitening fades. Veneers eventually need replacing. Cosmetic dentistry is maintained, not completed.",
            ],
            [
              "**It can't undo tooth preparation.** Where enamel is removed for veneers or crowns, that tooth will need a restoration on it from then on. This is the single most important thing to understand before agreeing to porcelain veneers.",
            ],
            [
              "**It won't look identical to a photograph you've seen.** Faces, lips, gum lines and existing teeth all differ. What suits you is decided from your face, not from an image of someone else's.",
            ],
          ],
        },
        {
          kind: "p",
          text: [
            "You'll get an honest view at the consultation of what's realistically achievable in your case, including where the answer is “less than you were hoping” — which is a better conversation to have at the start than at the end.",
          ],
        },
      ],
    },

    {
      type: "journey",
      h2: "How cosmetic treatment works here, from first call to finished result",
      steps: [
        {
          title: "Your consultation",
          body: [
            "An unhurried appointment with Dr Simon Azimi. You explain what bothers you, he examines your teeth, gums and bite, and takes any X-rays or photographs needed. ",
            {
              placeholder:
                "[PLACEHOLDER: confirm whether cosmetic consultations are still offered at no charge, and for which appointment types. The old site advertised one on almost every page. Advertising a no-charge appointment that is not genuinely available is an ASA breach, so this is not repeated until confirmed.]",
            },
          ],
        },
        {
          title: "A written plan with options",
          body: [
            "You're shown what's possible, usually with more than one route to it, and what each costs. Where a cheaper or less invasive option would serve you well, it's included — not left out.",
          ],
        },
        {
          title: "Groundwork",
          body: [
            "Hygiene treatment, any fillings, any gum treatment. This happens before cosmetic work starts, and it isn't optional.",
          ],
        },
        {
          title: "The treatment itself",
          body: [
            "This varies by treatment. Bonding is usually one visit. Whitening is a fitting appointment and then a few weeks at home. Veneers take two to three appointments. Aligners run over months with check-ins along the way.",
          ],
        },
        {
          title: "Review",
          body: [
            "Once the work is finished, you come back so it can be checked settled in — bite, edges, comfort and how it looks in daylight rather than under a surgery light.",
          ],
        },
        {
          title: "Keeping it",
          body: [
            "Hygiene visits, check-ups, retainers if teeth were moved, and a night guard if you grind. Cosmetic work lasts far longer when it's looked after, and it does need looking after.",
          ],
        },
      ],
    },

    {
      type: "cost",
      h2: "How much does cosmetic dentistry cost in Tunbridge Wells?",
      intro: [
        [
          {
            placeholder:
              "[PLACEHOLDER: client to supply. Every figure must be genuine and genuinely available, per CAP rules on “from” pricing.]",
          },
        ],
      ],
      table: {
        headers: ["Treatment", "From"],
        rows: [
          { cells: ["Cosmetic consultation", { placeholder: "[£X / free]" }] },
          { cells: ["Hygiene appointment", { placeholder: "[from £X]" }] },
          { cells: ["Teeth whitening", { placeholder: "[from £X]" }] },
          { cells: ["Composite bonding, per tooth", { placeholder: "[from £X]" }] },
          { cells: ["Composite veneer, per tooth", { placeholder: "[from £X]" }] },
          { cells: ["Porcelain veneer, per tooth", { placeholder: "[from £X]" }] },
          { cells: ["Dental crown", { placeholder: "[from £X]" }] },
          { cells: ["Invisalign clear aligners", { placeholder: "[from £X]" }] },
          { cells: ["Single dental implant", { placeholder: "[from £X]" }] },
        ],
      },
      notes: [
        [
          "Two things worth knowing when you compare prices. First, cosmetic work is nearly always quoted per tooth, so a headline price is rarely the total — ask how many teeth are involved. Second, the cheapest version of a treatment is not always the cheapest over ten years, because everything cosmetic eventually needs replacing and some things need replacing sooner.",
        ],
        ["You'll be given the full figure in writing before anything starts."],
        [
          {
            placeholder:
              "[PLACEHOLDER: finance or payment plan details. If finance is offered, FCA authorisation and specific disclosure wording are required.]",
          },
        ],
      ],
      link: { label: "See our full fee guide →", href: "/contact/" },
    },

    {
      type: "comparison",
      h2: "Bonding vs veneers vs crowns vs whitening",
      table: {
        headers: ["", "Whitening", "Composite bonding", "Porcelain veneers", "Crowns"],
        rows: [
          {
            cells: [
              "Fixes colour",
              "Yes, on natural teeth",
              "Yes, by covering",
              "Yes, by covering",
              "Yes, by covering",
            ],
          },
          { cells: ["Fixes shape or chips", "No", "Yes", "Yes", "Yes"] },
          {
            cells: [
              "Closes gaps",
              "No",
              "Small gaps",
              "Small to moderate gaps",
              "Not usually the reason to use one",
            ],
          },
          {
            cells: [
              "Straightens teeth",
              "No",
              "Disguises minor cases only",
              "Disguises minor cases only",
              "No",
            ],
          },
          {
            cells: [
              "Tooth removed",
              "None",
              "Usually none",
              "Usually yes — permanent",
              "Yes — the most of any option",
            ],
          },
          {
            cells: [
              "Number of visits",
              "Fitting, then home use",
              "Usually one",
              "Two to three",
              "Two",
            ],
          },
          {
            cells: [
              "Typical lifespan",
              "Fades over time; topped up",
              "Around 3–7 years",
              { placeholder: "[PLACEHOLDER: confirm expected lifespan Dr Azimi quotes]" },
              "10–15 years",
            ],
          },
          { cells: ["Relative cost", "Lowest", "Low", "High", "High"] },
          {
            cells: [
              "Stains over time",
              "Teeth re-stain",
              "Yes, more than porcelain",
              "Resists staining",
              "Resists staining",
            ],
          },
        ],
      },
      blocks: [
        { kind: "h3", text: "Should I whiten before having bonding or veneers?" },
        {
          kind: "p",
          text: [
            "Yes, and this catches people out. Composite and porcelain do not change colour when whitening gel is applied to them. If you whiten after the work is done, your natural teeth lighten and the cosmetic work stays where it was, so they no longer match.",
          ],
        },
        {
          kind: "p",
          text: [
            "Whiten first, let the shade settle for a couple of weeks, then have the bonding or veneers matched to it.",
          ],
        },
        { kind: "h3", text: "Is it better to straighten my teeth or veneer them?" },
        {
          kind: "p",
          text: [
            "If teeth are crooked, moving them is almost always the better answer. Aligners reposition your own teeth and leave them intact. Veneering crooked teeth means removing enamel to make room for porcelain, and that removal is permanent.",
          ],
        },
        {
          kind: "p",
          text: [
            "Veneers make more sense where the shape or colour is the problem rather than the position, or where teeth are already heavily restored.",
          ],
        },
        { kind: "h3", text: "Do I need a crown or a veneer?" },
        {
          kind: "p",
          text: [
            "A veneer covers the front of the tooth and needs a good amount of healthy tooth behind it. A crown covers the whole tooth and is used when there isn't enough sound tooth left for a veneer — typically a tooth that's heavily filled, root treated or significantly broken.",
          ],
        },
        {
          kind: "p",
          text: [
            "Put simply: veneers are for appearance on largely healthy teeth, crowns are for teeth that also need strengthening.",
          ],
        },
      ],
    },

    {
      type: "faqs",
      h2: "Frequently asked questions",
      items: [
        {
          q: "What is the cheapest way to improve my smile?",
          a: [
            "Usually hygiene treatment followed by professional whitening, then composite bonding for any chips or small gaps. Together those three cost a fraction of veneers and, for a lot of people, they solve most of what was bothering them.",
          ],
        },
        {
          q: "Does cosmetic dentistry damage your teeth?",
          a: [
            "It depends entirely on the treatment. Whitening and bonding remove no tooth structure in most cases. Veneers and crowns do — enamel is permanently removed to make room for them, and once that's done the tooth will always need a restoration on it. This is why the least invasive option that solves your problem is worth taking seriously.",
          ],
        },
        {
          q: "How long does cosmetic dental work last?",
          a: [
            "Composite bonding typically lasts around three to seven years before it needs repolishing, repairing or replacing. Crowns commonly last ten to fifteen years. Whitening fades gradually and is topped up. Porcelain veneers ",
            {
              placeholder: "[PLACEHOLDER: confirm the lifespan Dr Azimi is comfortable quoting]",
            },
            ". All of these depend heavily on cleaning, diet, grinding and regular check-ups.",
          ],
        },
        {
          q: "Is cosmetic dentistry available on the NHS?",
          a: [
            "Purely cosmetic treatment is not available on the NHS. NHS dentistry covers what's clinically necessary to keep your mouth healthy and free of pain. Whitening, veneers for appearance, bonding for cosmetic reasons and clear aligners are private treatments.",
          ],
        },
        {
          q: "Will people be able to tell?",
          a: [
            "Done well, generally not. Natural teeth aren't perfectly uniform, so the shade, the edge shapes and the small irregularities are matched to your face rather than to an ideal. Work looks obvious when it's too white, too even, or too big for the person's mouth — which is a planning decision, not an inevitability.",
          ],
        },
        {
          q: "Am I too old for cosmetic dentistry?",
          a: [
            "No. There's no upper age limit. What matters is the health of your teeth and gums, not your date of birth. Plenty of cosmetic treatment is carried out on patients in their sixties, seventies and beyond.",
          ],
        },
        {
          q: "Can I have cosmetic treatment if I have gum disease?",
          a: [
            "Not until the gum disease is treated and stable. Gums that bleed or recede will change the appearance of any cosmetic work over time, and cementing porcelain onto an unhealthy foundation is a route to losing both. Gum treatment comes first, and it also improves how your smile looks on its own.",
          ],
        },
        {
          q: "Does cosmetic dental treatment hurt?",
          a: [
            "Most of it involves little or no discomfort. Whitening and bonding are usually done without an injection, though whitening can cause temporary sensitivity. Veneers and crowns are carried out under local anaesthetic. If you're anxious about any of it, say so at the consultation and it will be worked around.",
          ],
        },
        {
          q: "How many teeth show when I smile?",
          a: [
            "Most people show between six and ten upper teeth when smiling, which is why cosmetic plans often cover that number rather than a single tooth. Yours are counted and photographed at the consultation, so the plan matches your actual smile line rather than an average.",
          ],
        },
        {
          q: "Can you fix just one tooth?",
          a: [
            "Often, yes — a single chipped or discoloured tooth can be bonded or veneered and matched to the ones beside it. Matching one tooth is genuinely more difficult than matching several, so expect an honest conversation about how close a match is realistic.",
          ],
        },
        {
          q: "What if I don't like the result?",
          a: [
            "That conversation should happen before the work is permanent, not after. For veneers, a trial stage lets you see and approve the shape before anything is made. For bonding, adjustments can be made while you're in the chair. Tell us plainly what you don't like — it's far easier to change at that stage. ",
            {
              placeholder:
                "[PLACEHOLDER: confirm practice policy on adjustments and any remake terms]",
            },
          ],
        },
        {
          // The old page's ten-year claim is NOT republished. Under CAP a
          // guarantee needs written terms available to the consumer, and under
          // GDC guidance a clinical outcome cannot be guaranteed. Either the
          // written terms arrive and are legally reviewed, or this FAQ is
          // deleted outright — those are the only two endings.
          q: "Do you offer any assurance on cosmetic work?", // allow-guarantee
          a: [
            {
              placeholder:
                "[PLACEHOLDER — LAUNCH BLOCKER: the old site claimed a ten-year assurance on all completed treatment, with no published terms, and contradicted it with a five-year claim elsewhere. Supply written terms plus legal review, or remove this question entirely. Do not republish the old wording.]",
            },
          ],
        },
      ],
    },

    {
      type: "areas",
      h2: "Cosmetic dentistry for patients across Tunbridge Wells and West Kent",
      body: [
        [
          "We're at the entrance to Calverley Park, directly opposite Tunbridge Wells railway station, with the town centre car parks a short walk away.",
        ],
        [
          "Cosmetic treatment usually means more than one appointment, so being easy to reach counts for something. Patients come to us from **Tonbridge** and **Pembury** to the north and east, from **Southborough** just up the A26, and from **Langton Green** and the villages out towards Groombridge to the west.",
        ],
        [
          "If you commute into London, appointments either side of the working day are the ones most people ask for. ",
          {
            placeholder:
              "[PLACEHOLDER: confirm opening hours, including any early or late sessions]",
          },
        ],
      ],
    },

    {
      type: "finalCta",
      h2: "Find out which treatment is actually right for you",
      body: [
        [
          "Bring the thing that bothers you and we'll tell you what would fix it — including when the answer is simpler and cheaper than you expected. You'll leave with a written plan, the options side by side, and a price on each.",
        ],
      ],
      primaryLabel: "Book my cosmetic consultation",
      secondary: ["Or call us on **01892 547286** — happy to talk it through first."],
    },
  ],
};
