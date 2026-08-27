# Component Catalog

This is the shared library of how each component looks and behaves. Build from
these specs so a Button (or Input, or Card) is the same everywhere.

**How to use this file**
- Before building any component, check whether it's here and follow the spec.
- Reuse and extend existing components; don't create near-duplicates.
- **When you create a new reusable component that isn't here, add a spec for it**
  using the same headings (Purpose, Anatomy, Variants, Sizes, States, Tokens,
  Responsive, Accessibility). This is how the catalog grows.

**Universal rules for every component**
- Style comes from tokens only (see `design-tokens.md`). No raw hex/px.
- Every interactive element has clear `hover`, `active`, `focus-visible`, and
  `disabled` states. Focus always shows a visible ring (`--color-focus-ring`).
- Minimum touch target 44×44px on touch devices.
- Components are self-contained and responsive; they never assume a fixed pixel
  width of their container.
- Examples below use framework-neutral HTML + CSS variables to show intent. Map
  the same structure to your stack (JSX/Vue SFC/etc.), the anatomy, variants,
  states, and tokens stay identical.

## Table of contents

1. Button
2. Icon Button
3. Input (text)
4. Textarea
5. Select
6. Checkbox & Radio
7. Switch
8. Form (layout, labels, validation)
9. Card
10. Modal / Dialog
11. Table
12. Navigation (top bar + sidebar)
13. Badge / Tag
14. Alert / Banner
15. Toast
16. Tabs
17. Tooltip
18. Avatar
19. Skeleton / Loading
19b. Every async surface has four states, not one
20. Empty state
21. Error state
> Add new components below this line, keeping the numbering going.

---

## 1. Button

**Purpose:** trigger an action. The most-used component, get it right and the
whole app feels consistent.

**Anatomy:** `[optional leading icon] label [optional trailing icon]`, with
internal padding from the spacing scale, `--radius-md` (or the project radius),
and `--font-medium` weight.

**Variants:**
- `primary`, filled with `--color-primary`, text `--color-on-primary`. The one
  main action per view.
- `secondary`, filled with a neutral surface or `--color-secondary`; supporting
  actions.
- `outline`, transparent bg, `1px` `--color-border`, text `--color-text`.
- `ghost`, transparent, no border; low-emphasis actions in toolbars.
- `destructive`, `--color-danger`; irreversible/dangerous actions.
- `link`, looks like a text link, no padding box.

**Sizes:** `sm` (h ~32px, `text-sm`), `md` (h ~40px, `text-sm/base`) default,
`lg` (h ~48px, `text-base`). Height comes from padding, not a fixed height, so
text scales properly.

**States:** rest → hover (`--color-primary-hover`) → active
(`--color-primary-active`) → focus-visible (ring) → disabled (reduced opacity,
`cursor:not-allowed`, no hover) → loading (spinner replaces/adds to leading
icon, label stays, button non-interactive).

**Tokens:** primary role colors, `--space-*` padding, `--radius-*`,
`--font-medium`, `--duration-fast` for transitions.

**Responsive:** on narrow screens, primary form/dialog buttons often go
full-width; icon+label may collapse to icon-only in dense toolbars (keep an
`aria-label`).

**Accessibility:** real `<button>` (or `role="button"`), reachable by keyboard,
`Enter`/`Space` activate, visible focus ring, `aria-busy` while loading,
`aria-label` when icon-only.

```html
<button class="btn btn-primary btn-md">Save changes</button>
```
```css
.btn{display:inline-flex;align-items:center;gap:var(--space-2);
  font-family:var(--font-sans);font-weight:500;border-radius:var(--radius-md);
  border:1px solid transparent;cursor:pointer;
  transition:background var(--duration-fast) var(--ease-standard);}
.btn:focus-visible{outline:2px solid var(--color-focus-ring);outline-offset:2px;}
.btn:disabled{opacity:.5;cursor:not-allowed;}
.btn-md{padding:var(--space-2) var(--space-4);font-size:var(--text-sm);min-height:40px;}
.btn-primary{background:var(--color-primary);color:var(--color-on-primary);}
.btn-primary:hover:not(:disabled){background:var(--color-primary-hover);}
.btn-outline{background:transparent;border-color:var(--color-border);color:var(--color-text);}
```

## 2. Icon Button

Square button containing only an icon (e.g. close, more, edit). Same variants
and states as Button, but **must** have an `aria-label` and a ≥44px touch
target even if the icon looks smaller. Use for compact actions, never for the
primary action of a view.

## 3. Input (text)

**Purpose:** single-line text entry. **Anatomy:** optional label above,
optional leading/trailing icon or affix, the field, optional helper/error text
below.

**Sizes:** match Button heights (`sm/md/lg`) so inputs and buttons align on a
row.

**States:** rest, hover, focus (border → `--color-primary`, add focus ring),
filled, disabled (`--color-surface-2` bg, subtle text), read-only, error
(border + helper text in `--color-danger`), success (optional).

**Tokens:** `--color-surface` bg, `--color-border`, `--color-text`,
`--color-text-subtle` placeholder, `--radius-md`, `--space-3` horizontal
padding.

**Responsive:** inputs are fluid width (`width:100%`) inside their form column;
never a hard-coded pixel width.

**Accessibility:** every input has an associated `<label>` (via `for`/`id`);
placeholder is **not** a label. Errors linked via `aria-describedby` and
`aria-invalid="true"`.

```css
.input{width:100%;font-size:var(--text-sm);color:var(--color-text);
  background:var(--color-surface);border:1px solid var(--color-border);
  border-radius:var(--radius-md);padding:var(--space-2) var(--space-3);min-height:40px;}
.input::placeholder{color:var(--color-text-subtle);}
.input:focus{outline:none;border-color:var(--color-primary);
  box-shadow:0 0 0 3px color-mix(in srgb,var(--color-focus-ring) 30%,transparent);}
.input[aria-invalid="true"]{border-color:var(--color-danger);}
.input:disabled{background:var(--color-surface-2);color:var(--color-text-subtle);cursor:not-allowed;}
```

## 4. Textarea

Same visual language as Input, multi-line, vertically resizable (`resize:vertical`),
sensible `min-height` (~3 rows). Same label/error/a11y rules.

## 5. Select

Native `<select>` styled to match Input, or a custom listbox when you need
search/multi-select/rich options. If custom: full keyboard support (Up/Down,
Home/End, type-ahead, Enter to choose, Esc to close), `role="listbox"` /
`role="option"`, `aria-expanded`, and it must close on outside click and Esc.
Match Input height and tokens either way.

## 6. Checkbox & Radio

Custom-styled control aligned with a clickable label. Checkbox = independent
on/off; Radio = one of a group (`name` shared). States: unchecked, checked
(`--color-primary` fill, `--color-on-primary` mark), indeterminate (checkbox),
focus ring, disabled. Hit area includes the label text. Use real inputs
(visually hidden native input + styled box) so keyboard/`Space` works and forms
submit correctly.

## 7. Switch

Toggle for an immediate on/off setting (not for form submit choices, use a
checkbox there). Track + thumb; `--color-primary` track when on, neutral when
off; animated thumb with `--duration-fast`. `role="switch"`, `aria-checked`,
keyboard toggle with `Space`. Always pair with a label describing what it
controls.

## 8. Form (layout, labels, validation)

**Layout:** vertical stack by default, label on top, field, helper/error below,
consistent `--space-4` between fields. Group related fields; on wide screens use
a responsive grid (e.g. two columns) that collapses to one column on mobile.

**Labels:** always visible, above the field. Mark required fields consistently
(e.g. `*`) and say what "required" means once.

**Validation:** validate on submit and on blur for the touched field; show the
error inline directly under the field in `--color-danger` with an icon, and
also move focus to the first error on submit. Never rely on color alone,
include text. Keep the submit button disabled only when you can cheaply know the
form is invalid; otherwise let submit run validation and surface errors.

**Buttons:** primary action bottom-right (LTR) or full-width on mobile; a
secondary/cancel to its left. Show a loading state on submit and prevent double
submit.

**Accessibility:** the form is a `<form>`; grouped controls use `<fieldset>` +
`<legend>`; each field label is programmatically linked; an error summary at top
for long forms is helpful.

## 9. Card

Container grouping related content on a `--color-surface` with `--radius-lg`,
`--shadow-sm`, and internal padding `--space-4`/`--space-6`. Optional header
(title + actions), body, footer. Cards are fluid and reflow in a responsive grid
(see `responsive-and-a11y.md`). If the whole card is a link/action, make the
primary target a real link and keep nested buttons from nesting inside it.

## 10. Modal / Dialog

Centered surface over a dimmed `--z-overlay` scrim; dialog at `--z-modal`,
`--color-surface`, `--radius-lg`, `--shadow-xl`. Anatomy: title, close (icon
button), body, footer actions.

**Behavior that must be correct:** focus moves into the dialog on open and is
**trapped** inside; `Esc` and scrim click close it (unless a destructive
confirm); focus returns to the trigger on close; body scroll locked while open.
`role="dialog"`, `aria-modal="true"`, `aria-labelledby` the title. On mobile,
prefer a full-screen sheet or bottom sheet instead of a tiny centered box.

## 11. Table

Use for truly tabular data. Header row with `--color-surface-2`, zebra or
divider rows via `--color-border`, cell padding from the spacing scale, numbers
right-aligned. Sticky header for long tables. **Responsive:** on mobile, either
horizontally scroll within a container (keep the header visible) or switch to a
stacked card-per-row layout, never let a table break the viewport width. Use
real `<table>`/`<th scope>` semantics; add `aria-sort` on sortable headers.

## 12. Navigation (top bar + sidebar)

**Top bar:** brand/logo left, primary nav center/left, actions (search, theme
toggle, user menu) right; sticky at `--z-sticky`. Collapses to a hamburger menu
below `md`. **Sidebar:** vertical nav for apps/dashboards; collapsible to icons;
becomes an off-canvas drawer on mobile. Mark the current item with
`aria-current="page"`, ensure full keyboard navigation, and make the mobile
menu trap focus while open.

## 13. Badge / Tag

Small status/label pill. Use the feedback role tints (`--color-*-bg` +
`--color-*-fg`) for status; neutral surface for generic tags. `--radius-full`
or `--radius-sm` consistently. Keep text short; don't rely on color alone for
meaning, include a word.

## 14. Alert / Banner

Inline message block for context (success/warning/danger/info). Soft `-bg`
tint, matching `-fg` text, a leading status icon, optional dismiss. Distinct
from Toast (which is transient/floating). Use `role="alert"` for urgent/error
messages so screen readers announce them.

## 15. Toast

Transient floating notification at `--z-toast`, auto-dismiss (~4-6s) with a
manual close and pause-on-hover. Stack in a corner; animate in/out with
`--duration-base`. `role="status"` (polite) or `role="alert"` (assertive for
errors). Never put critical, must-read info only in a toast.

## 16. Tabs

Switch between sibling views. Tab list + panels; active tab marked with an
underline/pill in `--color-primary`. `role="tablist"`/`tab`/`tabpanel`, arrow-key
navigation, `aria-selected`. On mobile, allow horizontal scroll of the tab list
rather than wrapping into an unreadable stack.

## 17. Tooltip

Small label on hover/focus at `--z-tooltip`. Must appear on keyboard focus too,
not just mouse hover. Keep it to short text, never put essential-only info or
interactive controls in a tooltip. `role="tooltip"` linked via
`aria-describedby`.

## 18. Avatar

User image or initials fallback in a `--radius-full` frame; sizes `sm/md/lg`.
Provide `alt` text (name) or `aria-hidden` when purely decorative next to a
visible name. Support a group/stack layout with an overflow "+N".

## 19. Skeleton / Loading

Placeholder blocks mimicking content shape while loading, using `--color-surface-2`
with a subtle shimmer (respect `prefers-reduced-motion`). Prefer skeletons over
spinners for content areas; use a spinner for button/inline actions. Mark the
region `aria-busy="true"`.

## 19b. Every async surface has four states, not one

The single most common defect in an otherwise good UI is a component that was
only ever designed for the happy path. Anything that waits on a network, a file
or a user action needs all four of these designed, not just the first:

| State | What the user sees |
| --- | --- |
| **Loading** | A skeleton shaped like the real content, not a centred spinner. A spinner says "something is happening"; a skeleton says "here is what is coming", and it does not shift the layout when data lands |
| **Empty** | Succeeded, nothing to show. Explain why it is empty and give the action that fills it (see 20) |
| **Error** | Failed. Say what failed, whether it is the user's problem, and how to retry (see 21) |
| **Success** | The actual content |

Rules that apply across all four:

- **Reserve the space before you know the answer.** The loading state must
  occupy the same box as the loaded state, or the page jumps and CLS suffers.
- **Never leave a dead end.** Every non-success state offers a way forward:
  retry, go back, or contact someone.
- **Do not flash.** Content arriving in under ~200ms should not show a loading
  state at all; flicker reads as broken. Equally, do not leave a spinner
  spinning forever with no timeout.
- **Disable and label the trigger while in flight.** A submit button stays
  disabled with `aria-busy` until the request resolves, so nobody double-submits.
- **Announce changes to screen readers.** Put the region in `aria-live="polite"`
  so a state change is heard, not only seen.

## 20. Empty state

What a list/section shows with no data: a short heading, one line of guidance,
and a primary action to fix it (e.g. "Add your first item"). Keep it friendly
and actionable, centered within the container, using the standard spacing scale.

**Empty is not error.** "No results for that search" is a success with zero
rows; "we could not reach the server" is a failure. They read differently and
offer different actions. Never show one for the other.

## 21. Error state

What a surface shows when the thing it needed did not arrive. Same footprint as
the loaded state, so nothing jumps.

**Anatomy:** a short heading saying what failed, one line of plain explanation,
a retry action, and a secondary way out. An icon is optional; a red border alone
is not enough, because colour must never be the only signal.

**Write it for the person, not the stack.** "Could not load your reviews" beats
"Error: 500". Never surface a raw exception, a stack trace, or an internal id in
the UI. Log the detail, show the meaning.

**Say whose problem it is**, because the useful action differs:

| Kind | Message shape | Action |
| --- | --- | --- |
| Their input | What is wrong with which field | Fix it inline, next to the field |
| Their connection | "You appear to be offline" | Retry, and retry automatically when the connection returns |
| Our fault (5xx) | "Something went wrong at our end" | Retry, and a contact route if it persists |
| Not allowed (401/403) | "You do not have access to this" | Sign in, or ask an owner |
| Not there (404) | "That page no longer exists" | A real link somewhere useful, never a dead end |

**Scope the failure to the part that failed.** One widget failing should show an
error in that widget, not replace the whole page. A page-level error boundary
exists to catch what nothing else caught, not as the standard handler.

**Retry properly.** Only retry things that are safe to repeat, back off between
attempts rather than hammering, and give up visibly rather than looping in
silence.

**Never silently swallow a failure.** An empty `catch`, a promise with no
`.catch`, or a state that stays in loading forever all look identical to the
user: the page is broken and nobody said so. If you cannot handle it, surface it.
