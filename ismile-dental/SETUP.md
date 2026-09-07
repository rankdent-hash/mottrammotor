# iSmile Dental Practice — accounts, hosting and deployment

This file has three parts:

1. A prompt to paste into **Claude in Chrome** to set up the GitHub and
   Vercel accounts.
2. The steps only you can do (and why an agent cannot do them for you).
3. How to connect Claude Code to the new repo and deploy this site.

---

## 1. Prompt for Claude in Chrome

Open a browser window signed out of any existing GitHub/Vercel account, open
the Claude Chrome extension, and paste this in. Replace the bracketed values
first.

```text
I'm setting up the web presence for a dental practice called "iSmile Dental
Practice". I want a GitHub account and a Vercel account for it, with the two
connected so pushes to GitHub deploy automatically.

Use these details:
- Practice name: iSmile Dental Practice
- Email to register with: [YOUR EMAIL]
- Preferred GitHub username: [e.g. ismile-dental]
- Repository name: ismile-dental-website
- Repository visibility: private

Work through this in order, and stop and hand control back to me at every
point marked STOP. Don't guess at anything I haven't given you — ask instead.

STEP 1 — GitHub account
Go to https://github.com/signup and fill in the email and username above.
STOP before the password field, the "verify you're human" puzzle, the Terms
of Service checkbox, and the emailed verification code — I'll do those
myself. Tell me clearly when you're stopping and what you need from me.

STEP 2 — Secure the account
Once I'm signed in, walk me through enabling two-factor authentication at
https://github.com/settings/security. Don't try to set it up for me; the
recovery codes need to end up somewhere only I control.

STEP 3 — Create the repository
Go to https://github.com/new and create a repository named
"ismile-dental-website", private, with no README, no .gitignore and no
licence (the code I'm pushing already has them). Tell me the resulting URL.

STEP 4 — Vercel account
Go to https://vercel.com/signup and choose "Continue with GitHub" so the two
accounts are linked from the start. STOP at the Terms of Service and at any
authorisation screen — I'll approve those. Choose the Hobby (free) plan
unless I tell you otherwise, and don't enter any payment details.

STEP 5 — Install the Vercel GitHub app
When Vercel asks which repositories it may access, grant it access to
"ismile-dental-website" only, not "All repositories". STOP so I can confirm
the scope before you continue.

STEP 6 — Report back
Tell me: the GitHub account URL, the repository URL, the Vercel account
email, and the Vercel team/scope name. List anything that failed or that you
skipped, and don't say a step succeeded unless you saw it succeed.

Rules for this whole task:
- Never accept Terms of Service, privacy policies or cookie banners on my
  behalf — that's a legal agreement in my name.
- Never invent or enter a password, and never type a password I gave you
  into a page you navigated to yourself; I'll type credentials myself.
- Never enter payment card details.
- Don't create any account, org or project I didn't ask for above.
- If a page looks different from what you expected, stop and describe it to
  me rather than clicking through.
```

---

## 2. What you have to do yourself

An agent driving your browser genuinely cannot — and should not — do these:

| Step | Why it's yours |
| --- | --- |
| Accepting the GitHub / Vercel Terms of Service | It's a contract in your name. Nobody can agree to it on your behalf. |
| CAPTCHA / "verify you're human" | Solving it on your behalf is exactly what it exists to prevent, and it will typically fail anyway. |
| Choosing and entering passwords | Credentials should never pass through a model's context. Use a password manager. |
| Email verification codes and 2FA setup | Same reason — and the recovery codes need to live somewhere only you can reach. |
| Payment details, if you ever leave the free tier | Never hand card details to an agent. |

Everything else — navigation, form filling, checking the repo scope Vercel
asks for, reporting back — the extension can do.

---

## 3. Connecting Claude Code and deploying

### Give Claude Code access to the new repo

1. Sign in to claude.ai as the account you use for Claude Code.
2. Go to **Settings → Connectors → GitHub** and connect (or reconnect) GitHub.
3. When GitHub asks which repositories the Claude app may access, select
   **ismile-dental-website**.
4. If the repo belongs to an organisation rather than a personal account, an
   org owner also has to allow it at
   <https://claude.ai/admin-settings/claude-tag>.

After that, a Claude Code session can read, branch, commit and push to the
repo directly.

### Push this code to the new repo

From the `ismile-dental/` directory:

```bash
git init
git add .
git commit -m "Initial commit: iSmile Dental Practice website"
git branch -M main
git remote add origin https://github.com/[USERNAME]/ismile-dental-website.git
git push -u origin main
```

### Deploy on Vercel

1. In Vercel, **Add New → Project**, and import `ismile-dental-website`.
2. Framework preset: **Next.js** (detected automatically).
3. Root directory: leave as `./` if you pushed the contents of
   `ismile-dental/` to the repo root. If you pushed the whole monorepo
   instead, set it to `ismile-dental`.
4. Deploy. Every push to `main` redeploys; every branch gets a preview URL.

### Environment variables

Set these in **Vercel → Project → Settings → Environment Variables**. None of
them are required for the site to build and run — without them the enquiry
form still works and logs to the Vercel function logs.

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical URL, used for metadata, sitemap and structured data. Set it to the live domain once the practice has one. |
| `RESEND_API_KEY` | Enables emailed enquiry notifications. From <https://resend.com>. |
| `ENQUIRY_NOTIFY_EMAIL` | The practice inbox that receives enquiry notifications. |

### A note on patient data

The enquiry form deliberately collects only name, phone, email and a short
message, and it tells patients not to send clinical detail. Anything about a
person's health is special category data under UK GDPR, so before you add a
database, a CRM, an analytics tool or a chat widget to this site, decide
where that data lives, who can see it, and how long it is kept.
