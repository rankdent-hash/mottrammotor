import type { PageContent } from "@/lib/content/types";

// Copy transcribed verbatim from copy/03-cosmetic-dentistry.md, page 6.
//
// Functions as a hub-weight page (build-plan.md §1) and is the highest
// commercial priority of the treatment pages.
//
// Compliance notes carried through: no outcome is promised anywhere —
// "designed to last many years", never "lasts a lifetime". Discomfort is
// described honestly rather than denied. Risks (smoking, implant failure)
// are stated openly, as GDC guidance requires.

export const dentalImplants: PageContent = {
  slug: "/dental-implants/",
  metaTitle: "Dental Implants Tunbridge Wells | iSmile Dental Practice",
  metaDescription:
    "Replace missing teeth with dental implants that look, feel and work like your own. Book a consultation with Dr Simon Azimi in Tunbridge Wells. Call 01892 547286.",
  h1: "Dental Implants in Tunbridge Wells — Eat, Laugh and Speak Without Thinking About It",
  primaryKeyword: "dental implants Tunbridge Wells",
  secondaryKeywords: [
    "tooth implant cost UK",
    "single tooth implant",
    "implant dentist near me",
    "replace missing tooth Tunbridge Wells",
  ],
  coreDesire:
    "To stop being reminded, every single day, that something is missing — and to feel whole, capable and unselfconscious again.",
  breadcrumb: [
    { label: "Home", href: "/" },
    { label: "Cosmetic Dentistry", href: "/cosmetic-dentistry/" },
    { label: "Dental Implants", href: "/dental-implants/" },
  ],
  procedure: {
    name: "Dental Implant",
    description:
      "A small titanium post placed into the jawbone to replace the root of a missing tooth, supporting a crown, bridge or denture once the bone has healed around it.",
  },
  reviewed: {
    by: "Dr Simon Azimi, GDC 81382",
    date: { placeholder: "[PLACEHOLDER: last reviewed date]" },
  },

  sections: [
    {
      type: "hero",
      h1: "Dental Implants in Tunbridge Wells — Eat, Laugh and Speak Without Thinking About It",
      subhead:
        "A permanent replacement for a missing tooth that's fixed in place, looks like your own, and lets you get back to not thinking about your teeth at all.",
      formHeading: "Book your implant consultation",
      formOptions: [
        "Dental Implants",
        "Cosmetic dentistry",
        "General dentistry",
        "I'm not sure yet",
      ],
      buttonLabel: "Request my consultation",
      underForm: [
        "Prefer to talk? Call **01892 547286**",
        "No pressure and no obligation — just a straight conversation about your options and what they cost.",
      ],
    },

    {
      type: "trustStrip",
      items: [
        "Treated by Dr Simon Azimi, GDC 81382",
        "Opposite Tunbridge Wells station",
        "Mercury-free practice",
        { placeholder: "[PLACEHOLDER: X.X ★ on Google]" },
        "Nervous patients welcome",
      ],
    },

    {
      type: "recognise",
      h2: "If you've been living around a missing tooth, you'll know the small adjustments",
      body: [
        [
          "You chew on one side without deciding to. You've got a mental list of foods you don't order any more — the crusty bread, the steak, the apple you'd have to bite into in front of people.",
        ],
        [
          "Maybe you've caught yourself in a photo and gone straight to the gap. Maybe you've started covering your mouth when you laugh, and you didn't even notice when that habit began.",
        ],
        [
          "Or perhaps the tooth isn't visible at all, and someone told you it doesn't matter. But the bite feels different. The teeth either side have started to drift. And there's a quiet worry about what's happening in there that you'd rather have answered than ignored.",
        ],
        [
          "None of that is vanity. A missing tooth changes how you eat, how your jaw works, and how you carry yourself — and it doesn't stay still. The bone that used to hold the root begins to shrink from the moment the tooth goes.",
        ],
      ],
    },

    {
      type: "outcome",
      h2: "What it's like once it's done",
      body: [
        ["You forget about it."],
        [
          "That's the honest answer, and it's the one patients give most often. A dental implant is fixed into the jaw, so it doesn't move, doesn't come out, and doesn't need to be worked around. You brush it with your other teeth. You bite into whatever's in front of you.",
        ],
        [
          "The tooth on top is made to match the shade and shape of the teeth beside it, so in most cases nobody can tell which one it is — including you, after a few weeks.",
        ],
        [
          "And because the implant replaces the *root* as well as the tooth, it keeps working the jawbone the way a natural tooth does. That's the part people don't know about until someone explains it: implants are the only replacement that helps preserve the bone underneath, rather than sitting on top of it while it slowly recedes.",
        ],
        ["Eat what you want. Laugh without the hand going up. Stop thinking about it."],
      ],
    },

    {
      type: "whyChoose",
      h2: "Why patients across Tunbridge Wells choose us for implant treatment",
      points: [
        {
          title: "One dentist, start to finish.",
          body: [
            "Dr Simon Azimi plans your treatment, places your implant and fits your final tooth. You are not handed between clinicians and you don't re-explain yourself at every visit. The person who assessed you is the person who treats you.",
          ],
        },
        {
          title: "A straight answer about whether it's right for you.",
          body: [
            "Implants aren't the answer for everyone, and we'll say so. If a bridge or a denture would serve you better — or if you need something else dealt with first — you'll hear that at the consultation rather than after you've committed.",
          ],
        },
        {
          title: "You'll know the cost before you decide.",
          body: [
            "You leave the consultation with a written treatment plan and a full price. No staged reveals, no “we'll see how it goes.” ",
            {
              placeholder:
                "[PLACEHOLDER: confirm whether payment plans or finance are offered — if so, FCA-compliant wording is required]",
            },
          ],
        },
        {
          title: "Built for people who don't like the dentist.",
          body: [
            "A significant number of implant patients have avoided dental care for years, often after a bad experience. That's normal here. We explain before we do, we stop when you ask, and nobody is made to feel foolish about being nervous.",
          ],
        },
        {
          title: "Two minutes from the station, at the entrance to Calverley Park.",
          body: [
            "Easy to reach from Tonbridge, Southborough and Pembury, and genuinely straightforward if you're coming in by train from London or Hastings.",
          ],
        },
        {
          title: "A mercury-free practice.",
          body: ["We use tooth-coloured, mercury-free materials throughout."],
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
              "[PLACEHOLDER: real review — ideally mentioning implants and eating normally again]",
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
      h2: "What is a dental implant?",
      blocks: [
        {
          kind: "definition",
          text: "A dental implant is a small titanium post placed into the jawbone to replace the root of a missing tooth.",
        },
        {
          kind: "p",
          text: [
            "Once the bone has healed around it, a crown — the visible tooth — is fixed on top. The result is a replacement tooth that is anchored into the jaw rather than resting on the gum, so it functions like a natural tooth.",
          ],
        },
        {
          kind: "p",
          text: [
            "Titanium is used because bone bonds directly to it, a process called osseointegration. That bond is what gives an implant its stability, and it's why implants can support anything from a single tooth to a full arch.",
          ],
        },

        { kind: "h3", text: "What can dental implants replace?" },
        {
          kind: "list",
          items: [
            [
              "**One missing tooth** — a single implant and crown, without touching the healthy teeth either side",
            ],
            ["**Several missing teeth** — two or more implants supporting a bridge"],
            [
              "**A full arch** — a fixed bridge or a stabilised denture supported by multiple implants, replacing a whole upper or lower set",
            ],
            [
              "**A loose denture** — implants placed to hold an existing-style denture firmly in place, so it stops moving when you eat or talk",
            ],
          ],
        },

        { kind: "h3", text: "Am I suitable for dental implants?" },
        {
          kind: "p",
          text: [
            "Most adults in reasonable general health are suitable. What matters most is healthy gums and enough bone to hold the implant securely.",
          ],
        },
        { kind: "p", text: ["You're likely to be a good candidate if:"] },
        {
          kind: "list",
          items: [
            ["Your gums are healthy, or any gum disease has been treated"],
            [
              "You have enough jawbone — and if you don't, bone grafting can often build it back up",
            ],
            [
              "You don't smoke, or you're willing to stop during healing (smoking significantly increases the risk of implant failure)",
            ],
            ["You're committed to cleaning them properly and coming for regular check-ups"],
          ],
        },
        {
          kind: "p",
          text: [
            "Some medical conditions and medications affect healing and bone, so your full medical history is reviewed at the consultation. If implants aren't right for you, you'll be told directly and shown the alternatives.",
          ],
        },

        { kind: "h3", text: "Do dental implants hurt?" },
        {
          kind: "p",
          text: [
            "The procedure itself is carried out under local anaesthetic, so you shouldn't feel pain while the implant is placed — most patients describe pressure rather than discomfort, and many say it was easier than the extraction that preceded it.",
          ],
        },
        {
          kind: "p",
          text: [
            "Afterwards, expect some soreness and swelling for a few days, usually manageable with ordinary over-the-counter painkillers. ",
            {
              placeholder:
                "[PLACEHOLDER: confirm whether sedation is offered for anxious patients — the old site referenced it indirectly]",
            },
          ],
        },
      ],
    },

    {
      type: "journey",
      h2: "What happens, from first call to finished tooth",
      steps: [
        {
          title: "Your consultation",
          body: [
            "A proper look at your mouth, a conversation about what's bothering you, and X-rays or a 3D scan to assess the bone. You'll be shown what's possible and given a written plan with the full cost. ",
            {
              placeholder:
                "[PLACEHOLDER: confirm whether implant consultations are chargeable, and whether any fee is redeemable against treatment]",
            },
          ],
        },
        {
          title: "Any groundwork first",
          body: [
            "If a tooth still needs removing, gum disease needs treating, or the bone needs building up with a graft, that happens before the implant goes in. Sometimes it's a single extra visit; sometimes it adds a few months of healing.",
          ],
        },
        {
          title: "Placing the implant",
          body: [
            "A single appointment, typically 60–90 minutes for one implant, under local anaesthetic. The post is placed into the jaw and the gum is closed over or around it. Most people go back to normal activity the next day. ",
            { placeholder: "[PLACEHOLDER: confirm typical appointment length]" },
          ],
        },
        {
          title: "Healing",
          body: [
            "The bone bonds to the implant over roughly three to six months, depending on the site and your healing. You won't be left with a visible gap in the meantime — a temporary tooth is provided where the gap would show.",
          ],
        },
        {
          title: "Fitting your new tooth",
          body: [
            "Once healed, an abutment — the small connector — is attached, impressions or a digital scan are taken, and your permanent crown is made to match the shade and shape of your natural teeth. It's fitted, checked against your bite, and adjusted until it feels right.",
          ],
        },
        {
          title: "Keeping it",
          body: [
            "Brush and clean between your teeth as normal, and keep up your check-ups and hygiene visits. Implants don't decay, but the gum and bone around them still need looking after.",
          ],
        },
      ],
    },

    {
      type: "cost",
      h2: "How much do dental implants cost in Tunbridge Wells?",
      intro: [
        [
          {
            placeholder:
              "[PLACEHOLDER: client to supply. All figures must be genuine and available.]",
          },
        ],
        [
          "**Realistic total timeline:** most single implants take four to eight months from placement to final tooth, the majority of which is healing rather than appointments. Straightforward cases can be quicker; cases needing grafting take longer.",
        ],
      ],
      table: {
        headers: ["Treatment", "From"],
        rows: [
          { cells: ["Implant consultation & assessment", { placeholder: "[£X]" }] },
          {
            cells: [
              "Single tooth implant (implant, abutment and crown)",
              { placeholder: "[from £X]" },
            ],
          },
          { cells: ["Implant-supported bridge", { placeholder: "[from £X]" }] },
          { cells: ["Implant-stabilised denture", { placeholder: "[from £X]" }] },
          { cells: ["Bone graft, if needed", { placeholder: "[from £X]" }] },
        ],
      },
      notes: [
        [
          "An implant costs more upfront than a bridge or a denture. It's also the only option that replaces the root, doesn't require cutting down the healthy teeth beside it, and — cared for properly — is designed to last many years. Most patients weigh it over the long term rather than the first invoice.",
        ],
        [
          {
            placeholder:
              "[PLACEHOLDER: finance or payment plan details. If finance is offered, FCA-compliant disclosure wording is required — this is a separate compliance area.]",
          },
        ],
      ],
    },

    {
      type: "comparison",
      h2: "Dental implants vs bridges vs dentures",
      table: {
        headers: ["", "Implant", "Bridge", "Denture"],
        rows: [
          { cells: ["Fixed in place", "Yes", "Yes", "No — removable"] },
          {
            cells: [
              "Affects neighbouring teeth",
              "No",
              "Yes — healthy teeth are reshaped to hold it",
              "No",
            ],
          },
          { cells: ["Preserves jawbone", "Yes", "No", "No"] },
          {
            cells: [
              "Typical lifespan",
              "Designed to last many years with good care",
              "Around 10–15 years",
              "Relined or replaced periodically",
            ],
          },
          { cells: ["Feels like a natural tooth", "Closest option", "Close", "Least"] },
          { cells: ["Upfront cost", "Highest", "Middle", "Lowest"] },
          { cells: ["Treatment time", "4–8 months", "2–3 weeks", "4–8 weeks"] },
        ],
      },
      blocks: [
        { kind: "h3", text: "Should I choose an implant or a bridge?" },
        {
          kind: "p",
          text: [
            "If the teeth either side of your gap are healthy and untouched, an implant is usually the better long-term choice — it leaves those teeth alone, whereas a bridge requires filing them down to anchor it. If those neighbouring teeth already need crowns, a bridge can be sensible, because the work serves two purposes at once.",
          ],
        },
        { kind: "h3", text: "Can implants replace all my teeth?" },
        {
          kind: "p",
          text: [
            "Yes. A full arch can be supported on a number of implants — you don't need one implant per tooth. This can be a fixed bridge that stays in permanently, or a denture that clips securely onto implants and stops moving. Which suits you depends on your bone, your bite and your budget, and it's a conversation for the consultation.",
          ],
        },
      ],
    },

    {
      type: "faqs",
      h2: "Frequently asked questions",
      items: [
        {
          q: "How long do dental implants last?",
          a: [
            "With good cleaning and regular check-ups, dental implants are designed to last many years — studies report a high proportion still functioning well after ten years and beyond. The crown on top may need replacing sooner than the implant itself, as it takes the daily wear.",
          ],
        },
        {
          q: "How much does a single dental implant cost?",
          a: [
            { placeholder: "[PLACEHOLDER: from £X at iSmile Dental Practice]" },
            " The price should cover the implant, the abutment and the crown — always check what's included when comparing quotes, as some prices cover only the post.",
          ],
        },
        {
          q: "Is the procedure painful?",
          a: [
            "The implant is placed under local anaesthetic, so you shouldn't feel pain during it. Most patients report mild soreness for a few days afterwards, managed with ordinary painkillers.",
          ],
        },
        {
          q: "How long does the whole process take?",
          a: [
            "Usually four to eight months from placement to your final tooth, mostly healing time. Cases needing extraction or bone grafting first take longer.",
          ],
        },
        {
          q: "Will I be left with a gap while it heals?",
          a: [
            "No. Where the gap would be visible, a temporary tooth is provided so you're never without one.",
          ],
        },
        {
          q: "Am I too old for dental implants?",
          a: [
            "There's no upper age limit. Bone health and general health matter far more than age — patients in their seventies and eighties have implants placed routinely.",
          ],
        },
        {
          q: "Can I have an implant if I've lost bone in my jaw?",
          a: [
            "Often, yes. Bone grafting can rebuild the area so an implant can be placed securely. This is assessed with a scan at your consultation.",
          ],
        },
        {
          q: "Do implants get decay?",
          a: [
            "The implant and crown can't decay. But the gum and bone around them can still become infected if not cleaned properly — which is why hygiene visits matter as much after treatment as before.",
          ],
        },
        {
          q: "Can I smoke after having an implant?",
          a: [
            "Smoking significantly increases the risk of implant failure by slowing healing and affecting the gum. Stopping — at minimum through the healing period — makes a real difference to the outcome.",
          ],
        },
        {
          q: "What if my implant fails?",
          a: [
            "It's uncommon, but it happens. If an implant doesn't bond to the bone it's usually detected early, removed, and the site allowed to heal before trying again. You'll be told about the risks honestly at the consultation. ",
            {
              placeholder:
                "[PLACEHOLDER: confirm practice policy on implant failure, and any warranty terms. Written terms and legal review are needed before publishing any assurance.]",
            },
          ],
        },
        {
          q: "Are dental implants available on the NHS?",
          a: [
            "Only in limited circumstances, usually following trauma or medical treatment. For most people, implants are a private treatment.",
          ],
        },
        {
          q: "How do I look after my implant?",
          a: [
            "Brush twice daily, clean between your teeth with floss or interdental brushes, and keep up your check-ups and hygiene appointments. It's the same care that keeps your natural teeth healthy.",
          ],
        },
      ],
    },

    {
      type: "areas",
      h2: "Implant treatment for patients across Tunbridge Wells and West Kent",
      body: [
        [
          "We're at the entrance to Calverley Park, directly opposite Tunbridge Wells railway station — which makes implant appointments realistic to fit around work rather than around a day off.",
        ],
        [
          "Patients travel to us from **Southborough** (around ten minutes), **Tonbridge**, **Pembury**, **Rusthall** and the surrounding villages, and the station location means the journey from further afield is straightforward by train.",
        ],
        [
          "Implant treatment involves several appointments over a few months, so being easy to get to genuinely matters.",
        ],
      ],
    },

    {
      type: "finalCta",
      h2: "Find out whether implants are right for you",
      body: [
        [
          "The consultation is where the guesswork stops. You'll get a proper assessment, an honest answer on whether an implant is your best option, and a written plan with the cost on it — before you commit to anything.",
        ],
      ],
      primaryLabel: "Book my implant consultation",
      secondary: [
        "Or call us on **01892 547286** — we're happy to answer questions over the phone first.",
      ],
    },
  ],
};
