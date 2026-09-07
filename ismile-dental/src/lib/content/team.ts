import type { PageContent } from "@/lib/content/types";

// Copy transcribed verbatim from copy/01-core-pages.md, Page 3.
//
// DO NOT PUBLISH THIS PAGE UNTIL DR AZIMI'S BLOCK IS FILLED IN. That is the
// copy pack's own instruction, and it is right: the old /team/ page carries a
// name and a GDC number and nothing else, and a bio page with visible gaps is
// worse than the thin page it replaces.
//
// The full "what we need from Dr Azimi" checklist is at the foot of that
// copy file and can be sent to the client as-is.
//
// COMPLIANCE: "specialist" must never appear against any clinician unless
// they are on the relevant GDC specialist list. GDC numbers are published for
// registered clinical staff only — never for reception or administrative
// staff. Qualifications must be written exactly as awarded; overstating one
// is a fitness-to-practise matter, not a marketing one.

export const team: PageContent = {
  slug: "/team/",
  metaTitle: "Meet the Team | iSmile Dental Practice Tunbridge Wells",
  metaDescription:
    "Meet Dr Simon Azimi (GDC 81382) and the team at iSmile Dental Practice, Royal Tunbridge Wells. The same dentist, every visit. Call 01892 547286.",
  h1: "Meet the Team — Who'll Be Looking After Your Teeth in Tunbridge Wells",
  primaryKeyword: "dental team Tunbridge Wells",
  secondaryKeywords: [
    "Dr Simon Azimi dentist",
    "dentist Tunbridge Wells",
    "GDC 81382",
    "private dentist Royal Tunbridge Wells",
    "dental hygienist Tunbridge Wells",
  ],
  coreDesire:
    "To know exactly who is going to have their hands in their mouth — and whether that person is any good.",
  breadcrumb: [
    { label: "Home", href: "/" },
    { label: "Meet the Team", href: "/team/" },
  ],
  reviewed: {
    by: "Dr Simon Azimi, GDC 81382",
    date: { placeholder: "[PLACEHOLDER: last reviewed date]" },
  },

  sections: [
    {
      type: "hero",
      h1: "Meet the Team — Who'll Be Looking After Your Teeth in Tunbridge Wells",
      subhead:
        "A small practice, so you'll know who you're seeing before you get here — and you'll see the same faces next time.",
      formHeading: "Book with Dr Azimi",
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
        "Dr Simon Azimi, GDC 81382",
        "Registered with the General Dental Council",
        "The same dentist at every visit",
        "Opposite Tunbridge Wells station",
        { placeholder: "[PLACEHOLDER: X.X ★ on Google]" },
      ],
    },

    {
      type: "recognise",
      h2: "The question nobody asks out loud",
      body: [
        [
          "Most dental websites tell you about treatments. Very few tell you who is going to carry them out.",
        ],
        [
          "But that's the thing you actually want to know. Not “what is composite bonding.” Who is this person. How long have they been doing this. Have they done it a lot. Are they the sort who explains, or the sort who sighs.",
        ],
        [
          "You're about to lie back in a chair and let someone work inside your mouth with instruments, while you can't talk and can't see what they're doing. Wanting to know who they are first isn't fussy. It's the most reasonable question on the whole site.",
        ],
        ["So this page answers it."],
      ],
    },

    {
      type: "outcome",
      h2: "Knowing who you're going to see",
      body: [
        ["You walk in already knowing the face."],
        [
          "You've read who they are, where they trained and how long they've been doing this, so the first appointment doesn't start with sizing each other up. And because the practice is small, the person who examines you today is the person who'll be treating you in three weeks and checking you over in a year's time.",
        ],
        [
          "That continuity does something that no amount of equipment can. It means your dentist remembers your mouth — and remembers you. The nervous patient who needed twenty minutes of talking before the first examination doesn't have to explain that to somebody new next time. It's already known, and it's already accounted for.",
        ],
      ],
    },

    {
      type: "whyChoose",
      h2: "Why a small, named team is worth something",
      points: [
        {
          title: "You're not treated by “a member of the team.”",
          body: [
            "Dr Simon Azimi, GDC 81382, is the practice's dentist. He examines you, he plans the treatment, and he does it. Nobody drafts a plan for someone else to execute.",
          ],
        },
        {
          title: "Registration you can verify yourself.",
          body: [
            "Every dentist, hygienist, therapist and nurse working in the UK must be registered with the General Dental Council. GDC numbers are published on this page so you can look anyone up on the GDC register in about thirty seconds. That's a reasonable thing to do before letting somebody treat you, and we'd rather make it easy.",
          ],
        },
        {
          title: "A team small enough to remember you.",
          body: [
            "Reception, nursing and clinical care are handled by a handful of people rather than a rota. You will not repeat your medical history to a different person every visit.",
          ],
        },
        {
          title: "Time booked properly.",
          body: [
            "Appointments are planned around what the treatment and the patient actually need, including extra time for people who find dentistry difficult. That's easier to do in a practice this size than in one running six surgeries against a target.",
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
              "[PLACEHOLDER: real review — ideally naming Dr Azimi and describing how he explains things]",
          },
          attribution: "— First name, Town",
        },
        {
          quote: {
            placeholder:
              "[PLACEHOLDER: real review — ideally mentioning the hygienist or a nurse by role]",
          },
          attribution: "— First name, Town",
        },
        {
          quote: {
            placeholder:
              "[PLACEHOLDER: real review — ideally from a nervous patient about how they were handled]",
          },
          attribution: "— First name, Town",
        },
      ],
      link: { label: "Read all our reviews on Google", href: "/contact/" },
    },

    {
      type: "team",
      h2: "Dr Simon Azimi — Dentist",
      members: [
        {
          // Styled four different ways across the old site. Standardised on
          // "Dr Simon Azimi" everywhere, including alt text, schema and footer.
          name: "Dr Simon Azimi",
          role: "Dentist and practice owner",
          gdc: "81382",
          photo: {
            placeholder:
              "[BUILD: professional photograph taken at the practice — the actual dentist in the actual surgery. Not a stock image, not a phone snap against a wall. The single highest-value asset on this page.]",
          },
          fields: [
            {
              label: "Role",
              value: {
                placeholder:
                  "[PLACEHOLDER: confirm exact job title — “Principal Dentist”, “Dentist and Practice Owner”, or similar]",
              },
            },
            {
              label: "Qualifications",
              value: {
                placeholder:
                  "[PLACEHOLDER: full qualifications exactly as awarded — e.g. BDS, plus any postgraduate qualifications, diplomas or certificates. Must be accurate and current.]",
              },
            },
            {
              label: "Qualified",
              value: {
                placeholder:
                  "[PLACEHOLDER: year of qualification and awarding dental school. Years of experience is one of the strongest trust signals available and is currently nowhere on the site.]",
              },
            },
            {
              label: "Areas of particular experience",
              value: {
                placeholder:
                  "[PLACEHOLDER: which treatments Dr Azimi does most of, and where he has additional training. COMPLIANCE: the GDC-protected title may only be used for a clinician on the relevant GDC list — otherwise write “with a special interest in” or “extensive experience in”, and only if genuinely accurate.]",
              },
            },
            {
              label: "Professional memberships",
              value: {
                placeholder:
                  "[PLACEHOLDER: professional bodies — current memberships only]",
              },
            },
            {
              label: "Training and certifications",
              value: {
                placeholder:
                  "[PLACEHOLDER: implant systems trained on, aligner certifications and provider status, facial aesthetics training and prescribing arrangements. Only if current and evidenced.]",
              },
            },
            {
              label: "Languages spoken",
              value: {
                placeholder:
                  "[PLACEHOLDER: any language other than English spoken at the practice. In a town like Tunbridge Wells this brings in patients no keyword ever will.]",
              },
            },
            {
              label: "Verify this registration",
              value:
                "Search GDC number 81382 on the General Dental Council register.",
            },
          ],
          bio: [
            [
              {
                placeholder:
                  "[PLACEHOLDER: 150–250 words in Dr Azimi's own voice. Paragraph one — where and when he qualified, how long he has been practising, what he does most of; concrete and unshowy. Paragraph two — how he works and what patients notice; preventative first, minimally invasive, honest about when to leave something alone, calm with people who are frightened, and the reason he works that way. Paragraph three — one or two lines about him outside the surgery. That third paragraph converts better than the two above it and is the one clinicians always want to cut; leave it in.]",
              },
            ],
          ],
          pullQuote: {
            placeholder:
              "[PLACEHOLDER: one sentence from Dr Azimi about how he approaches patients, in his words rather than a copywriter's. Displayed alongside the photograph.]",
          },
        },
      ],
    },

    {
      type: "team",
      h2: "Who else you'll meet",
      intro: [
        [
          "The old site refers to a Treatment Coordinator, “the hygienist” and “our receptionists”, but names nobody. Every clinical member of staff needs a name, a role, a GDC number and a photograph; non-clinical staff need a name, role and photograph. The blocks below are ready to fill — delete any that don't apply.",
        ],
      ],
      members: [
        {
          name: { placeholder: "[PLACEHOLDER: hygienist's name]" },
          role: "Dental Hygienist",
          gdc: { placeholder: "[PLACEHOLDER: GDC number]" },
          photo: { placeholder: "[BUILD: photograph, same style as every other staff portrait]" },
          fields: [
            {
              label: "Qualifications and year qualified",
              value: { placeholder: "[PLACEHOLDER: qualifications, year qualified]" },
            },
          ],
          bio: [
            [
              {
                placeholder:
                  "[PLACEHOLDER: 60–100 word bio. The hygienist is the person most patients see most often, and the one doing the work that actually prevents dentistry — worth two lines on what an appointment with them is like.]",
              },
            ],
          ],
          link: { label: "About dental hygiene appointments →", href: "/dental-hygiene/" },
        },
        {
          name: { placeholder: "[PLACEHOLDER: name of each registered dental nurse]" },
          role: "Dental Nurse",
          gdc: { placeholder: "[PLACEHOLDER: GDC number]" },
          photo: { placeholder: "[BUILD: photograph, same style as every other staff portrait]" },
          fields: [],
          bio: [
            [
              {
                placeholder:
                  "[PLACEHOLDER: one or two lines each. Dental nurses have had to register with the GDC since 2008, so numbers exist and should be published. The nurse is the person who talks to you while the dentist is working, hands you the tissue and notices when you've gone tense — for nervous patients they matter enormously and are almost never written about.]",
              },
            ],
          ],
        },
        {
          name: { placeholder: "[PLACEHOLDER: name]" },
          role: "Reception and Practice Management",
          // No GDC number: reception staff do not hold one, and publishing a
          // number for someone unregistered is worse than publishing nothing.
          photo: { placeholder: "[BUILD: photograph, same style as every other staff portrait]" },
          fields: [],
          bio: [
            [
              {
                placeholder:
                  "[PLACEHOLDER: one or two lines each. The first voice you'll hear and the first face you'll see — worth saying plainly that this is who to speak to about appointments, costs and rearranging things, and that telling them you're nervous when you book genuinely changes how the appointment is set up.]",
              },
            ],
          ],
        },
        {
          name: { placeholder: "[PLACEHOLDER: name, if this role still exists]" },
          role: "Treatment Coordinator",
          photo: { placeholder: "[BUILD: photograph, same style as every other staff portrait]" },
          fields: [],
          bio: [
            [
              {
                placeholder:
                  "[PLACEHOLDER: confirm whether this role still exists — it is referenced on the old site but never named. If it does, supply name, role, photograph and a short description of what they do; patients rarely understand this role and it is worth explaining.]",
              },
            ],
          ],
        },
      ],
    },

    {
      type: "explainer",
      h2: "Why does it matter that you see the same dentist every time?",
      blocks: [
        {
          kind: "definition",
          text: "Because a dentist who has watched your teeth for years spots things a first-time examiner cannot, and because trust doesn't transfer between clinicians.",
        },
        {
          kind: "p",
          text: [
            "The clinical half is straightforward. Dentistry is about change over time — a filling that is slowly failing, a gum margin that has crept back, a wear facet that says you're grinding in your sleep. Someone seeing your mouth for the first time sees a snapshot. Someone who has seen it five times sees a direction of travel, and can act while the problem is still small, cheap and easy to fix.",
          ],
        },
        {
          kind: "p",
          text: [
            "The human half matters just as much. If you find dentistry difficult, most of what makes an appointment bearable is knowing the person. You've already had the conversation about what frightens you. They already know to tell you before they start, and to stop when your hand goes up. Start again with a different clinician and all of that resets to zero.",
          ],
        },
        {
          kind: "p",
          text: [
            "At a practice this size, continuity isn't a policy anyone has to enforce. It's just what happens.",
          ],
        },
      ],
    },

    {
      type: "faqs",
      h2: "Frequently asked questions",
      items: [
        {
          q: "Who is the dentist at iSmile Dental Practice?",
          a: [
            "Dr Simon Azimi, GDC number 81382. He is the practice's dentist and carries out treatment himself, from the first examination to the finished work.",
          ],
        },
        {
          q: "How do I check a dentist is properly registered?",
          a: [
            "Every dentist practising in the UK must be on the General Dental Council register, and the register is public and free to search. Dr Azimi's GDC number is 81382. Hygienists, dental therapists and dental nurses must be registered too, and their numbers are published on this page.",
          ],
        },
        {
          q: "Will I see the same dentist at every appointment?",
          a: [
            "Yes, in almost all cases. That continuity is one of the main reasons patients give for staying with the practice.",
          ],
        },
        {
          q: "What are Dr Azimi's qualifications?",
          a: [
            {
              placeholder:
                "[PLACEHOLDER: qualifications, year of qualification and dental school. People genuinely search for this and there is currently no answer to it anywhere on the site.]",
            },
          ],
        },
        {
          q: "How long has Dr Azimi been a dentist?",
          a: [
            {
              placeholder:
                "[PLACEHOLDER: year qualified, expressed as “more than X years”]",
            },
          ],
        },
        {
          q: "Is there a hygienist at the practice?",
          a: [
            {
              placeholder:
                "[PLACEHOLDER: confirm whether hygiene appointments are carried out by a registered dental hygienist or by the dentist, and supply the hygienist's name and GDC number if so]",
            },
          ],
        },
        {
          q: "Can I ask for a female clinician?",
          a: [
            {
              placeholder:
                "[PLACEHOLDER: answer honestly based on who actually works at the practice. Patients do ask, particularly for facial aesthetics, and an honest answer either way is better than silence.]",
            },
          ],
        },
        {
          q: "Who carries out the skin treatments?",
          a: [
            {
              placeholder:
                "[PLACEHOLDER: confirm who provides facial aesthetic treatments, their registration and their training. Where a treatment involves a prescription-only medicine, confirm the prescribing arrangements — this has its own regulatory requirements.]",
            },
          ],
        },
        {
          q: "Is the practice inspected?",
          a: [
            "Yes. Dental practices in England are registered with and inspected by the Care Quality Commission, and clinical staff are regulated by the General Dental Council. ",
            { placeholder: "[PLACEHOLDER: CQC provider registration number]" },
          ],
        },
        {
          q: "Are you taking on new patients?",
          a: [
            "Yes. ",
            {
              placeholder:
                "[PLACEHOLDER: confirm availability and typical wait for a first appointment]",
            },
            " Call **01892 547286**.",
          ],
        },
      ],
    },

    {
      type: "areas",
      h2: "Patients who travel to keep the same dentist",
      body: [
        [
          "The practical reason people come to us from outside town is the location — 1 The Lodge sits opposite Tunbridge Wells station, at the entrance to Calverley Park. The reason they keep coming after they've moved is usually simpler than that. They don't want to start again with someone new.",
        ],
        [
          "We see patients from **Frant** and **Groombridge** to the south, from **Pembury** and **Tonbridge** off the A21, and from **Rusthall**, **Southborough**, **Speldhurst**, **Langton Green** and **Bidborough** across the western side of town.",
        ],
      ],
    },

    {
      type: "finalCta",
      h2: "Book in with Dr Azimi",
      body: [
        [
          "If you've read this far, you already know who you'd be seeing. The next step is an examination and a straight conversation about what, if anything, needs doing.",
        ],
      ],
      primaryLabel: "Book my appointment",
      secondary: [
        "Or call us on **01892 547286** — you can ask about anything before you book.",
      ],
    },
  ],
};
