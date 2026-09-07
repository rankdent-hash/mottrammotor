import type { PageContent } from "@/lib/content/types";

// Copy transcribed verbatim from copy/01-core-pages.md, Page 2.
//
// LAUNCH BLOCKER carried from that page's build notes: the old site runs two
// contradictory treatment guarantees — five years on Our Story, ten years on
// Cosmetic Dentistry — neither with published terms. Both are omitted here.
// Either supply written terms and a single consistent period, or drop the
// claim permanently.

export const ourStory: PageContent = {
  slug: "/our-story/",
  metaTitle: "About iSmile Dental Practice | Tunbridge Wells Dentist",
  metaDescription:
    "Meet iSmile Dental Practice — an independent dentist at the entrance to Calverley Park, Royal Tunbridge Wells, led by Dr Simon Azimi. Call 01892 547286.",
  h1: "About iSmile — An Independent Tunbridge Wells Practice Where You See the Same Dentist",
  primaryKeyword: "iSmile Dental Practice Tunbridge Wells",
  secondaryKeywords: [
    "independent dentist Tunbridge Wells",
    "private dental practice Tunbridge Wells",
    "family dentist Tunbridge Wells",
    "mercury-free dentist Kent",
    "dentist Calverley Park",
  ],
  coreDesire:
    "To find out whether this place is any good — and whether these are their kind of people. Will they be treated as a person, or processed?",
  breadcrumb: [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/our-story/" },
  ],
  reviewed: {
    by: "Dr Simon Azimi, GDC 81382",
    date: { placeholder: "[PLACEHOLDER: last reviewed date]" },
  },

  sections: [
    {
      type: "hero",
      h1: "About iSmile — An Independent Tunbridge Wells Practice Where You See the Same Dentist",
      subhead:
        "A small private practice in a lodge at the entrance to Calverley Park, run by one dentist who does the treatment himself.",
      formHeading: "Come and meet us",
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
        "Independent, not part of a chain",
        "Dr Simon Azimi, GDC 81382",
        "At the entrance to Calverley Park",
        "Mercury-free practice",
        { placeholder: "[PLACEHOLDER: X.X ★ on Google]" },
      ],
    },

    {
      type: "recognise",
      h2: "You're not really reading this page to learn about us",
      body: [
        ["You're trying to work out what it's going to be like."],
        [
          "Whether you'll be met by someone who looks up when you walk in, or by a screen and a queue. Whether the dentist will explain things or talk across you. Whether you'll be sold something. Whether, if you say “I'm a bit nervous about this,” anyone will actually do anything differently.",
        ],
        [
          "Choosing a dentist is not like choosing a plumber. You are going to lie down, in a room, and let a stranger work in your mouth while you can't speak. It is entirely reasonable to want to know who they are first.",
        ],
        ["So here is what this practice is actually like, in plain terms."],
      ],
    },

    {
      type: "outcome",
      h2: "What being a patient here is like",
      body: [
        ["You come to the same door, and you see the same dentist."],
        [
          "He knows the tooth on the lower left that's been patched twice. He knows you'd rather have the injection before you see the needle. He knows you were a wreck the first time you came in and that you're not any more. None of that has to be re-established at each appointment, because nobody hands you on to somebody else.",
        ],
        [
          "The practice is small, so it moves at a human pace. You're not called through by a number. If you ring with a question, the person answering usually knows who you are.",
        ],
        [
          "And the honest test of any dental practice is what happens when there's nothing wrong. Here, that appointment is short, you're told your teeth are fine, and you go home. Nobody goes looking for work.",
        ],
      ],
    },

    {
      type: "whyChoose",
      h2: "What makes this practice different from the one down the road",
      points: [
        {
          title: "One dentist, from start to finish.",
          body: [
            "Dr Simon Azimi (GDC 81382) examines you, plans your treatment and carries it out himself. That's rarer than it sounds. In larger practices, a treatment plan is often drawn up by one clinician and delivered by another, and the person who knows your history isn't the person holding the handpiece.",
          ],
        },
        {
          title: "Independent, so the only pressure is clinical.",
          body: [
            "There is no corporate owner setting monthly treatment targets here, and there is no sales script. The recommendation you get is the recommendation the dentist thinks is right, including when that recommendation is to do nothing yet.",
          ],
        },
        {
          title: "Preventative first, and as little dentistry as the job needs.",
          body: [
            "The aim is to catch problems while they're still small and cheap to fix, and to carry out the minimum amount of treatment your clinical need actually calls for. That's a stated principle here, not a slogan — it's how appointments are planned.",
          ],
        },
        {
          title: "Nervous patients are a normal part of the day.",
          body: [
            "Not an exception that has to be accommodated. If you've avoided dentists for years, you'll be one of several people in the diary this week who have.",
          ],
        },
        {
          title: "A building you can actually park a life around.",
          body: [
            "1 The Lodge sits at the entrance to Calverley Park, directly opposite Tunbridge Wells railway station — which makes appointments realistic for people who work, commute or are fitting dentistry around school runs.",
          ],
        },
        {
          title: "A mercury-free practice.",
          body: [
            // Plain factual statement only. The comparative claim is not
            // reinstatable without documented evidence.
            "Tooth-coloured, mercury-free materials are used throughout.",
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
              "[PLACEHOLDER: real review — ideally about how the practice made someone feel, rather than about a treatment]",
          },
          attribution: "— First name, Town",
        },
        {
          quote: {
            placeholder:
              "[PLACEHOLDER: real review — ideally from a long-standing patient, mentioning how long they've been coming]",
          },
          attribution: "— First name, Town",
        },
        {
          quote: {
            placeholder:
              "[PLACEHOLDER: real review — ideally mentioning the team or reception rather than only the dentist]",
          },
          attribution: "— First name, Town",
        },
      ],
      link: { label: "Read all our reviews on Google", href: "/contact/" },
    },

    {
      type: "explainer",
      h2: "Where iSmile came from",
      blocks: [
        {
          kind: "definition",
          text: "iSmile Dental Practice is an independent private dental and skin clinic in Royal Tunbridge Wells, led by Dr Simon Azimi, GDC 81382.",
        },
        {
          kind: "p",
          text: [
            "It provides general dentistry, cosmetic dentistry, dental implants and non-surgical skin treatments from a single building at the entrance to Calverley Park.",
          ],
        },
        {
          kind: "note",
          text: [
            {
              placeholder:
                "[PLACEHOLDER: the year the practice opened, and a short account of why Dr Azimi set it up. The single most valuable missing piece on this page — two or three honest sentences in his own words will do more for trust than anything else here. Ask him what he was trying to do differently, and what he wanted to avoid.]",
            },
          ],
        },

        { kind: "h3", text: "The building" },
        {
          kind: "p",
          text: [
            "The practice occupies 1 The Lodge — a lodge building at the entrance to Calverley Park, on Mount Pleasant Avenue.",
          ],
        },
        {
          kind: "p",
          text: [
            "It matters for two reasons. The first is practical: you are directly opposite Tunbridge Wells railway station, which means a dental appointment can be slotted into a working day rather than costing you one. The second is the thing people mention when they arrive. It doesn't look or feel like a clinic on a retail park. It's a small building at the edge of a park, and the walk up to the door is a considerably gentler start to a dental appointment than a strip-lit waiting room off a dual carriageway.",
          ],
        },
        {
          kind: "note",
          text: [
            {
              placeholder:
                "[PLACEHOLDER: confirm the building's history and any listed status. Worth two sentences if The Lodge has a genuine heritage story attached to Calverley Park — but only if it can be verified.]",
            },
          ],
        },
        {
          kind: "note",
          text: [
            {
              placeholder:
                "[BUILD: this section needs real photography — the exterior of The Lodge, the entrance, the waiting area and a surgery. Stock images of unrelated dental practices will actively undermine the page. Recommend a half-day shoot before launch.]",
            },
          ],
        },

        { kind: "h3", text: "What we do here" },
        {
          kind: "list",
          items: [
            [
              "**General dentistry** — check-ups, hygiene, white fillings, crowns, bridges, dentures, root canal treatment and extractions",
            ],
            [
              "**Cosmetic dentistry** — veneers, composite bonding, teeth whitening and Invisalign clear aligners",
            ],
            [
              "**Dental implants** — planned and placed on site, from single teeth to implant-stabilised dentures",
            ],
            [
              "**Skin clinic** — non-surgical dermal fillers and anti-wrinkle treatments, following a face-to-face consultation. Not available to under-18s.",
            ],
          ],
        },
      ],
    },

    {
      type: "explainer",
      h2: "How we decide what treatment you actually need",
      blocks: [
        {
          kind: "p",
          text: [
            "The starting point is that dentistry should be the smallest intervention that solves the problem, and that prevention is cheaper, quicker and less unpleasant than repair. That principle shapes everything from how long appointments are booked to what gets recommended.",
          ],
        },
        { kind: "p", text: ["These are the standards the practice works to:"] },
        {
          kind: "list",
          items: [
            [
              "**Prevention comes first.** The aim is good long-term oral health, not a rolling programme of repairs. Where a problem can be halted rather than treated, that's the route we take.",
            ],
            [
              "**The minimum amount of dentistry that meets the clinical need.** No more, and equally, no less — a tooth that needs treating gets treated.",
            ],
            [
              "**Only recognised, clinically approved restoration materials.** Nothing goes into your mouth that isn't properly evidenced.",
            ],
            [
              "**Registered dental laboratories only,** using fully tested and accredited products, for anything made outside the practice — crowns, veneers, dentures and bridges.",
            ],
            [
              "**As few appointments as the treatment allows.** Your time counts. Where work can safely be combined into one visit rather than three, it is.",
            ],
            [
              "**Treatment carried out in properly controlled, hygienic surroundings,** to the decontamination standards required of a registered dental practice.",
            ],
          ],
        },

        { kind: "h3", text: "A mercury-free practice" },
        {
          kind: "p",
          text: [
            "iSmile is a mercury-free practice. We don't place dental amalgam — the silver-grey filling material that contains mercury — and we use tooth-coloured composite and ceramic materials instead.",
          ],
        },
        {
          // The old site's mercury toxicology copy is deliberately not carried
          // over: it reads as a health scare about a material that remains
          // legal and in use, and invites an ASA challenge it does not need.
          kind: "p",
          text: [
            "That's partly about how a filling looks, and partly about the material itself: composite bonds to the tooth, so less healthy tooth has to be removed to hold it in place. If you have existing amalgam fillings, they don't automatically need replacing, and you won't be told they do. Sound amalgam fillings are usually best left alone.",
          ],
        },

        { kind: "h3", text: "Being straight about money" },
        {
          kind: "p",
          text: [
            "You'll be told what something costs before it's booked, in writing, with the alternatives and their prices alongside it. Nothing gets started on the understanding that the total will become clear later.",
          ],
        },
        {
          kind: "note",
          text: [
            {
              placeholder:
                "[PLACEHOLDER: fee guide. A published price list belongs on this site — at minimum “from” prices for examination, hygiene, white fillings, crowns, whitening, implants and Invisalign.]",
            },
          ],
        },
        { kind: "link", link: { label: "See our fee guide →", href: "/contact/" } },
      ],
    },

    {
      type: "explainer",
      h2: "Why it matters that you see the same dentist every time",
      blocks: [
        {
          kind: "p",
          text: [
            "Because dentistry is a long game, and the person treating you is more useful when they can remember what your mouth looked like two years ago.",
          ],
        },
        {
          kind: "p",
          text: [
            "A dentist who has seen your teeth over several years notices the things a first-time examiner can't: the filling that's been slowly failing, the wear pattern that says you're grinding at night, the gum margin that has moved three millimetres since 2023. That's how small problems get caught while they're still small.",
          ],
        },
        {
          kind: "p",
          text: [
            "It works the other way too. If you're anxious, continuity is most of the treatment. Trust does not transfer between clinicians. It has to be built once, with one person, and then it holds — which is why patients who've had a bad experience elsewhere often settle very quickly here, and then stop dreading appointments altogether.",
          ],
        },
        {
          kind: "p",
          text: [
            "You will be told if someone else needs to be involved. Some work is better referred, and being told that honestly is part of the same principle.",
          ],
        },
        { kind: "link", link: { label: "Meet the team →", href: "/team/" } },
      ],
    },

    {
      type: "explainer",
      h2: "What happens if you're frightened of the dentist",
      blocks: [
        {
          kind: "p",
          text: [
            "You say so when you book, and the appointment is run differently from that point on.",
          ],
        },
        {
          kind: "p",
          text: [
            "That means more time in the diary, so nothing is rushed. It means an examination and a conversation at the first visit, with no treatment carried out unless you have agreed to it. It means being told what's about to happen before it happens, and a signal — usually a raised hand — that stops everything, immediately, no explanation required.",
          ],
        },
        {
          kind: "p",
          text: [
            "Dental anxiety usually comes from one of three places, and each has a practical answer:",
          ],
        },
        {
          kind: "list",
          items: [
            [
              "**Fear of pain.** We use effective local anaesthetic and wait for it to work properly rather than starting the moment it's given. Most people find the injection itself is the worst of it, and that it's far less than they'd braced for.",
            ],
            [
              "**Fear of being judged.** If it's been years, you are not unusual and you will not be told off. Nobody here is impressed or appalled by the state of anyone's teeth; it's just information about what to do next.",
            ],
            [
              "**Fear of losing control.** You're told what's happening, you can stop it at any point, and nothing is done that you haven't agreed to in advance.",
            ],
          ],
        },
        {
          kind: "note",
          text: [
            {
              placeholder:
                "[PLACEHOLDER: confirm whether sedation is available for severely anxious patients, and if so what type]",
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
          q: "Is iSmile an NHS or a private dentist?",
          a: [
            "iSmile is a private dental practice in Royal Tunbridge Wells. ",
            {
              placeholder:
                "[PLACEHOLDER: confirm whether any NHS provision exists, including for children]",
            },
          ],
        },
        {
          q: "Who owns the practice?",
          a: [
            "It's an independent practice led by Dr Simon Azimi, GDC 81382 — not part of a corporate dental group. ",
            {
              placeholder:
                "[PLACEHOLDER: confirm the registered company name and number for the footer and for Companies House consistency; neither appears anywhere on the current site]",
            },
          ],
        },
        {
          q: "Will I see the same dentist each time?",
          a: [
            "Yes, in almost all cases. Dr Azimi examines, plans and carries out treatment himself, which is the main reason people give for staying.",
          ],
        },
        {
          q: "Are you taking on new patients?",
          a: [
            "Yes. ",
            {
              placeholder:
                "[PLACEHOLDER: confirm current availability and typical wait for a first appointment]",
            },
            " No referral is needed.",
          ],
        },
        {
          q: "Do you treat families and children?",
          a: [
            "The practice is family-friendly. ",
            {
              placeholder:
                "[PLACEHOLDER: confirm whether children are treated, from what age, and on what basis]",
            },
          ],
        },
        {
          q: "What does mercury-free mean?",
          a: [
            "It means the practice doesn't place amalgam fillings — the silver-grey material containing mercury. Tooth-coloured composite and ceramic materials are used instead.",
          ],
        },
        {
          q: "Do I need to have my old amalgam fillings replaced?",
          a: [
            "Not usually. A sound amalgam filling that isn't leaking or decaying underneath is generally best left in place. You'll be given a straight answer about your own fillings rather than a blanket recommendation.",
          ],
        },
        {
          q: "Is the practice regulated?",
          a: [
            "Yes. Dr Azimi is registered with the General Dental Council (GDC 81382), and dental practices in England are registered with and inspected by the Care Quality Commission. ",
            { placeholder: "[PLACEHOLDER: CQC provider registration number for display]" },
          ],
        },
        {
          q: "Where exactly is the practice?",
          a: [
            "1 The Lodge, Mount Pleasant Avenue, Royal Tunbridge Wells, Kent TN1 1QY — at the entrance to Calverley Park, directly opposite Tunbridge Wells railway station.",
          ],
        },
        {
          q: "What if I'm unhappy with something?",
          a: [
            "Tell us, and it will be dealt with properly. The practice has a written complaints procedure, and you can ask for a copy at reception or find it on this site. Nothing about raising a concern affects the care you receive.",
          ],
        },
      ],
    },

    {
      type: "areas",
      h2: "The people who come to us",
      body: [
        [
          "Plenty of our patients started coming when they lived in town and kept coming after they moved out to the villages — which is the most useful thing you can know about a dental practice, really.",
        ],
        [
          "They travel in from **Speldhurst** and **Langton Green** on the western side, from **Bidborough** and **Southborough** on the Tonbridge road, and from **Frant** and **Groombridge** to the south. Others come from **Tonbridge**, **Pembury** and **Rusthall**, and a fair number get the train in and walk across from the station.",
        ],
        [
          "If you're weighing up whether it's worth the journey: most of the reason people make it is not the treatment. It's not having to explain themselves again to somebody new.",
        ],
      ],
    },

    {
      type: "finalCta",
      h2: "Come and see whether we suit you",
      body: [
        [
          "The first appointment is an examination and a conversation. You'll find out what state your teeth are actually in, what — if anything — needs doing, and what it would cost. You'll also find out whether you like the place, which is the part nobody puts on a website.",
        ],
      ],
      primaryLabel: "Book my first appointment",
      secondary: [
        "Or call us on **01892 547286** — ask anything you like before you book.",
      ],
    },
  ],
};
