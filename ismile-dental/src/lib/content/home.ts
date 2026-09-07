import type { PageContent } from "@/lib/content/types";

// Copy transcribed verbatim from copy/01-core-pages.md, Page 1.
// Do not rewrite it here — change the copy pack, then change this file.

export const home: PageContent = {
  slug: "/",
  metaTitle: "Private Dentist Tunbridge Wells | iSmile Dental Practice",
  metaDescription:
    "Private dentist in Royal Tunbridge Wells, opposite the station. General, cosmetic and implant dentistry with Dr Simon Azimi. Call 01892 547286.",
  h1: "Private Dentist in Tunbridge Wells — Dentistry Without the Dread",
  primaryKeyword: "private dentist Tunbridge Wells",
  secondaryKeywords: [
    "dentist Tunbridge Wells",
    "dentist near me Tunbridge Wells",
    "cosmetic dentist Tunbridge Wells",
    "new patient dentist Tunbridge Wells",
    "nervous patient dentist Kent",
  ],
  coreDesire:
    "To find a dentist they can actually trust — nearby, who won't judge them for leaving it too long, won't upsell them, and won't hurt them.",
  breadcrumb: [{ label: "Home", href: "/" }],
  reviewed: {
    by: "Dr Simon Azimi, GDC 81382",
    date: { placeholder: "[PLACEHOLDER: last reviewed date]" },
  },

  sections: [
    {
      type: "hero",
      h1: "Private Dentist in Tunbridge Wells — Dentistry Without the Dread",
      subhead:
        "One dentist who gets to know you, a practice opposite the station, and no lecture about how long it's been.",
      formHeading: "Book your consultation",
      formOptions: [
        "General dentistry",
        "Cosmetic dentistry",
        "Dental implants",
        "Skin clinic",
        "I'm not sure yet",
      ],
      buttonLabel: "Request a call back",
      underForm: [
        "Prefer to talk? Call **01892 547286**",
        "No pressure and no obligation — just a conversation about what you need.",
      ],
    },

    {
      type: "trustStrip",
      items: [
        "Treated by Dr Simon Azimi, GDC 81382",
        "Opposite Tunbridge Wells station",
        "Mercury-free practice",
        { placeholder: "[PLACEHOLDER: X.X ★ on Google]" },
        "New and nervous patients welcome",
      ],
    },

    {
      type: "recognise",
      h2: "If it's been a while, you're not the only one",
      body: [
        ["Most people who ring us have been meaning to for a while."],
        [
          "Sometimes it's a year. Sometimes it's closer to ten. There's usually a reason. A bad experience somewhere else. A dentist who talked over your head. A practice that seemed more interested in selling you a treatment plan than in fixing the thing that actually hurt.",
        ],
        [
          "Or life just got in the way, and then the gap got embarrassing, and the longer it went on the harder it became to pick up the phone.",
        ],
        [
          "Maybe you've been chewing on one side without really deciding to. Maybe there's a tooth you've stopped looking at closely. Maybe nothing hurts at all and you'd simply like someone honest to check.",
        ],
        [
          "Whatever it is, nobody here is going to raise an eyebrow at it. You will not be told off. You will not be handed a quote for work you didn't ask about.",
        ],
      ],
    },

    {
      type: "outcome",
      h2: "What it's like having a dentist you actually trust",
      body: [
        ["You stop putting it off."],
        [
          "That's the first thing that changes, and it's the one that matters most. A check-up stops being a decision you have to make and becomes twenty minutes, twice a year, in the diary. When something does go wrong, you know who to ring — and you know roughly what will happen when you do.",
        ],
        [
          "You get told what's genuinely going on in your mouth, in words you understand, including the times when the honest answer is “leave it alone and we'll keep an eye on it.”",
        ],
        ["You get to ask the question you've been slightly embarrassed to ask."],
        [
          "And when you do need work done, it's the same person doing it each time. Someone who already knows which tooth gives you trouble, that you'd rather have the injection before you see the needle, and that you like to be told what's happening before it happens.",
        ],
        ["That's not a luxury. It's just what dentistry is supposed to feel like."],
      ],
    },

    {
      type: "whyChoose",
      h2: "Why patients choose iSmile Dental Practice",
      points: [
        {
          title: "One dentist, who knows you.",
          body: [
            "Dr Simon Azimi (GDC 81382) sees you, plans your treatment and carries it out. You are not passed between clinicians, and you don't start from scratch explaining yourself at every visit. Continuity is the single biggest practical difference between an independent practice and a corporate one.",
          ],
        },
        {
          title: "We do the least dentistry that will do the job.",
          body: [
            "The approach here is preventative first and minimally invasive after that — treat what needs treating, monitor what doesn't, and keep appointments to the minimum the clinical need allows. If something can be watched rather than drilled, you'll be told so.",
          ],
        },
        {
          title: "Built for people who don't like the dentist.",
          body: [
            "Dental anxiety is ordinary, not unusual. We explain before we do. We stop when you ask. Nobody is made to feel foolish for needing a minute.",
          ],
        },
        {
          title: "Two minutes from the station, at the entrance to Calverley Park.",
          body: [
            "The practice sits at 1 The Lodge, directly opposite Tunbridge Wells railway station — so an appointment can sit inside a lunch break or on the way home, rather than costing you a day.",
          ],
        },
        {
          title: "A mercury-free practice.",
          body: [
            // Plain factual statement only. The old site's comparative claim
            // ("one of a few 100% completely mercury-free dental practices in
            // Tunbridge Wells") is not restorable without documented evidence.
            "We use tooth-coloured, mercury-free materials throughout.",
          ],
        },
        {
          title: "Standards you can check.",
          body: [
            "Clinically approved restoration materials. Registered dental laboratories using tested, accredited products. A GDC-registered dentist whose number is published on this site. ",
            {
              placeholder:
                "[PLACEHOLDER: confirm CQC provider registration number for display]",
            },
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
              "[PLACEHOLDER: real review — ideally from a patient who had put off going for years]",
          },
          attribution: "— First name, Town",
        },
        {
          quote: {
            placeholder:
              "[PLACEHOLDER: real review — ideally one mentioning Dr Azimi by name]",
          },
          attribution: "— First name, Town",
        },
        {
          quote: {
            placeholder:
              "[PLACEHOLDER: real review — ideally about honest advice rather than a hard sell]",
          },
          attribution: "— First name, Town",
        },
      ],
      link: { label: "Read all our reviews on Google", href: "/contact/" },
    },

    {
      type: "explainer",
      h2: "What kind of dental practice is iSmile?",
      blocks: [
        {
          kind: "definition",
          text: "iSmile Dental Practice is an independent private dental and skin clinic in Royal Tunbridge Wells, led by Dr Simon Azimi.",
        },
        {
          kind: "p",
          text: [
            "It is not part of a chain. General dentistry, cosmetic dentistry, dental implants and non-surgical skin treatments are all carried out in one place — 1 The Lodge, Mount Pleasant Avenue, at the entrance to Calverley Park.",
          ],
        },
        {
          kind: "p",
          text: [
            "It's a family-friendly practice with a small team, which means the person who greets you tends to be the same person next time, and the dentist who examines you is the dentist who treats you.",
          ],
        },

        { kind: "h3", text: "General Dentistry" },
        {
          kind: "p",
          text: [
            "The everyday work that keeps problems small: check-ups, hygiene appointments, white fillings, crowns, bridges, dentures, root canal treatment and extractions. The focus is on catching things early and treating gum disease before it costs you teeth. If you're registering somewhere new, or you've simply not been in a while, this is where you start.",
          ],
        },
        { kind: "link", link: { label: "Explore general dentistry →", href: "/general-dentistry/" } },

        { kind: "h3", text: "Cosmetic Dentistry" },
        {
          kind: "p",
          text: [
            "For when your teeth are healthy but you don't like looking at them. Veneers, composite bonding, teeth whitening and clear aligners with Invisalign — used individually or together, and always assessed against the health of the teeth underneath first. You'll be told what's realistic for your teeth before anything is booked.",
          ],
        },
        { kind: "link", link: { label: "Explore cosmetic dentistry →", href: "/cosmetic-dentistry/" } },

        { kind: "h3", text: "Dental Implants" },
        {
          kind: "p",
          text: [
            "A fixed replacement for a missing tooth that's anchored into the jaw, so it doesn't move, doesn't come out, and doesn't rely on the teeth either side. Suitable for one tooth, several, or securing a denture that has never sat properly. Planned and placed by Dr Azimi from consultation to final tooth.",
          ],
        },
        { kind: "link", link: { label: "Explore dental implants →", href: "/dental-implants/" } },

        { kind: "h3", text: "Skin Clinic" },
        {
          // COMPLIANCE (MHRA): no product brand name, no price, no offer and no
          // before-and-after promotion anywhere in this block or its landing
          // page. "Anti-wrinkle treatments" as a category is the compliant
          // framing. Under-18 exclusion stated.
          kind: "p",
          text: [
            "The same building also houses a non-surgical skin clinic — dermal fillers and anti-wrinkle treatments, assessed and carried out by a dental clinician who works with facial anatomy every day. Treatments are provided after a face-to-face consultation and assessment, never on request alone. Not available to under-18s.",
          ],
        },
        { kind: "link", link: { label: "Explore the skin clinic →", href: "/facial-rejuvenation/" } },
      ],
    },

    {
      type: "journey",
      h2: "What happens when you come in for the first time",
      steps: [
        {
          title: "You get in touch",
          body: [
            "Call **01892 547286** or send the form. You'll be asked what's bothering you and when suits — not for your life story. If you're nervous, say so on that first call. It gets noted, and it changes how the appointment is run.",
          ],
        },
        {
          title: "Your first appointment",
          body: [
            "A full look at your teeth, gums and bite, plus your medical history and anything you've been worried about. ",
            {
              placeholder:
                "[PLACEHOLDER: confirm typical length of a new-patient appointment, and whether X-rays are taken at the first visit or a later one]",
            },
          ],
        },
        {
          title: "A straight conversation",
          body: [
            "You'll be told what's there, what needs doing, what can wait and what can be left alone. If there's more than one sensible option, you'll hear all of them, with the trade-offs. Nothing is booked in the same breath as it's suggested.",
          ],
        },
        {
          title: "Everything in writing, with the cost on it",
          body: [
            "You leave with a written plan and a price, so you can think about it at home rather than deciding in the chair. ",
            {
              placeholder:
                "[PLACEHOLDER: confirm whether written treatment plans are issued as standard, and whether any consultation fee applies or is redeemable]",
            },
          ],
        },
        {
          title: "Then it's routine",
          body: [
            "Once you're up to date, it's check-ups and hygiene visits at whatever interval your mouth actually needs. That's the point where dentistry stops being a big deal.",
          ],
        },
      ],
    },

    {
      type: "cost",
      h2: "How much does it cost to see a private dentist in Tunbridge Wells?",
      intro: [
        [
          {
            placeholder:
              "[PLACEHOLDER: client to supply the full fee guide. All figures must be genuine and genuinely available.]",
          },
        ],
      ],
      table: {
        headers: ["Appointment", "From"],
        rows: [
          { cells: ["New patient examination", { placeholder: "[£X]" }] },
          { cells: ["Routine check-up", { placeholder: "[£X]" }] },
          { cells: ["Hygiene appointment", { placeholder: "[from £X]" }] },
          { cells: ["White filling", { placeholder: "[from £X]" }] },
          { cells: ["Emergency appointment", { placeholder: "[from £X]" }] },
        ],
      },
      notes: [
        [
          "iSmile is a private practice. ",
          {
            placeholder:
              "[PLACEHOLDER: confirm whether any NHS provision exists — the current site does not say either way, and patients ask this before they ask anything else]",
          },
        ],
        [
          {
            placeholder:
              "[PLACEHOLDER: confirm whether a membership or payment plan is offered, and whether finance is available. If finance is offered, FCA authorisation and specific disclosure wording are required.]",
          },
        ],
      ],
      link: { label: "See our full fee guide →", href: "/contact/" },
    },

    {
      type: "explainer",
      h2: "Taking on new patients, including the ones who've been putting it off",
      blocks: [
        { kind: "h3", text: "Are you accepting new patients?" },
        {
          kind: "p",
          text: [
            "Yes. ",
            {
              placeholder:
                "[PLACEHOLDER: confirm current new-patient availability and typical wait for a first appointment]",
            },
            " You do not need a referral, and you do not need dental records from your last practice, though they're useful if you have them.",
          ],
        },
        { kind: "h3", text: "What if I'm frightened of the dentist?" },
        {
          kind: "p",
          text: [
            "Tell us on the phone, before you arrive. It's one of the most common things people say when they ring, and it changes how the appointment is run — more time booked, nothing done at the first visit that you haven't agreed to, and a clear signal that stops everything if you need a moment.",
          ],
        },
        {
          kind: "p",
          text: [
            "Most nervous patients are afraid of two things: being hurt, and being judged. We use effective local anaesthetic and take the time to let it work properly, and we explain what we're doing before we do it rather than narrating it afterwards. As for judgement — if you've avoided dentists for a decade, you are in extremely ordinary company here.",
          ],
        },
        {
          kind: "note",
          text: [
            {
              placeholder:
                "[PLACEHOLDER: confirm whether sedation is available for very anxious patients]",
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
          q: "Where is iSmile Dental Practice?",
          a: [
            "1 The Lodge, Mount Pleasant Avenue, Royal Tunbridge Wells, Kent TN1 1QY. The practice sits at the entrance to Calverley Park, directly opposite Tunbridge Wells railway station.",
          ],
        },
        {
          q: "Are you an NHS or a private dentist?",
          a: [
            "iSmile is a private dental practice. ",
            {
              placeholder:
                "[PLACEHOLDER: confirm whether any NHS treatment is offered, including for children]",
            },
          ],
        },
        {
          q: "Are you taking on new patients?",
          a: [
            "Yes. ",
            {
              placeholder:
                "[PLACEHOLDER: confirm availability and typical waiting time for a first appointment]",
            },
            " Call **01892 547286** or use the form on this page.",
          ],
        },
        {
          q: "What are your opening hours?",
          a: [
            {
              placeholder:
                "[PLACEHOLDER: opening hours — not published anywhere on the current site. Add to the Google Business Profile and to schema at the same time.]",
            },
          ],
        },
        {
          q: "Is there parking?",
          a: [
            {
              placeholder:
                "[PLACEHOLDER: confirm parking — on-site spaces, nearest car park, and whether surrounding streets are permit-controlled]",
            },
          ],
        },
        {
          q: "Who will I see?",
          a: [
            "Dr Simon Azimi, GDC 81382. He's the practice's dentist, and in most cases the same person will examine you, plan your treatment and carry it out.",
          ],
        },
        {
          q: "Do you see children?",
          a: [
            {
              placeholder:
                "[PLACEHOLDER: confirm whether children are seen, from what age, and on what basis]",
            },
          ],
        },
        {
          q: "Can I be seen the same day if I'm in pain?",
          a: [
            {
              placeholder:
                "[PLACEHOLDER: confirm the urgent and emergency appointment policy — whether same-day slots are held, and out-of-hours arrangements]",
            },
            " The current site offers emergency dentistry but does not say how it works in practice.",
          ],
        },
        {
          q: "I haven't been to a dentist in years. Is that a problem?",
          a: [
            "No, and it's more common than you'd think. The first appointment is an examination and a conversation, not a list of things you should have done differently. Nothing is treated at that visit unless you've agreed to it.",
          ],
        },
        {
          q: "Do you use mercury fillings?",
          a: [
            "No. iSmile is a mercury-free practice and uses tooth-coloured materials for fillings.",
          ],
        },
        {
          q: "Do you offer implants and Invisalign?",
          a: [
            "Yes — both are provided here rather than referred out. Dental implants replace missing teeth; Invisalign uses clear removable aligners to straighten teeth without fixed braces.",
          ],
        },
        {
          q: "Do you do facial aesthetics as well as dentistry?",
          a: [
            "Yes. There's a non-surgical skin clinic in the same building offering dermal fillers and anti-wrinkle treatments, following a face-to-face consultation. These treatments are not available to anyone under 18.",
          ],
        },
      ],
    },

    {
      type: "areas",
      h2: "A dentist for Tunbridge Wells and the towns around it",
      body: [
        [
          "Being directly opposite Tunbridge Wells railway station changes what an appointment costs you in time. If you commute, you can be seen before your train. If you're driving in, you're at the Calverley Park end of town rather than fighting through the middle of it.",
        ],
        [
          "Patients come to us from **Southborough** and **Rusthall**, both around ten minutes away, from **Pembury** and **Tonbridge** off the A21 and A26, and from **Langton Green** and **Speldhurst** on the Rusthall side. The villages south of town — **Bidborough**, **Frant** and **Groombridge** — are a straightforward run in, and the station makes it simple if you'd rather not drive at all.",
        ],
      ],
    },

    {
      type: "finalCta",
      h2: "Book an appointment, or just ask a question first",
      body: [
        [
          "If you know what you need, book it. If you don't, ring and describe the problem — you'll get an honest answer about whether it needs seeing, and roughly what it involves, before you commit to anything.",
        ],
      ],
      primaryLabel: "Book my appointment",
      secondary: [
        "Or call us on **01892 547286** — we're happy to answer questions over the phone first.",
      ],
    },
  ],
};
