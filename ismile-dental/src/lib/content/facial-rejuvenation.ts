import type { PageContent } from "@/lib/content/types";

// Copy transcribed verbatim from copy/04-skin-clinic.md, page 1 (hub).
//
// ─── THE HIGHEST-RISK PAGE SET IN THIS BUILD ────────────────────────────────
//
// The old /facial-rejuvenation/ page names a prescription-only medicine
// eleven times, describes it as "safe", claims injections cause "virtually no
// pain", and names three filler brands that may no longer be in use. None of
// it survives. This copy REPLACES that page rather than editing it.
//
// Advertising a prescription-only medicine to the public is a criminal
// offence under the Human Medicines Regulations 2012. No product brand name
// appears anywhere on this page — not in copy, headings, meta, alt text,
// captions, form values or schema. `npm run check:compliance` enforces that.
//
// The generic term "botulinum toxin" appears three times, ONLY inside the
// legal under-18s prohibition statements. It is non-promotional there — a
// restriction, not a claim — and the safeguarding message is materially
// weaker without it. Each occurrence carries an explicit exemption. A
// stricter reviewer may still want them removed; the copy works if they go.
//
// The over-18s statement is a legal requirement, not a design choice. Do not
// remove it.
//
// The Google reviews embed is deliberately OFF on all three skin-clinic
// pages. A patient review naming a toxin brand is still the practice's own
// publication, and the embed cannot be reliably filtered. Static, screened
// quotes only.
//
// LAUNCH BLOCKER: do not publish this page while Dr Azimi's aesthetics
// training placeholder is still in it. It is the core trust asset on these
// pages.

export const facialRejuvenation: PageContent = {
  slug: "/facial-rejuvenation/",
  metaTitle: "Skin Clinic Tunbridge Wells | iSmile Dental Practice",
  metaDescription:
    "Facial aesthetics in Tunbridge Wells, assessed and carried out by a GDC-registered clinician in a dental practice. Book a consultation: 01892 547286.",
  h1: "Facial Aesthetics in Tunbridge Wells — Look Like Yourself on a Good Day",
  primaryKeyword: "facial aesthetics Tunbridge Wells",
  secondaryKeywords: [
    "facial rejuvenation Tunbridge Wells",
    "skin clinic Tunbridge Wells",
    "aesthetics clinic Tunbridge Wells",
    "facial aesthetics by a dentist",
    "non-surgical facial treatments Kent",
  ],
  coreDesire:
    "To look like a fresher, less tired version of myself — treated by a medical professional in a clinical setting, not by a beautician in a salon back room.",
  breadcrumb: [
    { label: "Home", href: "/" },
    { label: "Skin Clinic", href: "/facial-rejuvenation/" },
  ],
  // No MedicalProcedure or Offer schema on any page in this file. Structured
  // data is public-facing content for advertising purposes.
  reviewed: {
    by: "Dr Simon Azimi, GDC 81382",
    date: { placeholder: "[PLACEHOLDER: last reviewed date]" },
  },

  sections: [
    {
      type: "hero",
      h1: "Facial Aesthetics in Tunbridge Wells — Look Like Yourself on a Good Day",
      subhead:
        "Skin treatments assessed and carried out by a GDC-registered clinician in a dental practice — starting with an honest conversation about whether you need anything at all.",
      formHeading: "Book your consultation",
      // Form values are indexable text. Never a product name in one.
      formOptions: [
        "Facial aesthetics consultation",
        "Anti-wrinkle consultation",
        "Dermal fillers",
      ],
      buttonLabel: "Request my consultation",
      underForm: [
        "Prefer to talk? Call **01892 547286**",
        "Every treatment starts with an assessment. No pressure, no obligation, and no treatment on the same day unless you've had time to think about it.",
      ],
    },

    {
      type: "trustStrip",
      items: [
        "Treated by Dr Simon Azimi, GDC 81382",
        "Assessed in clinical premises, not a salon",
        "Consultation and medical history first",
        "Two minutes from Tunbridge Wells station",
        "Over-18s only",
      ],
    },

    {
      type: "recognise",
      h2: "You don't want a new face. You want to stop looking tired.",
      body: [
        [
          "It usually starts with a photograph. Somebody catches you mid-sentence and you look at it and think: that's not how I feel.",
        ],
        [
          "Or it's the comment. *Are you alright? You look shattered.* And you'd slept fine. It's the two vertical lines between your brows that arrive whether you're cross or not, and the way the light now falls into the creases beside your mouth.",
        ],
        [
          "You are not chasing your twenties. You'd just like to look like you did last Tuesday, when you'd had a good week.",
        ],
        [
          "And you're wary — reasonably so. You've seen faces that have gone too far, and the thought of ending up frozen, or shiny, or subtly not-yourself is worse than the lines. You've read the stories about treatments done above a hairdresser's by someone who took a weekend course. You want to know who is holding the needle, what training they have, and what happens if something goes wrong.",
        ],
        [
          "That caution is the right instinct. It's also the reason this clinic sits inside a dental practice.",
        ],
      ],
    },

    {
      type: "outcome",
      h2: "What “done well” actually looks like",
      body: [
        ["Nobody notices."],
        [
          "That's the aim, and it's worth saying plainly, because it isn't what a lot of aesthetics marketing promises. The result you're looking for is not a visible change — it's the absence of the thing that was bothering you. The frown that softens so your resting face reads as neutral instead of irritated. The hollow under the cheekbone that stops catching a shadow. Nothing announced.",
        ],
        [
          "People will tell you that you look well. They'll guess a holiday, or a haircut, or more sleep.",
        ],
        [
          "Getting there is mostly restraint. It means treating less than you could, reviewing the result before adding anything, and being willing to say that a particular line is better left alone. A conservative first treatment can always be built on. An overdone one has to be waited out.",
        ],
        ["You should still look like you. That is the whole brief."],
      ],
    },

    {
      type: "whyChoose",
      h2: "Why have facial aesthetics at a dental practice?",
      points: [
        {
          title: "Because the face is the part of the body dentists work in every day.",
          body: [
            "Injecting into the face is routine dentistry, not an add-on skill. A dentist gives local anaesthetic close to major nerves and vessels several times a day, every working day, and has been formally taught the anatomy of the face and the paths those structures take. That anatomical knowledge is exactly what non-surgical facial treatments depend on, and it is the single biggest difference between a well-placed injection and a badly-placed one.",
          ],
        },
        {
          title: "A regulated clinician, with a number you can check.",
          body: [
            "Dr Simon Azimi is registered with the General Dental Council, GDC 81382. That registration carries mandatory indemnity insurance, continuing professional development, published standards of conduct, and a complaints route that leads to a regulator rather than to nobody. You can look the number up before you book. ",
            {
              placeholder:
                "[PLACEHOLDER — LAUNCH BLOCKER: confirm Dr Azimi's specific aesthetics training and qualifications — course names, awarding bodies, dates, and any relevant memberships. This is the core trust asset on these pages. Do not publish this page with this placeholder still in it.]",
            },
          ],
        },
        {
          title: "Clinical premises, held to clinical standards.",
          body: [
            "Treatments are carried out in a dental surgery that meets the decontamination, infection-control and clinical-waste standards required of a dental practice, and is registered with the Care Quality Commission. ",
            { placeholder: "[PLACEHOLDER: confirm CQC provider ID for display]" },
            " That is a materially different environment from a treatment room behind a salon.",
          ],
        },
        {
          title: "A full medical history, taken properly.",
          body: [
            "Your medical history, medications, allergies and previous treatments are reviewed before anything is discussed — because some conditions and some medicines make injectable treatment unsuitable, and finding that out matters more than making a booking.",
          ],
        },
        {
          title: "One clinician, who is there afterwards.",
          body: [
            "The person who assesses you is the person who treats you and the person you ring if you're worried at nine o'clock that night. Aftercare isn't a phone number in another town.",
          ],
        },
        {
          title: "Nobody is treated on impulse.",
          body: [
            "Assessment first, thinking time second, treatment third. If you'd be better served by doing nothing, or by a skincare change, or by seeing your GP or a dermatologist, you'll be told that.",
          ],
        },
        {
          title: "Over-18s only, without exception.",
          body: [
            // The generic substance is named here only as part of the legal
            // prohibition — a restriction, not a claim. The safeguarding
            // message is materially weaker without it.
            "It is illegal in England to give botulinum toxin or dermal fillers for cosmetic purposes to anyone under 18. We ask for identification where there is any doubt, and no under-18 will be treated cosmetically here regardless of parental consent.", // allow-pom-generic-promotional
          ],
        },
      ],
    },

    {
      type: "reviews",
      h2: "What our patients say",
      aggregate: { placeholder: "[PLACEHOLDER: X.X ★ from XX Google reviews]" },
      // Static screened quotes only — see the file header. A review naming a
      // prescription product is still the practice's own publication.
      embed: false,
      quotes: [
        {
          quote: {
            placeholder:
              "[PLACEHOLDER: real review — ideally about feeling listened to at a consultation. SCREEN IT: do not publish any review that names a prescription product brand.]",
          },
          attribution: "— First name, Town",
        },
        {
          quote: {
            placeholder:
              "[PLACEHOLDER: real review — ideally mentioning a natural, subtle result. Screen as above.]",
          },
          attribution: "— First name, Town",
        },
        {
          quote: {
            placeholder:
              "[PLACEHOLDER: real review — ideally mentioning Dr Azimi by name. Screen as above.]",
          },
          attribution: "— First name, Town",
        },
      ],
    },

    {
      type: "explainer",
      h2: "What treatments does the skin clinic offer?",
      blocks: [
        {
          kind: "definition",
          text: "The clinic offers two categories of non-surgical injectable treatment: wrinkle-relaxing injections, which soften lines caused by repeated facial movement, and dermal fillers, which replace volume and definition that has been lost.",
        },
        {
          kind: "p",
          text: [
            "They do different jobs, they are regulated differently, and many people turn out to need only one of them — or neither.",
          ],
        },

        { kind: "h3", text: "Anti-wrinkle treatments" },
        {
          kind: "p",
          text: [
            "Prescription injectable treatments that relax the specific muscles producing expression lines — most commonly the lines between the brows, across the forehead, and at the outer corners of the eyes. Because these are prescription-only medicines, we cannot advertise, price or promote them online. What we can do is assess you and explain your options in person, which is what the consultation is for.",
          ],
        },
        {
          kind: "link",
          link: {
            label: "Read about anti-wrinkle treatments and the assessment process →",
            href: "/botox-tunbridge-wells/", // allow-pom-brand-name: URL retained for equity, all copy rewritten
          },
        },

        { kind: "h3", text: "Dermal fillers" },
        {
          kind: "p",
          text: [
            "Gels based on hyaluronic acid — a substance your skin already produces — used to restore volume, soften folds and refine contour in areas such as the lips, cheeks, nasolabial folds, marionette lines, chin and jawline. Fillers are medical devices rather than medicines, so we can describe and price them openly.",
          ],
        },
        { kind: "link", link: { label: "Read about dermal fillers →", href: "/dermal-fillers/" } },

        {
          kind: "note",
          text: [
            {
              placeholder:
                "[PLACEHOLDER: confirm whether any other facial aesthetic or skin treatments are currently offered — e.g. skin peels, microneedling, medical-grade skincare, hyperhidrosis treatment. The 2021 site mentioned only two categories; if the offer has grown, this page needs a third and fourth block.]",
            },
          ],
        },

        { kind: "h3", text: "Which one do I need?" },
        {
          kind: "p",
          text: [
            "Most people don't know, and that's the normal starting point. As a rough guide: if the lines you're bothered by appear when you make an expression and disappear when your face is still, that is usually a muscle-movement question. If the change you see is a loss of fullness — a flatter cheek, a fold that stays put whatever your face is doing — that is usually a volume question. Plenty of faces have some of both, and the honest answer for some faces is that neither is needed yet.",
          ],
        },
        {
          kind: "p",
          text: [
            "You do not need to work this out before you come in. Working it out is the consultation.",
          ],
        },
      ],
    },

    {
      type: "risk",
      h2: "What are the risks of facial aesthetic treatments?",
      blocks: [
        {
          kind: "p",
          text: [
            "Every injectable treatment carries risk, and any clinic that implies otherwise is not being straight with you. Common, expected effects include redness, swelling, tenderness and bruising at the injection site, usually settling within a few days. Less common effects include headache, asymmetry, lumps or firmness under the skin, and — rarely — infection.",
          ],
        },
        {
          kind: "p",
          text: [
            "Serious complications are uncommon but they are real. With dermal fillers, the most serious is vascular occlusion, where filler blocks a blood vessel; it requires immediate treatment and is the single strongest argument for being treated by someone with detailed anatomical knowledge and the means to manage it. With muscle-relaxing injections, the product can affect a nearby muscle it wasn't intended for, causing temporary asymmetry or a drooping eyelid or brow, which resolves as the effect wears off.",
          ],
        },
        {
          kind: "p",
          text: [
            "Injectable treatments are not suitable for everyone. They are not given during pregnancy or while breastfeeding, and some medical conditions, medications and allergies rule them out. That is what the medical history at your consultation is for, and “no” is a legitimate outcome of an assessment.",
          ],
        },
        {
          kind: "p",
          text: [
            "You'll be given the risks relevant to you, in writing, before you consent to anything — not as a formality at the door, but as part of the decision.",
          ],
        },
        {
          kind: "note",
          text: [
            "**These treatments are not available to anyone under 18.** In England it is an offence to administer botulinum toxin or dermal fillers for cosmetic purposes to under-18s, and we will not do so under any circumstances.", // allow-pom-generic-promotional
          ],
        },
      ],
    },

    {
      type: "journey",
      h2: "What happens at a facial aesthetics consultation?",
      steps: [
        {
          title: "The conversation, before anything else",
          body: [
            "You'll be asked what's actually bothering you, and when you notice it. This matters more than a treatment menu — people often arrive asking for one thing and are bothered by something else entirely. Bring a photograph of yourself from a few years ago if you have one to hand; it's more useful than a description.",
          ],
        },
        {
          title: "Medical history and medication review",
          body: [
            "Everything you take, every condition you're managing, every allergy, and any previous injectable treatment — including where, when and what, if you know it. Previous treatment elsewhere genuinely changes the plan.",
          ],
        },
        {
          title: "Assessment of your face at rest and in movement",
          body: [
            "You'll be asked to frown, raise your brows, smile and relax while your face is looked at properly, because lines behave differently in movement than they do in a mirror at arm's length. Facial asymmetry — which everyone has — is noted and pointed out, since it is often visible in the result afterwards and is better discussed before.",
          ],
        },
        {
          title: "An honest recommendation, including “not yet”",
          body: [
            "You'll be told what could be treated, what it would realistically achieve, what it would not achieve, and what the risks are. If nothing is warranted, that's what you'll hear. If what you want isn't achievable with injectables, you'll be told that too, rather than sold something adjacent.",
          ],
        },
        {
          title: "Thinking time",
          body: [
            "You'll get the plan and the risk information to take away. There is no expectation that you decide in the chair. ",
            {
              placeholder:
                "[PLACEHOLDER: confirm practice policy on cooling-off period between consultation and treatment — a stated minimum, e.g. 24 hours, is strong reassurance and increasingly expected practice]",
            },
          ],
        },
        {
          title: "Treatment, if you go ahead",
          body: [
            "Usually a separate, short appointment. What happens on the day differs between treatments — the detail is on each treatment page.",
          ],
        },
        {
          title: "Review and aftercare",
          body: [
            "Written aftercare, a named person to contact if you're concerned, and a review appointment where appropriate to check the result and decide whether anything more is needed. ",
            {
              placeholder:
                "[PLACEHOLDER: confirm whether a review appointment is offered as standard, and whether it is included]",
            },
          ],
        },
      ],
    },

    {
      type: "cost",
      h2: "How much do facial aesthetic treatments cost in Tunbridge Wells?",
      intro: [
        [
          {
            placeholder:
              "[PLACEHOLDER: client to supply. All figures must be genuine and available.]",
          },
        ],
      ],
      table: {
        headers: ["", "From"],
        rows: [
          {
            cells: ["Facial aesthetics consultation & assessment", { placeholder: "[£X]" }],
          },
          { cells: ["Dermal filler — single area", { placeholder: "[from £X]" }] },
          { cells: ["Dermal filler — lips", { placeholder: "[from £X]" }] },
          { cells: ["Review appointment", { placeholder: "[£X or “included”]" }] },
        ],
      },
      notes: [
        [
          {
            placeholder:
              "[PLACEHOLDER: confirm whether the consultation is chargeable and whether the fee is redeemable against treatment. The 2021 site advertised one at no charge — do not restore that wording without confirming it is still true.]",
          },
        ],
        [
          "**Why aren't anti-wrinkle treatment prices listed here?** Because UK law does not permit us to advertise prescription-only medicines to the public, and that includes pricing them, discounting them or offering them in a package. Fees for prescription injectable treatments are discussed with you in person after an assessment, once we know whether the treatment is appropriate for you at all. Any clinic publishing a price list for those treatments is breaking the law, and it is worth knowing what that tells you about the rest of their standards.",
        ],
      ],
      // DO NOT ADD: no price, "from" price, package, course, membership,
      // loyalty scheme, referral reward, seasonal offer or bundled discount
      // may be attached to a prescription injectable treatment anywhere on
      // this site, in email, or on social media — including bundles pairing
      // fillers with a prescription treatment at a combined price.
    },

    {
      type: "comparison",
      h2: "Anti-wrinkle injections vs dermal fillers — what's the difference?",
      intro: [
        [
          "They solve different problems. Wrinkle-relaxing injections reduce the muscle movement that creates lines, so they work on lines caused by expression. Dermal fillers add volume back where it has been lost, so they work on hollows, folds and contour. One softens movement; the other replaces structure.",
        ],
      ],
      table: {
        headers: ["", "Anti-wrinkle treatments", "Dermal fillers"],
        rows: [
          {
            cells: [
              "What it does",
              "Relaxes the muscles that create expression lines",
              "Replaces lost volume and definition",
            ],
          },
          {
            cells: [
              "Best suited to",
              "Lines that appear when you move your face",
              "Hollows, folds and loss of contour",
            ],
          },
          {
            cells: [
              "Regulatory status",
              "Prescription-only medicine — cannot be advertised or priced publicly",
              "Medical device — can be described and priced",
            ],
          },
          {
            cells: [
              "Prescription needed",
              "Yes, following a face-to-face assessment",
              "No, but assessment is still essential",
            ],
          },
          {
            cells: [
              "When you see a change",
              "Gradual, over days",
              "Immediately, though swelling settles first",
            ],
          },
          {
            cells: [
              "How long it lasts",
              "Typically a few months",
              "Typically several months to over a year, by product and area",
            ],
          },
          {
            cells: [
              "Reversible",
              "No — it wears off",
              "Hyaluronic acid fillers can be dissolved",
            ],
          },
          {
            cells: [
              "Available to under-18s",
              "No — illegal for cosmetic use",
              "No — illegal for cosmetic use",
            ],
          },
        ],
      },
      blocks: [
        { kind: "h3", text: "Can I have both?" },
        {
          kind: "p",
          text: [
            "Often, yes — many treatment plans use both, because most faces show a mixture of movement lines and volume loss. Whether that's appropriate for you, in what order, and how far apart, is an assessment decision rather than a menu decision. It is also entirely normal to start with one and see how you feel.",
          ],
        },
      ],
    },

    {
      type: "faqs",
      h2: "Frequently asked questions",
      items: [
        {
          q: "Is it safe to have facial aesthetics at a dental practice?",
          a: [
            "Dentists are regulated healthcare professionals with formal training in facial anatomy, and they inject in the face routinely as part of ordinary dental care. Facial aesthetics falls within a dentist's scope of practice where they have appropriate additional training. Treatment here is carried out in clinical premises, after a medical history and assessment, by a clinician registered with the General Dental Council.",
          ],
        },
        {
          q: "Will I look frozen or obviously treated?",
          a: [
            "That is a question of dose and placement, and it is the main thing a conservative approach is designed to avoid. Treating less at the outset and reviewing before adding more is how a natural result is achieved. No outcome can be promised, which is why the review appointment matters.",
          ],
        },
        {
          q: "Do I have to have treatment on the day I come in?",
          a: [
            "No. Assessment and treatment are usually separate appointments, and you're encouraged to take the plan away and think about it. Nothing is done on the day unless you have had time to consider it and have given informed consent.",
          ],
        },
        {
          q: "How old do I have to be?",
          a: [
            "Eighteen. It is illegal in England to give botulinum toxin or dermal fillers for cosmetic purposes to anyone under 18, and we ask for identification where there is any doubt.", // allow-pom-generic-promotional
          ],
        },
        {
          q: "Can I have treatment while pregnant or breastfeeding?",
          a: [
            "No. Injectable aesthetic treatments are not given during pregnancy or while breastfeeding. If you become pregnant between your consultation and your treatment, tell us and we'll postpone.",
          ],
        },
        {
          q: "What if I don't like the result?",
          a: [
            "Tell us. With dermal fillers, hyaluronic acid products can be dissolved, which gives you a genuine route back. Muscle-relaxing treatments cannot be reversed, but they are temporary and wear off — which is another reason a first treatment should be conservative.",
          ],
        },
        {
          q: "Do the injections hurt?",
          a: [
            "Most people describe a brief sting or a scratch rather than pain, and treatments are quick. Discomfort varies by area — lips are more sensitive than most. Numbing cream or ice can be used where appropriate. We won't tell you it doesn't hurt at all, because that would not be true.",
          ],
        },
        {
          q: "How soon can I go back to work?",
          a: [
            "Most people go straight back to their day. Some redness or small raised marks at the injection sites usually settle within a few hours, and bruising is possible with any injection — if you have something important in the diary, leave a fortnight's clearance.",
          ],
        },
        {
          q: "Do you offer consultations if I'm not sure I want anything?",
          a: [
            "Yes, and that is a reasonable way to use one. A consultation is an assessment and a conversation, not a commitment. Being told you don't need anything yet is a legitimate result.",
          ],
        },
        {
          q: "Do I need to be a patient of the dental practice?",
          a: [
            "No. The skin clinic is open to anyone over 18, whether or not you're registered with us for dental care.",
          ],
        },
        {
          q: "Can I bring photographs of results I like?",
          a: [
            "Yes, and it's useful — it shows what you find attractive far better than words do. Do bear in mind that a photograph of someone else's face shows their anatomy, not yours, and what is achievable will be discussed honestly.",
          ],
        },
        {
          q: "Who do I contact if I'm worried after treatment?",
          a: [
            "You'll be given written aftercare with a direct contact before you leave. If something concerns you — particularly severe pain, blanching or unusual colour change in the skin — you're asked to make contact immediately rather than wait and see.",
          ],
        },
      ],
    },

    {
      type: "areas",
      h2: "A skin clinic in the centre of Tunbridge Wells",
      body: [
        [
          "We're at the entrance to Calverley Park, directly opposite Tunbridge Wells railway station — which for most people means an appointment can sit inside a lunch hour rather than eating a day.",
        ],
        [
          "Patients come to us from **Southborough**, **Rusthall** and **Langton Green**, from **Speldhurst** and the villages, and from further round the A21 at **Pembury** and **Tonbridge**. Coming in by train from London, Hastings or Sevenoaks, the practice is a two-minute walk from the platform.",
        ],
        [
          "It matters more than it sounds. Aesthetic treatment works best when reviewing the result is easy to do, and a review appointment you can reach in ten minutes is one you'll actually attend.",
        ],
      ],
    },

    {
      type: "finalCta",
      h2: "Start with an assessment, not a treatment",
      body: [
        [
          "Book a consultation and you'll get a proper look at your face, a full medical history, an honest view on what would help and what wouldn't, and the risks in writing before you decide anything. If the answer is that you don't need treatment, you'll be told so.",
        ],
      ],
      primaryLabel: "Book my consultation",
      secondary: [
        "Or call us on **01892 547286** — we're happy to answer questions over the phone first.",
      ],
    },
  ],
};
