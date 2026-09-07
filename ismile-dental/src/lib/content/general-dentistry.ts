import type { PageContent } from "@/lib/content/types";

// Copy transcribed verbatim from copy/02-general-dentistry.md, page 1 (hub).
//
// NOTE ON "specialist": this page uses the term correctly — referring to the
// GDC specialist lists and to external clinicians we refer out to, never as a
// description of Dr Azimi or the practice. Those lines carry an
// `allow-protected-term` exemption. Any new use needs the same scrutiny.

export const generalDentistry: PageContent = {
  slug: "/general-dentistry/",
  metaTitle: "General Dentistry Tunbridge Wells | iSmile Dental",
  metaDescription:
    "Check-ups, hygiene, white fillings, crowns and more with Dr Simon Azimi in Tunbridge Wells. Gentle care for nervous patients. Call 01892 547286.",
  h1: "General Dentistry in Tunbridge Wells — Catch Problems Early, Keep Your Own Teeth",
  primaryKeyword: "general dentistry Tunbridge Wells",
  secondaryKeywords: [
    "private dentist Tunbridge Wells",
    "family dentist Tunbridge Wells",
    "preventive dentistry",
    "dentist near me Tunbridge Wells",
    "register with a dentist Tunbridge Wells",
  ],
  coreDesire:
    "To keep my teeth healthy and catch problems early, so I never end up in pain or facing a huge bill.",
  breadcrumb: [
    { label: "Home", href: "/" },
    { label: "General Dentistry", href: "/general-dentistry/" },
  ],
  reviewed: {
    by: "Dr Simon Azimi, GDC 81382",
    date: { placeholder: "[PLACEHOLDER: last reviewed date]" },
  },

  sections: [
    {
      type: "hero",
      h1: "General Dentistry in Tunbridge Wells — Catch Problems Early, Keep Your Own Teeth",
      subhead:
        "Everyday dental care with one dentist who knows your mouth — check-ups, hygiene, fillings and repairs, done properly and explained plainly.",
      formHeading: "Book your appointment",
      formOptions: [
        "General Dentistry",
        "Cosmetic dentistry",
        "Dental implants",
        "Skin clinic",
        "I'm not sure yet",
      ],
      buttonLabel: "Request a call back",
      underForm: [
        "Prefer to talk? Call **01892 547286**",
        "No pressure, no obligation — just a conversation about what you need and what it costs.",
      ],
    },

    {
      type: "trustStrip",
      items: [
        "One dentist throughout — Dr Simon Azimi, GDC 81382",
        "Opposite Tunbridge Wells station",
        "Mercury-free practice",
        { placeholder: "[PLACEHOLDER: X.X ★ on Google]" },
        "Nervous patients welcome",
      ],
    },

    {
      type: "recognise",
      h2: "Most people don't come in because something hurts. They come in because they've been meaning to for a while.",
      body: [
        [
          "There's a tooth that's sensitive to cold, but only sometimes. A filling that feels a bit rough under your tongue. A gum that bleeds when you brush and has done for months, and you've decided that's just how your mouth is.",
        ],
        [
          "Or there's nothing wrong at all, as far as you know. It's simply been a long time. You moved, or the practice you were registered with closed, or life got busy in the way it does, and one year turned into five.",
        ],
        [
          "Here's the part nobody says out loud: teeth rarely warn you early. Decay doesn't hurt until it reaches the nerve. Gum disease usually causes no pain at all, right up to the point where a tooth loosens. By the time a mouth is telling you something is wrong, the cheap, simple version of the fix has often already passed.",
        ],
        ["That's the whole argument for routine care. Not fear. Timing."],
      ],
    },

    {
      type: "outcome",
      h2: "What it's like when you're on top of it",
      body: [
        ["You stop wondering."],
        [
          "That's the real prize, and it's a quieter one than the adverts suggest. You know where you stand. You know there's nothing brewing. When something does need doing, it gets found while it's small — a filling instead of a crown, a crown instead of an extraction.",
        ],
        [
          "You chew on both sides. You eat something cold without bracing. You go six or twelve months between visits and nothing dramatic happens in between, because nothing is left long enough to become dramatic.",
        ],
        [
          "And the cost settles into something predictable. Routine care is the least expensive dentistry there is. Almost every large bill in this practice started as something that could have been dealt with in twenty minutes.",
        ],
        [
          "Most people who've been away a long time say the same thing on the way out: *that was nothing like I expected.*",
        ],
      ],
    },

    {
      type: "whyChoose",
      h2: "Why patients across Tunbridge Wells choose us for their everyday dental care",
      points: [
        {
          title: "One dentist, every visit.",
          body: [
            "Dr Simon Azimi sees you each time. He knows which tooth he watched last year, which side you find harder to clean and what you're worried about. You don't start again with a stranger, and you don't repeat your history at every appointment.",
          ],
        },
        {
          title: "Prevention first, and we mean it.",
          body: [
            "The aim is to need less treatment, not more. That means finding problems early, treating gum disease properly rather than papering over it, and being honest when something can safely be watched rather than drilled.",
          ],
        },
        {
          title: "Minimally invasive where we can be.",
          body: [
            "Sound tooth is worth keeping. Where a smaller repair will do the job, that's what you'll be offered — and you'll be told why.",
          ],
        },
        {
          title: "You'll know the cost before anything starts.",
          body: [
            "You get a written treatment plan with the price on it, and time to think about it. Nothing is done on the day that you haven't agreed to. ",
            {
              placeholder:
                "[PLACEHOLDER: confirm whether payment plans or finance are offered — if so, FCA-compliant wording is required]",
            },
          ],
        },
        {
          title: "Built for people who don't like the dentist.",
          body: [
            "A good number of our patients arrive after years away, often because of something that happened to them decades ago. Nobody is told off. We explain before we do anything, we stop when you ask, and we go at the pace you can manage.",
          ],
        },
        {
          title: "A mercury-free practice.",
          body: ["We use tooth-coloured, mercury-free materials for fillings."],
        },
        {
          title: "Two minutes from the station.",
          body: [
            "We're at the entrance to Calverley Park, directly opposite Tunbridge Wells railway station — which makes a check-up something you can fit into a lunch hour rather than a day off.",
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
              "[PLACEHOLDER: real review — ideally from a patient who had been away from the dentist for years]",
          },
          attribution: "— First name, Town",
        },
        {
          quote: {
            placeholder:
              "[PLACEHOLDER: real review — ideally mentioning a routine check-up or hygiene visit]",
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
      h2: "What is general dentistry?",
      blocks: [
        {
          kind: "definition",
          text: "General dentistry is the everyday care that keeps your teeth and gums healthy and repairs them when they're damaged.",
        },
        {
          kind: "p",
          text: [
            "It covers examinations, hygiene treatment, fillings, crowns, bridges, dentures, root canal treatment and extractions — the core work that most people need at some point in their lives.",
          ],
        },
        {
          kind: "p",
          text: [
            "Two things cause almost all tooth loss in adults: decay and gum disease. Both are largely preventable, and both are far easier to deal with early. Everything below is built around that.",
          ],
        },

        { kind: "h3", text: "Dental check-ups" },
        {
          kind: "p",
          text: [
            "The appointment that catches things while they're small. Dr Azimi examines your teeth, your gums, your existing fillings and the soft tissues of your mouth, including a check for anything unusual. You'll be told plainly what he finds, and if nothing needs doing, that's what you'll hear.",
          ],
        },
        { kind: "link", link: { label: "Dental Check-Ups →", href: "/dental-check-ups/" } },

        { kind: "h3", text: "Dental hygiene" },
        {
          kind: "p",
          text: [
            "Professional cleaning removes the hardened plaque — tartar — that no toothbrush can shift, and it's the single most effective thing you can do to keep gum disease from taking your teeth. It also takes off the staining that builds up from tea, coffee and red wine.",
          ],
        },
        { kind: "link", link: { label: "Dental Hygiene →", href: "/dental-hygiene/" } },

        { kind: "h3", text: "White fillings" },
        {
          kind: "p",
          text: [
            "When decay has got into a tooth, the damaged part is removed and the space is rebuilt with tooth-coloured composite, matched to the shade of the tooth around it. We're a mercury-free practice, so no metal fillings are placed here. Old grey amalgam fillings can be replaced with white ones too.",
          ],
        },
        { kind: "link", link: { label: "White Fillings →", href: "/white-fillings/" } },

        { kind: "h3", text: "Crowns" },
        {
          kind: "p",
          text: [
            "A crown is a hand-made cover that fits over a tooth that's broken, heavily filled or weakened. It restores the strength and shape of the tooth and, in porcelain, is matched to the colour of the teeth beside it. Crowns are what save teeth that are too far gone for a filling.",
          ],
        },
        { kind: "link", link: { label: "Dental Crowns →", href: "/crown/" } },

        { kind: "h3", text: "Bridges" },
        {
          kind: "p",
          text: [
            "A fixed replacement for one or more missing teeth, anchored to the teeth either side of the gap. A bridge doesn't come out, and it stops the neighbouring teeth drifting into the space — which is what causes bite problems later on.",
          ],
        },
        { kind: "link", link: { label: "Dental Bridges →", href: "/bridges/" } },

        { kind: "h3", text: "Dentures" },
        {
          kind: "p",
          text: [
            "Full or partial dentures replace missing teeth so you can eat and speak comfortably again, and they support the facial muscles that sag once teeth are lost. Made in acrylic or chrome cobalt, depending on what suits your mouth.",
          ],
        },
        { kind: "link", link: { label: "Dentures →", href: "/dentures/" } },

        { kind: "h3", text: "Root canal treatment" },
        {
          kind: "p",
          text: [
            "When infection reaches the nerve in the middle of a tooth, root canal treatment clears it out and seals the tooth, so the tooth can stay rather than come out. It has an unfair reputation. Done under local anaesthetic, it is usually a comfortable appointment, and it's the treatment that saves teeth people assume are lost.",
          ],
        },
        {
          kind: "link",
          link: {
            label: "Root Canal Treatment →",
            href: "/root-canal-treatment-in-tunbridge-wells/",
          },
        },

        { kind: "h3", text: "Extractions and oral surgery" },
        {
          kind: "p",
          text: [
            "Sometimes a tooth can't be saved, or a wisdom tooth is impacted and causing trouble. Removal is done under local anaesthetic, and you'll be told honestly what to expect afterwards and what your options are for replacing the tooth.",
          ],
        },
        {
          kind: "link",
          link: { label: "Tooth Extractions & Oral Surgery →", href: "/oral-surgery/" },
        },

        { kind: "h3", text: "Emergency appointments" },
        {
          kind: "p",
          text: [
            "Teeth break at inconvenient times. If you're in pain, have swelling, or something has come out or broken, call **01892 547286** and we'll advise you. ",
            {
              placeholder:
                "[PLACEHOLDER: confirm emergency appointment policy — same-day availability, out-of-hours arrangements, and whether emergency slots are held. The current site advertises an emergency service but gives no detail.]",
            },
          ],
        },
      ],
    },

    {
      type: "journey",
      h2: "What happens at a routine dental appointment?",
      steps: [
        {
          title: "Arriving",
          body: [
            "Reception will welcome you and give you a short medical history form to fill in — we can go through it with you if you'd rather. There's no rush and nobody is watching the clock in the waiting room.",
          ],
        },
        {
          title: "Talking first, looking second",
          body: [
            "Dr Azimi will ask what's brought you in, whether anything has been bothering you, and what you'd like to get out of the visit. If you're anxious, this is the moment to say so. It changes how the rest of the appointment is run.",
          ],
        },
        {
          title: "The examination",
          body: [
            "Your teeth, gums, existing fillings, bite and the soft tissues of your mouth are checked. X-rays may be taken if they're needed to see between or below the teeth — you'll be told why before any are taken.",
          ],
        },
        {
          title: "What we found, in plain English",
          body: [
            "You'll be shown and told what's there. No jargon, no numbers shouted across the room that mean nothing to you. If there's nothing to do, you'll be told there's nothing to do.",
          ],
        },
        {
          title: "A written plan and a price",
          body: [
            "If treatment is needed, you get the options, what each involves, and what each costs, in writing. You take it away and decide. Urgent things are flagged as urgent; things that can wait are labelled as things that can wait.",
          ],
        },
        {
          title: "Booking what comes next",
          body: [
            "A hygiene appointment, a filling, or simply your next check-up — booked at a gap that suits your mouth and your diary.",
          ],
        },
      ],
    },

    {
      type: "cost",
      h2: "How much does general dentistry cost in Tunbridge Wells?",
      intro: [
        [
          {
            placeholder:
              "[PLACEHOLDER: client to supply a full fee guide. All figures must be genuine and currently available.]",
          },
        ],
      ],
      table: {
        headers: ["Treatment", "From"],
        rows: [
          { cells: ["New patient examination", { placeholder: "[£X]" }] },
          { cells: ["Routine examination", { placeholder: "[£X]" }] },
          { cells: ["Hygiene appointment (scale and polish)", { placeholder: "[from £X]" }] },
          { cells: ["White filling", { placeholder: "[from £X]" }] },
          { cells: ["Crown", { placeholder: "[from £X]" }] },
          { cells: ["Root canal treatment", { placeholder: "[from £X]" }] },
          { cells: ["Extraction", { placeholder: "[from £X]" }] },
        ],
      },
      notes: [
        [
          "Routine care is the cheapest dentistry you will ever have. A check-up and a hygiene visit twice a year cost a fraction of what it costs to rebuild a tooth that has been left, and the gap between the two only widens the longer something is ignored.",
        ],
        [
          {
            placeholder:
              "[PLACEHOLDER: finance or payment plan details. The old site advertised a zero-percent finance offer on the root canal page — this must be verified, and if finance is offered, FCA authorisation and specific disclosure wording are required.]",
          },
        ],
        [
          {
            placeholder:
              "[PLACEHOLDER: membership or practice plan details, if one exists. A plan spreading check-ups and hygiene across monthly payments is referenced on the old general dentistry page — confirm it genuinely exists before publishing.]",
          },
        ],
        [
          "**Typical appointment length:** ",
          {
            placeholder:
              "[PLACEHOLDER: confirm standard examination and hygiene appointment lengths. The old site referenced 30-minute hygiene visits — confirm this is still accurate.]",
          },
        ],
      ],
    },

    {
      type: "comparison",
      h2: "What early treatment looks like, and what leaving it looks like",
      intro: [
        [
          "The same problem costs very different amounts of time, money and tooth depending on when it's found. This is the honest version.",
        ],
      ],
      table: {
        headers: ["What's happening", "Found early", "Left for a few years"],
        rows: [
          {
            cells: [
              "Decay starting in enamel",
              "Watched, or a small white filling",
              "Larger filling, or a crown once too much tooth has gone",
            ],
          },
          {
            cells: [
              "Decay reaching the nerve",
              "Filling, before it gets there",
              "Root canal treatment and a crown — or extraction",
            ],
          },
          {
            cells: [
              "Plaque and early gum inflammation",
              "Hygiene visit and better cleaning at home",
              "Periodontitis, bone loss, loose teeth",
            ],
          },
          {
            cells: [
              "A cracked or worn tooth",
              "Repaired or crowned",
              "Fracture below the gum, which often can't be saved",
            ],
          },
          {
            cells: [
              "A tooth already lost",
              "Bridge, denture or implant, planned properly",
              "Neighbouring teeth drift, the bite changes, and replacement gets harder",
            ],
          },
        ],
      },
      blocks: [
        { kind: "h3", text: "Should I go if nothing hurts?" },
        {
          kind: "p",
          text: [
            "Yes — that's the point of a check-up. Decay and gum disease both cause no pain in their early stages, which are the stages where they're simplest and cheapest to treat. Pain is a late symptom, not an early one. The visits where nothing is found are the visits doing their job.",
          ],
        },
        { kind: "h3", text: "Is private dentistry worth it?" },
        {
          kind: "p",
          text: [
            "That depends on what you want from it. Private appointments are generally longer, which means more time on examination, explanation and prevention rather than treatment alone, and you see the same dentist each time. ",
            {
              placeholder:
                "[PLACEHOLDER: the current site reads as a private practice with no NHS provision mentioned anywhere. Confirm before publishing, including whether any NHS treatment is available for children or existing patients.]",
            },
          ],
        },
      ],
    },

    {
      type: "faqs",
      h2: "Frequently asked questions",
      items: [
        {
          q: "How do I register with iSmile Dental Practice?",
          a: [
            "Call **01892 547286** or send an enquiry through this page and we'll arrange your first appointment. There's a short medical history form to complete when you arrive, and if you have records or X-rays with a previous dentist, we can request them. ",
            {
              placeholder:
                "[PLACEHOLDER: confirm registration process and whether a registration fee applies]",
            },
          ],
        },
        {
          q: "Are you an NHS or a private dentist?",
          a: [
            {
              placeholder:
                "[PLACEHOLDER: the current site reads as a private practice throughout and no NHS provision is mentioned. Confirm the correct answer before publishing, including whether any NHS care is offered to children.]",
            },
            " Private care means longer appointments, continuity with the same dentist, and a written plan and price before anything begins.",
          ],
        },
        {
          q: "How often should I have a check-up?",
          a: [
            // National guidance, described as guidance rather than as practice
            // policy — that distinction is deliberate.
            "It depends on you. National guidance in the UK sets recall intervals for adults anywhere between three and twenty-four months, based on your individual risk of decay and gum disease. If your mouth is stable and you clean well, twelve months may be right. If you smoke, have gum disease or get decay easily, it will be more often. Dr Azimi will recommend an interval and explain the reasoning.",
          ],
        },
        {
          q: "It's been years since I saw a dentist. Will I get told off?",
          a: [
            "No. It happens constantly and it's one of the most common reasons people delay further — the fear of the telling-off rather than the treatment. You'll get a straight assessment of where things are and a plan to sort them out, starting with whatever matters most.",
          ],
        },
        {
          q: "I'm frightened of the dentist. What can you do?",
          a: [
            "Tell us when you book, and again when you arrive. Appointments can be paced differently, we explain everything before we do it, and we stop the moment you signal. ",
            {
              placeholder:
                "[PLACEHOLDER: confirm sedation availability — the old site referenced a sedative tablet before wisdom tooth removal but never specified options. Confirm what is genuinely offered.]",
            },
          ],
        },
        {
          q: "Do you treat children?",
          a: [
            {
              placeholder:
                "[PLACEHOLDER: confirm whether the practice accepts children, from what age, and on what basis]",
            },
          ],
        },
        {
          q: "Will I need X-rays?",
          a: [
            "Sometimes. X-rays show what an examination can't — decay between teeth, bone levels around the roots, infection at the tip of a root. They're taken when they'll change what we do, not routinely at every visit, and you'll be told why before any are taken.",
          ],
        },
        {
          q: "What if I can't afford the whole treatment plan at once?",
          a: [
            "Say so. Treatment plans can usually be staged so the urgent work is done first and the rest is spread out. You'll be told clearly what genuinely needs doing now and what can safely wait. ",
            { placeholder: "[PLACEHOLDER: confirm finance or payment plan availability]" },
          ],
        },
        {
          q: "Do I need a separate appointment with the hygienist?",
          a: [
            "Usually, yes — the examination and the cleaning are different appointments with different jobs. Dr Azimi will advise how often you need hygiene treatment based on the condition of your gums.",
          ],
        },
        {
          q: "What if I need something you don't do here?",
          a: [
            // The term refers to the GDC's own lists and to external clinicians
            // we refer out to — never to Dr Azimi or this practice. That is the
            // correct and legally accurate use of it.
            "You'll be told, and referred appropriately. Some treatments — certain surgical extractions, some complex root canal work — are better done by a clinician on the relevant GDC specialist list, and we'd rather send you to the right person than take it on.", // allow-protected-term
          ],
        },
        {
          q: "Do you see emergencies?",
          a: [
            "Call **01892 547286** if you're in pain, have swelling, or have broken or lost a tooth. ",
            {
              placeholder:
                "[PLACEHOLDER: confirm emergency appointment availability and out-of-hours arrangements]",
            },
          ],
        },
        {
          q: "What are your opening hours?",
          a: [
            {
              placeholder:
                "[PLACEHOLDER: opening hours — not published anywhere on the current site, needs confirming]",
            },
          ],
        },
      ],
    },

    {
      type: "areas",
      h2: "Everyday dental care for Tunbridge Wells and the surrounding villages",
      body: [
        [
          "We're at the entrance to Calverley Park, directly opposite Tunbridge Wells railway station — so a check-up is something you can fit around work rather than build a day around.",
        ],
        [
          "Families come to us from **Southborough** and **Rusthall**, both roughly ten minutes by car, and from **Tonbridge** and **Pembury** just up the road. If you're travelling in from **Langton Green**, **Speldhurst** or **Bidborough**, the practice sits on the town-centre side of Mount Pleasant, which keeps the journey short at either end of the day.",
        ],
        [
          "Routine care means seeing us two or three times a year for most people. Being easy to reach is what keeps that from slipping.",
        ],
        [{ placeholder: "[PLACEHOLDER: confirm parking arrangements for patients driving in]" }],
      ],
    },

    {
      type: "finalCta",
      h2: "Book a check-up and find out where you stand",
      body: [
        [
          "Whether it's been six months or sixteen years, the first appointment does the same thing: it tells you what's actually going on, and gives you a plan with a price on it. No lectures, no pressure to have anything done on the day.",
        ],
      ],
      primaryLabel: "Book my appointment",
      secondary: [
        "Or call us on **01892 547286** — we're happy to answer questions over the phone first.",
      ],
    },
  ],
};
