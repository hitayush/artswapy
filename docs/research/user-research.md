# ArtSwapy — User Research

Status: **assumption-based (proto-personas)**. No interviews have been run yet. Everything below is a
hypothesis to design against now and to validate with the study plan in §4 before launch.

## 1. Research question

Who visits a founder-led brand practice's site, what are they trying to decide, and what on the page
moves them from "browsing" to "starting a project"?

## 2. Proto-personas

| | **The founder with a growing business** | **The marketing lead at an established brand** | **The referred visitor** |
| --- | --- | --- | --- |
| Context | Runs a 5–50 person business (D2C, F&B, wellness, lifestyle). The brand was made in a hurry and no longer fits. | In-house team, needs an outside partner for a rebrand, a sub-brand or packaging. | Was sent a link by a friend or a past client. |
| Arrives from | Instagram, Behance, a search for "brand designer [city]" | LinkedIn, a shortlist, agency directories | A WhatsApp or email link, usually on a phone |
| First question | "Can this person make *my* brand look this good?" | "Is this practice senior enough, and how do they work?" | "Who is this, and is the person I was told about real?" |
| Decides on | Work quality, whether the work fits their category, a sense of the person | Process, scope of services, the depth of the case studies | The founder's face and name, then one or two projects |
| Time on site | 1–3 min, mostly on phone | 5–10 min, desktop, several visits | Under 1 min |
| Fear | Paying for a logo and getting nothing strategic | A solo practice that cannot carry a full system | Wasting time |
| Must-do action | Email or message to start a conversation | Send a brief, ask for credentials | Save the contact, or message right away |

## 3. Jobs to be done

1. **When** my business has outgrown how it looks, **I want to** see proof that this designer has done
   strategy as well as visuals, **so I can** trust them with more than a logo.
2. **When** I'm shortlisting partners, **I want to** understand the process and what I'd get at the end,
   **so I can** justify the choice to my team.
3. **When** someone recommends a person, **I want to** confirm who they are in seconds, **so I can**
   reach out while I still remember.

### What this means for the design system

| Finding (hypothesis) | Design decision |
| --- | --- |
| The founder *is* the product: people hire Swapnil, not "an agency" | Name and portrait own the first screen; the voice is first-person ("I") in About |
| Work quality decides everything | Work section gets the largest media, real names in display type, a fixed preview on hover/tap |
| Process reduces risk for the marketing lead | The five process stages (Strategy → Applications) become a scroll-driven story, not a bullet list |
| Most first visits are on a phone, many via a shared link | Phone layout is its own composition; loader under 1.2s on a repeat visit, skippable on first |
| Contact must be effortless | One primary action, repeated: "Start a project" → `mailto:` with subject and prefilled body |
| Proof must be real (README forbids invented clients) | No logos, testimonials or numbers until confirmed; placeholders stay visibly marked |

## 4. Validation plan (before launch)

| Method | Who | n | Goal |
| --- | --- | --- | --- |
| Short interviews (30 min) | 3 past/potential clients of Swapnil + 2 referred contacts | 5 | Confirm personas, first question, decision criteria |
| 5-second test on the hero | Anyone outside the studio | 10 | Can they say *who* and *what* after 5s? |
| Unmoderated usability test (phone) | Founders/marketers | 5 | Task: "Find a project like your business and start a conversation" |
| Analytics after launch (Vercel Web Analytics) | All visitors | — | Device split, scroll depth on Work, `mailto:` click rate |

### Interview guide (30 min)

1. **Warm-up (3 min)** — Their business and role.
2. **Context (7 min)** — "Tell me about the last time you hired a designer or agency. How did you find them?"
3. **Deep dive (12 min)** — "What did you look at on their site? What made you trust them? What nearly put you off?"
   Probe: portfolio vs process vs the person; phone vs desktop; how many sites they compared.
4. **Reaction (6 min)** — Show the ArtSwapy hero and Work section. "What is this? Who is it for? What would you do next?"
5. **Wrap-up (2 min)** — "Anything we didn't ask that matters when choosing a brand partner?"

### Synthesis

Affinity-map the notes into themes, then update §2 and §3 and mark which hypotheses held. Anything that
changes a "Design decision" row goes back into `DESIGN.md`.
