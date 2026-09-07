import type { PageContent } from "@/lib/content/types";

// Copy transcribed verbatim from copy/01-core-pages.md, Page 4.
//
// LAUNCH BLOCKERS on this page:
//  - The complaints procedure must exist as its own page and be linked
//    sitewide. Its absence is a GDC Standards gap, not a content nicety.
//  - The enquiry form collects health-related information — special category
//    data under UK GDPR. It needs a lawful basis, a privacy notice at the
//    point of collection, and a secure business-domain destination. The free
//    Yahoo address must be retired.
//
// No response time, waiting time or emergency availability is asserted
// anywhere on this page. Every one is a placeholder, because publishing a
// service promise the practice cannot keep is both a CAP issue and a
// reputational one.

export const contact: PageContent = {
  slug: "/contact/",
  metaTitle: "Contact iSmile Dental Practice | Tunbridge Wells Dentist",
  metaDescription:
    "Contact iSmile Dental Practice, 1 The Lodge, Mount Pleasant Avenue, Royal Tunbridge Wells TN1 1QY — opposite the station. Call us on 01892 547286.",
  h1: "Contact iSmile Dental Practice — Opposite Tunbridge Wells Station",
  primaryKeyword: "dentist Tunbridge Wells contact",
  secondaryKeywords: [
    "dentist near Tunbridge Wells station",
    "dental practice TN1 1QY",
    "book a dentist appointment Tunbridge Wells",
    "emergency dentist Tunbridge Wells",
    "dentist Mount Pleasant Avenue",
  ],
  coreDesire:
    "To find out how to get there, when they're open, and how quickly they can actually be seen.",
  breadcrumb: [
    { label: "Home", href: "/" },
    { label: "Contact", href: "/contact/" },
  ],
  reviewed: {
    by: "Dr Simon Azimi, GDC 81382",
    date: { placeholder: "[PLACEHOLDER: last reviewed date]" },
  },

  sections: [
    {
      type: "hero",
      h1: "Contact iSmile Dental Practice — Opposite Tunbridge Wells Station",
      subhead:
        "Call, send the form, or walk in and ask. Whichever is easiest — someone will get back to you either way.",
      formHeading: "Send us a message",
      formOptions: [
        "General dentistry",
        "Cosmetic dentistry",
        "Dental implants",
        "Skin clinic",
        "Urgent — I'm in pain",
        "I'm not sure yet",
      ],
      extraFields: ["email", "message"],
      buttonLabel: "Send my enquiry",
      underForm: [
        "Prefer to talk? Call **01892 547286**",
        {
          placeholder:
            "[PLACEHOLDER: confirm response time — do not publish a promise that cannot be kept]",
        },
        "If you're in pain, please ring rather than using the form.",
      ],
    },

    {
      type: "trustStrip",
      items: [
        "Opposite Tunbridge Wells station",
        "Dr Simon Azimi, GDC 81382",
        "New and nervous patients welcome",
        { placeholder: "[PLACEHOLDER: X.X ★ on Google]" },
        { placeholder: "[PLACEHOLDER: opening hours summary line]" },
      ],
    },

    {
      type: "explainer",
      h2: "Where is iSmile Dental Practice?",
      blocks: [
        {
          kind: "definition",
          text: "iSmile Dental Practice is at 1 The Lodge, Mount Pleasant Avenue, Royal Tunbridge Wells, Kent TN1 1QY — at the entrance to Calverley Park, directly opposite Tunbridge Wells railway station.",
        },

        { kind: "h3", text: "Address" },
        {
          kind: "list",
          items: [
            ["iSmile Dental Practice"],
            ["1 The Lodge"],
            ["Mount Pleasant Avenue"],
            ["Royal Tunbridge Wells"],
            ["Kent"],
            ["TN1 1QY"],
          ],
        },

        { kind: "h3", text: "Phone" },
        { kind: "p", text: ["**01892 547286**"] },

        { kind: "h3", text: "Email" },
        {
          kind: "note",
          text: [
            {
              placeholder:
                "[PLACEHOLDER: a business-domain address is needed — recommend info@ismiledentalpractice.co.uk. The site currently publishes a free Yahoo address on every page, which harms credibility and deliverability and is not an appropriate destination for patient health information.]",
            },
          ],
        },

        { kind: "h3", text: "Opening hours" },
        {
          kind: "note",
          text: [
            {
              placeholder:
                "[PLACEHOLDER: opening hours are not published anywhere on the current site. This is the most-searched piece of information about any dental practice and its absence is costing enquiries. Supply hours for each day including any evening or Saturday sessions, plus bank holiday arrangements. Once confirmed they must appear here, in the footer, in the Dentist schema openingHoursSpecification and on the Google Business Profile — identically in all four places.]",
            },
          ],
        },
        {
          kind: "table",
          table: {
            headers: ["Day", "Hours"],
            rows: [
              { cells: ["Monday", { placeholder: "[PLACEHOLDER]" }] },
              { cells: ["Tuesday", { placeholder: "[PLACEHOLDER]" }] },
              { cells: ["Wednesday", { placeholder: "[PLACEHOLDER]" }] },
              { cells: ["Thursday", { placeholder: "[PLACEHOLDER]" }] },
              { cells: ["Friday", { placeholder: "[PLACEHOLDER]" }] },
              { cells: ["Saturday", { placeholder: "[PLACEHOLDER]" }] },
              { cells: ["Sunday", { placeholder: "[PLACEHOLDER]" }] },
            ],
          },
        },

        { kind: "h3", text: "Map" },
        {
          kind: "note",
          text: [
            {
              placeholder:
                "[BUILD: embedded Google Map centred on TN1 1QY, lazy-loaded so it doesn't slow the page, with a “Get directions” button opening the route in the user's own maps app. Set the pin from the verified Google Business Profile so the embed, the profile and the site all agree.]",
            },
          ],
        },
        {
          kind: "note",
          text: [
            {
              placeholder:
                "[PLACEHOLDER — VERIFY BEFORE BUILD: two Google Business Profile links are in circulation. Duplicate listings split reviews and suppress local rankings. The client must confirm which is verified; the other should be claimed and merged or removed through Google, not simply ignored.]",
            },
          ],
        },
      ],
    },

    {
      type: "explainer",
      h2: "How do I get to the practice?",
      blocks: [
        {
          kind: "p",
          text: [
            "The practice sits at the entrance to Calverley Park on Mount Pleasant Avenue, opposite Tunbridge Wells railway station. It is a few minutes' walk from the top of the High Street and from Royal Victoria Place.",
          ],
        },

        { kind: "h3", text: "By train" },
        {
          kind: "p",
          text: [
            "Tunbridge Wells station is directly opposite. Trains run on the Hastings line, with direct services from London Charing Cross, London Bridge, Sevenoaks, Tonbridge, Wadhurst, Frant and Hastings.",
          ],
        },
        {
          kind: "p",
          text: [
            "For most people that means an appointment can be fitted around a working day rather than costing one. ",
            {
              placeholder:
                "[PLACEHOLDER: confirm which station exit is closest and the walking time from the platform, so this can be written precisely]",
            },
          ],
        },

        { kind: "h3", text: "By car" },
        {
          kind: "p",
          text: [
            "Coming from **Tonbridge**, **Southborough** or **Bidborough**, follow the A26 into Tunbridge Wells. From **Pembury** and the A21, come in on the A264. From **Langton Green**, **Rusthall** and **Speldhurst**, approach from the west. From **Frant** and **Groombridge**, come up through the south of the town.",
          ],
        },
        {
          kind: "note",
          text: [
            {
              placeholder:
                "[PLACEHOLDER: confirm the best final approach for drivers — which road to turn off, and where the entrance to Mount Pleasant Avenue is. Written directions at street level are more useful than the map to anyone who has never been.]",
            },
          ],
        },

        { kind: "h3", text: "Parking" },
        {
          kind: "note",
          text: [
            {
              placeholder:
                "[PLACEHOLDER: the second most-asked question after opening hours, with no answer anywhere on the site. Confirm — are there spaces at the practice and how many? Nearest public car park and roughly what it costs? Are surrounding streets permit-controlled or time-limited? Is there a drop-off point? An honest “no on-site parking, nearest car park is X, about four minutes' walk” is far better than silence.]",
            },
          ],
        },

        { kind: "h3", text: "On foot" },
        {
          kind: "p",
          text: [
            "From the station it's a short, flat walk across to the entrance to Calverley Park. From the High Street or Royal Victoria Place, head up towards Mount Pleasant and the station; the practice is on Mount Pleasant Avenue at the park entrance. ",
            {
              placeholder:
                "[PLACEHOLDER: confirm approximate walking times from the station, the High Street and the town centre car parks]",
            },
          ],
        },

        { kind: "h3", text: "By bus" },
        {
          kind: "note",
          text: [
            {
              placeholder:
                "[PLACEHOLDER: confirm the nearest bus stops and which services use them. Tunbridge Wells bus station is close to the railway station, but the specifics should be confirmed rather than assumed.]",
            },
          ],
        },

        { kind: "h3", text: "Accessibility" },
        {
          kind: "note",
          text: [
            {
              placeholder:
                "[PLACEHOLDER: please confirm and be precise — vague accessibility copy is worse than none. Step-free access into the building? Steps or a slope at the entrance? Are surgeries on the ground floor, or is there a lift? A suitable toilet? A wheelchair-accessible route from the nearest parking? Can a patient who cannot manage stairs be treated on the ground floor? If access is limited, say so plainly and say what can be arranged instead — people will make it work, but they need to know in advance.]",
            },
          ],
        },
      ],
    },

    {
      type: "journey",
      h2: "What happens after you contact us",
      steps: [
        {
          title: "We get back to you",
          body: [
            "If you ring during opening hours you'll usually speak to someone straight away. If you send the form or leave a message, we'll come back to you. ",
            {
              placeholder:
                "[PLACEHOLDER: confirm typical response time so this can be stated as a fact rather than left vague]",
            },
          ],
        },
        {
          title: "We work out what you need",
          body: [
            "You'll be asked what's bothering you and how long it's been going on. That's how we decide whether you need a routine examination, a longer appointment, or to be seen urgently. If you're in pain, say so immediately — it changes how the call is handled.",
          ],
        },
        {
          title: "We book you in",
          body: [
            "You'll be given an appointment time and told roughly how long to allow, so you can plan the rest of your day around it. If you tell us you're nervous, that gets recorded on your notes and the appointment is booked with more time.",
          ],
        },
        {
          title: "You come in",
          body: [
            {
              placeholder:
                "[PLACEHOLDER: confirm what a new patient should bring or complete beforehand — a medical history form, details of any medication, previous X-rays or records if they have them. If there's an online form to complete before the visit, link it here; it saves ten minutes in the chair.]",
            },
          ],
        },
        {
          title: "You get a plan, in writing",
          body: [
            "After your examination you'll be told what's going on, what the options are and what each one costs, before anything is booked. You take that away and decide in your own time.",
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
              "[PLACEHOLDER: real review — ideally mentioning how easy the practice was to get to or to get an appointment at]",
          },
          attribution: "— First name, Town",
        },
        {
          quote: {
            placeholder: "[PLACEHOLDER: real review — ideally from a new patient's first visit]",
          },
          attribution: "— First name, Town",
        },
        {
          quote: {
            placeholder:
              "[PLACEHOLDER: real review — ideally mentioning being seen quickly when in pain]",
          },
          attribution: "— First name, Town",
        },
      ],
      link: { label: "Read all our reviews on Google", href: "/contact/" },
    },

    {
      type: "explainer",
      h2: "I've never been to this practice before. What do I do?",
      blocks: [
        {
          kind: "p",
          text: [
            "Ring **01892 547286** or send the form on this page, and ask for a new patient appointment. There's no referral needed, no forms to chase beforehand, and no requirement to have records from your last dentist — helpful if you have them, but not a barrier if you don't.",
          ],
        },
        {
          kind: "p",
          text: [
            "Your first visit is an examination and a conversation. Dr Azimi will look at your teeth, gums and bite, go through your medical history, and ask what's been bothering you. Nothing is treated at that appointment unless you have specifically agreed to it in advance.",
          ],
        },
        {
          kind: "p",
          text: [
            "Then you'll be told what's actually there. If something needs doing, you'll hear what the options are and what each costs, in writing, before anything is booked. If nothing needs doing, you'll be told that too, and you'll go home.",
          ],
        },
        {
          kind: "note",
          text: [
            {
              placeholder:
                "[PLACEHOLDER: confirm current new-patient availability and typical wait. A specific answer — “we can usually see new patients within X” — converts significantly better than “please get in touch”.]",
            },
          ],
        },
        {
          kind: "note",
          text: [
            {
              placeholder:
                "[PLACEHOLDER: confirm the cost of a new patient examination, and whether it includes X-rays]",
            },
          ],
        },

        { kind: "h3", text: "If it's been a long time since your last dentist" },
        {
          kind: "p",
          text: [
            "That's a very common reason people are reading this page rather than booking. It is not held against anyone here. You will not be told off, and you will not be handed a long list of work in your first ten minutes. Tell whoever answers the phone that you're nervous or that it's been years — it's routine to hear it, and it changes how your appointment is set up.",
          ],
        },
      ],
    },

    {
      // The medical safety signposting here — A&E and 999 for airway and
      // swallowing symptoms, NHS 111 out of hours — stays in. Removing it to
      // streamline the page would be a mistake.
      type: "risk",
      h2: "Can I be seen urgently if I'm in pain?",
      blocks: [
        {
          kind: "note",
          text: [
            {
              placeholder:
                "[PLACEHOLDER — POLICY NEEDED. The current site advertises emergency dentistry but says nothing about how it works, so the page attracts people in pain and then fails them. Confirm: are same-day or next-day urgent slots held back, how many and at what times? Are existing patients prioritised, or are both seen? What does an urgent appointment cost? What happens outside opening hours, at weekends and on bank holidays — an out-of-hours arrangement, an answerphone message with instructions, or a referral to NHS 111? And what should someone do with a knocked-out tooth, a broken tooth, a lost crown or facial swelling before they can get to you?]",
            },
          ],
        },
        {
          kind: "p",
          text: [
            "If you're in pain, ring **01892 547286** rather than using the form. Describe what's happening and how long it's been going on, and you'll be advised what to do next. ",
            { placeholder: "[PLACEHOLDER: same-day and urgent appointment policy]" },
          ],
        },
        { kind: "h3", text: "Some things should not wait" },
        {
          kind: "list",
          items: [
            [
              "Facial swelling, particularly if it's spreading, affecting your eye, or making it difficult to swallow or breathe — this needs urgent medical attention, not a routine appointment. Go to A&E or ring 999 if you are struggling to breathe or swallow.",
            ],
            ["A knocked-out adult tooth — time matters a great deal here. Ring straight away."],
            ["Uncontrolled bleeding after a dental procedure."],
            [
              "Severe pain that painkillers aren't touching, or pain that's keeping you awake.",
            ],
          ],
        },
        { kind: "h3", text: "Outside our opening hours" },
        {
          kind: "note",
          text: [
            {
              placeholder:
                "[PLACEHOLDER: out-of-hours arrangements. If there is no out-of-hours service, say so and direct people to NHS 111, which can arrange urgent dental care in England. An honest signpost is far better than an unanswered phone.]",
            },
          ],
        },
      ],
    },

    {
      type: "explainer",
      h2: "What if I don't want to phone?",
      blocks: [
        {
          kind: "p",
          text: [
            "Use the form on this page instead, and say in the message that you'd prefer to be contacted by email. Plenty of people find the phone call the hardest part, particularly if they're anxious or if it's been a long time, and there's no reason it has to be the first step.",
          ],
        },
        {
          kind: "p",
          text: [
            "You can put as much or as little in the message as you want. “I need a check-up” is enough. So is a paragraph explaining exactly what you're worried about — if you'd rather have said it in writing first than out loud in a waiting room, that's genuinely useful for us to have read before you arrive.",
          ],
        },
        {
          kind: "note",
          text: [
            {
              placeholder:
                "[PLACEHOLDER: confirm whether the practice accepts enquiries by WhatsApp or text, and whether appointment reminders are sent by text or email]",
            },
          ],
        },
      ],
    },

    {
      type: "explainer",
      h2: "How do I raise a concern or make a complaint?",
      blocks: [
        {
          kind: "p",
          text: [
            "Tell us. Speak to whoever is on reception, or ask for the practice's complaints procedure, and your concern will be looked into properly and answered.",
          ],
        },
        {
          kind: "p",
          text: [
            "The practice has a written complaints procedure, available on request and on this website. Raising a concern will not affect the care you receive, now or later.",
          ],
        },
        {
          kind: "note",
          text: [
            {
              placeholder:
                "[PLACEHOLDER: name and role of the person who handles complaints, the address or email complaints should be sent to, and the timescales set out in the practice's written procedure. The procedure should be published as its own page and linked from the footer sitewide. LAUNCH BLOCKER — an accessible complaints procedure is a GDC Standards requirement.]",
            },
          ],
        },
        { kind: "h3", text: "If you're not satisfied with our response" },
        {
          kind: "p",
          text: [
            "For private dental treatment in England, you can contact the **Dental Complaints Service**, which is run by the General Dental Council and is free to use. Concerns about a dental professional's conduct or fitness to practise can be raised directly with the **General Dental Council**. ",
            {
              placeholder:
                "[VERIFY: confirm the current contact details and web addresses for both bodies at build, and check whether the practice's written procedure names any other route]",
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
          q: "What is the phone number for iSmile Dental Practice?",
          a: [
            "**01892 547286**. If you're in pain, please ring rather than sending an email or a form.",
          ],
        },
        {
          q: "What is the address?",
          a: [
            "1 The Lodge, Mount Pleasant Avenue, Royal Tunbridge Wells, Kent TN1 1QY — at the entrance to Calverley Park, opposite Tunbridge Wells railway station.",
          ],
        },
        {
          q: "What are your opening hours?",
          a: [
            {
              placeholder:
                "[PLACEHOLDER: opening hours, including any evening or Saturday sessions and bank holiday arrangements]",
            },
          ],
        },
        {
          q: "Is there parking at the practice?",
          a: [
            {
              placeholder:
                "[PLACEHOLDER: parking arrangements, nearest public car park and walking time, and whether surrounding streets are restricted]",
            },
          ],
        },
        {
          q: "How far is the practice from Tunbridge Wells station?",
          a: [
            "It's directly opposite the station, at the entrance to Calverley Park. ",
            { placeholder: "[PLACEHOLDER: confirm walking time]" },
          ],
        },
        {
          q: "How quickly can I get an appointment?",
          a: [
            {
              placeholder:
                "[PLACEHOLDER: typical wait for a routine new patient appointment, and for an existing patient's check-up]",
            },
          ],
        },
        {
          q: "Can I be seen the same day if I'm in pain?",
          a: [
            {
              placeholder:
                "[PLACEHOLDER: urgent appointment policy — whether same-day slots are held, who they're available to, and what happens out of hours]",
            },
          ],
        },
        {
          q: "Are you taking on new patients?",
          a: [
            "Yes. ",
            { placeholder: "[PLACEHOLDER: confirm availability]" },
            " No referral is needed, and you don't need records from a previous dentist.",
          ],
        },
        {
          q: "Do I need to bring anything to my first appointment?",
          a: [
            {
              placeholder:
                "[PLACEHOLDER: confirm — medical history form, list of current medication, previous X-rays or records where available, and any pre-visit form to complete online]",
            },
          ],
        },
        {
          q: "Are you NHS or private?",
          a: [
            "iSmile is a private dental practice. ",
            { placeholder: "[PLACEHOLDER: confirm whether any NHS provision exists]" },
          ],
        },
        {
          q: "Is the practice accessible for wheelchair users?",
          a: [
            {
              placeholder:
                "[PLACEHOLDER: step-free access, ground-floor surgeries, lift, accessible toilet and accessible parking route. Be specific and honest.]",
            },
          ],
        },
        {
          q: "Can I contact you by email?",
          a: [
            "Yes. ",
            { placeholder: "[PLACEHOLDER: business-domain email address]" },
            " Please don't use email for anything urgent — ring instead.",
          ],
        },
      ],
    },

    {
      type: "areas",
      h2: "Easy to reach from across West Kent and the Sussex border",
      body: [
        [
          "Being opposite the station makes the practical difference for anyone travelling in. If you're coming by train from **Frant**, **Wadhurst** or **Tonbridge**, you're a walk across the road rather than a walk across town. If you're driving, you reach us at the Calverley Park end rather than working through the centre.",
        ],
        [
          "**Tonbridge**, **Southborough** and **Bidborough** come in on the A26. **Pembury** joins from the A21 side. **Rusthall**, **Langton Green** and **Speldhurst** approach from the west, and **Groombridge** from the south. Most of those journeys are fifteen minutes or under outside the school run.",
        ],
      ],
    },

    {
      type: "finalCta",
      h2: "Get in touch",
      body: [
        [
          "Ring, send the form, or ask a question first — whichever feels easiest. Nothing is booked until you want it to be.",
        ],
      ],
      primaryLabel: "Send my enquiry",
      secondary: ["Or call us on **01892 547286**"],
    },
  ],
};
