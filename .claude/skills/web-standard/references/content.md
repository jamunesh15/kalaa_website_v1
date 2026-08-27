# Content Rules, write like a person, not a bot

When a page needs words and the user did not supply them, write the content
yourself to a professional, human standard. The goal is copy a good human writer
would ship: clear, specific, and free of the tells that make text obviously
AI-generated. Content and UI are one deliverable, copy is written to fit the
section it lives in (hero, feature, CTA), and sections are shaped around real
copy, not lorem ipsum.

## First: did the user give you the copy?

**If the user supplies content, ship it exactly as written.** Word for word,
same spelling, same punctuation, same capitalisation, same line breaks. Do not
rewrite it, do not "improve" it, do not add a word, do not drop a word, do not
swap a synonym, do not split or merge sentences, and do not append a tagline,
a heading, or a CTA line they did not write. This includes copy pasted into
chat, copy in a screenshot or design file, and copy in a doc they linked.

The rules in the rest of this file describe how to write copy that the user did
not give you. They never override supplied copy. If supplied copy breaks one of
those rules (it uses an em dash, it repeats a word, it reads long), leave it
alone and ship it as given.

Two things you may still do, because they are not rewriting:

- Ask. If the copy has a clear typo, is missing a piece the layout needs, or
  will not fit the space, point it out and ask whether to change it. Wait for
  the answer, then use whatever they say verbatim.
- Fit the layout without touching words. Line breaks for wrapping, a truncation
  style, or which sentence goes in which slot are layout decisions, as long as
  every supplied word still appears and reads in the order they wrote it.

If only part of the page is supplied, treat that part as fixed and write the
rest around it in a matching voice.

## Do you have the facts?

Only write what is true for this project. If you don't have real details (prices,
features, names, numbers, addresses), don't invent them and don't paper over the
gap with vague filler. Use a clearly marked placeholder the user can replace
(e.g. `[[ add your founding year ]]`) or ask for the specific fact. Made-up
specifics are worse than an honest placeholder because they ship as if true.

## The banned AI-writing tells (this is the important part)

These patterns are what the user means by "don't write like AI." Avoid them.
This list is distilled from the `humanizer` skill (Wikipedia's "Signs of AI
writing"); when polishing a large block of copy, run it through that skill.

**Punctuation and typography**
- **Em dashes:** do not pepper copy with `—`. Most can be a comma, a period, or
  parentheses. This is the single most requested rule here, keep dashes rare.
- **No ellipses (`…`) as filler** or for fake suspense. End sentences cleanly.
- Use straight quotes `" '`, not curly `" '`. Don't decorate with emojis.
- Don't bold phrases mechanically or write "**Label:** sentence" list items.
- Headings in sentence case, not Title Case Of Every Word.

**Structure and rhythm**
- Kill the **rule of three** ("fast, simple, and powerful"). Real writing doesn't
  group everything into triples. Use one strong point or an honest list length.
- No **"not just X, it's Y"** negative parallelisms, and no tacked-on tailing
  negations ("...no guesswork", "...no wasted motion").
- Vary sentence length. Some short. Some longer when the idea needs room. Uniform
  medium-length sentences read like a machine.
- No **false ranges** ("from startups to enterprises, from idea to launch") unless
  the two ends are a real scale.
- Don't cycle synonyms for the same thing (protagonist → main character → hero)
  to avoid repetition. Just name it.

**Vocabulary and tone**
- Avoid the AI-vocabulary set: *delve, leverage, seamless, robust, elevate,
  unlock, empower, streamline, foster, testament, tapestry, landscape (abstract),
  vibrant, pivotal, crucial, intricate, underscore, showcase, realm, boasts,
  nestled, in today's fast-paced world, at its core, in the realm of.*
- Prefer plain verbs: **is/are/has** over "serves as / stands as / boasts."
- Cut filler: "in order to" → "to"; "due to the fact that" → "because"; "has the
  ability to" → "can"; "it is important to note that" → just say it.
- No promotional puffery ("breathtaking", "world-class", "game-changing") unless
  it's a real, specific claim you can back up.
- No sycophancy or chatbot artifacts in page copy ("Great question!", "I hope
  this helps", "Let me know if…", "Of course!").
- No knowledge-cutoff or hedging disclaimers ("as of my last update", "while
  details are limited", "it could potentially be argued").
- No generic upbeat conclusions ("the future looks bright", "exciting times
  ahead"). End on something concrete.
- Don't over-hyphenate common pairs (high-quality, data-driven, cross-functional,
  real-time) with robotic consistency.
- Don't announce ("Let's dive in", "Here's what you need to know"), just say the
  thing. Don't follow a heading with a one-line restatement of the heading.

## What good page copy does instead

- **Lead with the specific benefit** to the reader, in their words. "Ship a
  landing page in an afternoon" beats "Empowering seamless digital experiences."
- **Use concrete details and real numbers** where you have them. Specificity is
  the fastest way to sound human and to be persuasive.
- **Match the reader and the product.** A dev tool, a bakery, and a law firm
  should not sound the same. Pick a register (plain, warm, confident) and hold it.
- **One clear idea per section.** Say it, support it, move on.
- **Active voice, direct address** ("you") for marketing copy; neutral and
  precise for docs and legal.
- **Have a point of view** where appropriate. A little opinion and personality
  reads as human; perfectly neutral copy reads as generated.

## Content that fits the UI

**These lengths apply only to copy you are writing yourself.** If the user gave
you the words, they ship exactly as written even when they break every number
below. A supplied 14-word headline is a 14-word headline.

Copy is written to the shape of each section, and length is part of the design:
a heading that wraps to three lines breaks the layout it was designed for.
Count before you commit.

| Slot | Target | Hard ceiling |
| --- | --- | --- |
| Hero headline | 4-9 words | 60 characters |
| Hero supporting line | 1 sentence, 12-20 words | 140 characters |
| Section eyebrow / label | 1-3 words | 24 characters |
| Section heading (H2) | 3-8 words | 50 characters |
| Section description | 1-2 sentences | 180 characters |
| Card / feature heading | 2-5 words | 34 characters |
| Card body | 1-2 sentences | 140 characters |
| Button label | 1-3 words | 22 characters |
| Badge / pill | 1-2 words | 18 characters |
| Nav item | 1-2 words | 18 characters |
| FAQ question | 1 sentence | 80 characters |
| Meta title | see `seo.md` | 60 characters |
| Meta description | see `seo.md` | 160 characters |

Ceilings are where the layout starts to suffer, not a target to fill. Aim at the
target column and stop when the point is made.

Then the per-section shape:

- **Hero:** one headline (the core promise, not a slogan salad), one supporting
  line (what it is and who it is for), one primary CTA with a concrete verb
  ("Start free", "Book a demo", not "Learn more" everywhere). Optional trust
  line, a real stat or proof, never an empty superlative.
- **Feature/benefit sections:** a short benefit-led heading, 1-3 sentences of
  plain explanation, and a visual. Lead with the outcome, then the mechanism.
- **Social proof:** real quotes, logos, numbers. If none exist yet, leave a
  marked placeholder rather than fabricating testimonials.
- **CTA sections:** restate the value in one line, one primary action, remove
  distractions.
- **Microcopy** (buttons, labels, empty states, errors) is content too:
  specific, helpful, human. "Add your first project" beats "No data."
- **Keep parallel items parallel.** Three cards in a row should have headings of
  roughly equal length. One heading wrapping while its neighbours do not looks
  like a bug, and on mobile it is one.
- **Length discipline:** write the minimum that fully makes the point. Cut any
  sentence that only adds ceremony.

As a senior developer/writer, add or adjust section-level copy rules by judgment
when a layout needs them, but keep to the tells list above and record any new
recurring content pattern here so the standard grows.

## Quick self-check before shipping copy

Did the user supply any of this copy? If yes, diff it against what they sent and
confirm it is identical before anything else. Then, for the copy you wrote:
read it aloud, does it sound like a person, or like a press release? Search the
draft for `—`, `…`, curly quotes, and the AI-vocabulary words and remove them.
Is every specific claim true (or a marked placeholder)? Does each section's copy
fit its UI slot and drive one action? If yes, it's done.
