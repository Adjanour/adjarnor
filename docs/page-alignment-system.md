# The Page Alignment System

This document explains how horizontal alignment works on this site, why it kept
breaking before, and the conventions that now keep it from breaking again. It
covers the container utility, the gutter rhythm, and the navbar's seat/pop
animation as a worked example. Read it once, and treat the checklist at the end
as something to apply by hand.

---

## How the alignment used to break

The site went through a phase where sections didn't line up, and every fix
felt like whack-a-mole. The story is worth telling, because the bug was never
in any one number — it was in how many different places width decisions were
being made.

At the peak, four components each rolled their own version of "the centered
content column":

| Component | Its version of "the column" | Side padding |
|---|---|---|
| `main` on the home page | `max-w-6xl` | `px-4 sm:px-6` |
| The navbar pill | `max-w-5xl` | `px-3 sm:px-8` |
| Each `Section` | `max-w-5xl`, nested *inside* `main` | `px-4 sm:px-6` |
| `Experience` | `max-w-5xl` | `px-12` |

No two shared the same recipe. Worse, `Section` was wrapped in `main`, so the
page had *centering inside centering* — like folding a letter, then folding it
again and wondering why the second fold doesn't line up with others.

The clearest confession was `px-12` on `Experience`. That value didn't describe
anything on its own. It existed purely so Experience's text would *appear* to
land where the other sections' text landed. A number that exists only to
compensate for a structural mistake is a debt: it works today, and the moment
anyone changes any wrapper's width or padding, it breaks silently.

---

## Rule 1: One container per full-width section

A **full-width section** (sometimes called a "row" or "region" in design
systems — think of it as a horizontal slab of the page) is any element that
spans the entire width of the viewport — the navbar, a section, the footer.
The horizontal alignment convention is:

> Each full-width section owns exactly one container: a single element that
> applies `max-width`, horizontal centering, and gutters. Never nest two
> elements that each impose width rules.

Think of the page as a row of train wagons sitting on one track. The track
gauge — the distance between the rails — is fixed. Every wagon, from the
navbar to the footer, sits on the same gauge. If you start putting a second,
narrower gauge *inside* a wagon, the doors stop lining up between wagons.
Nested containers are second gauges.

When "some things don't line up," the diagnostic question is not "which
padding value is wrong?" It's: **"How many containers are in this stack?"**
On the home page the answer used to be three (`main` → `Section` → content
slot); now it's one. Alignment stopped being something we notice and fix,
because it became impossible to get wrong — there is only one coordinate
system.

## Rule 2: Decide layer ownership — one question per layer

Alignment is easiest to keep when every layer of the page stack answers
exactly one structural question, and deliberately refuses the others:

| Layer | Owns | Explicitly does not own |
|---|---|---|
| `<main>` | vertical spacing, the skip-link target | width, gutters |
| The full-width section (`Section`, `Experience`, footer…) | horizontal alignment, vertical rhythm | its content's internal layout |
| The content inside | its own layout (`flex`, `grid`, `gap`) | the page column |

A component whose job you can say in one sentence ("it owns alignment") is
therefore easy to place correctly on sight. Experience *is a full-width
section*, so it
must carry the container utility — and once it did, its `px-12` compensation
simply had nothing left to compensate for.

## Rule 3: Tokens and primitives, not numbers

Two layers of indirection make the system stable:

1. **The primitive.** The site defines exactly one sanctioned way to say
   "this is a page column":

   ```css
   @utility container-page {
     margin-inline: auto;
     max-width: var(--container-5xl);
     padding-inline: 1rem;
     @media (width >= 40rem) { padding-inline: 1.5rem; }
   }
   ```

   `@utility` is a CSS-only construct (Tailwind v4) for defining a real
   utility class the way Tailwind itself would — like adding a new word to
   the site's shared vocabulary rather than everyone improvising their own
   dialect.

2. **The token.** The width is not the literal `64rem`; it's
   `var(--container-5xl)`, a named design token from the theme. Tokens are
   the master keyring: rename or resize the token and every consumer follows.
   Hard-coding `64rem` in four places is cutting four separate keys for the
   same lock — they fit today, and drift apart next year.

New pages don't invent containers. They adopt the primitive. Reading
pages (`writing`, `blog`, `resume`) use a narrower article column *inside*
the section, which is a content decision, not a container decision — the
section itself stays the same.

## Rule 4: The gutter rhythm is part of the contract

A **gutter** is the fixed amount of breathing room between the content and
the screen edge (below the maximum width, it's the only thing keeping text
off the glass when you're on a phone).

Here's the subtlety that cost the most debugging time: the navbar is
`position: fixed`, so it sits outside the normal document flow — a hovering
platform, technically not part of the room. But it must obey the **same
gutter values as the flow layout** (`px-4 sm:px-6` ↔ `1rem`/`1.5rem`) and the
same breakpoint semantics (Tailwind's `sm:` means *from 40rem wide
upward* — mobile-first, portrait widening outward).

On a phone, `max-width` never engages — the column is just the viewport minus
gutters. Mobile alignment is therefore decided entirely by gutters, and `4`
versus `3` pixels of padding difference is an 8-pixel offset at the text
edge. Wide-screen alignment comes from the shared max-width; phone
alignment comes from the shared gutters; you need both halves of the
contract for the system to hold. But "test alignment" needs a concrete
routine — see **The four-checkpoint alignment test** below for the exact
DevTools workflow.

A related trap, caught in production: the navbar was styled with the
container's `max-width` but `padding-inline: 0`, and still drifted one
gutter-width off every text edge. Reason: Tailwind sets the global
`box-sizing: border-box`, under which **`max-width` includes padding** — so
the section's text column is `max-width − 2 × padding`, while the nav's was
the full `max-width`. A text column is defined by `max-width` and
`padding-inline` *together*; two elements align only when both numbers
match. When two things must be identical, restate the full spec (or share a
primitive), rather than relying on values that are merely arithmetic
equivalents.

---

## The navbar seat/pop pattern (worked example)

The navbar starts "seated" — visually at home in the page — and pops out
into a floating pill once you scroll, then settles back when you return to
the top. Beneath the theatrics, it's a small state machine, and the pattern
is reusable for anything with two visual states:

1. **The truth lives in one place.** JavaScript listens to `scroll` and writes
   a single attribute: `nav.dataset.popped = "true"`. JavaScript never
   touches CSS values; CSS never listens to scroll. The HTML attribute is
   the state store, and CSS is what the state looks like — a light switch:
   the switch knows only on/off, the room decides what on means.

2. **Transitions for reversible changes.** Differences between the two states
   run as CSS `transition`s, so they animate in *both* directions — out and
   back — for free:

   ```css
   .site-nav { transition: background-color .35s ease, max-width .35s ease, …; }
   .site-nav[data-popped="true"] { max-width: var(--container-6xl); … }
   ```

3. **Keyframes for one-shot embellishments.** The overshooting "pop"
   (`scale 0.96 → 1.015 → 1` on a springy `cubic-bezier`) is choreography
   tied to *time*, not to *state*, so it lives in a `@keyframes` animation
   that plays once per detach. A transition is a dimmer slider — it responds
   symmetrically to whichever way you slide it. A keyframe is a firework —
   it fires, it performs, it's done.

4. **Retriggering requires the reflow trick.** Browsers coalesce class
   changes, so re-adding an animation class in the same frame does nothing.
   Force the browser to blink first:

   ```js
   nav.classList.remove("nav-pop");
   void nav.offsetWidth;   // forces a synchronous reflow — the reset
   nav.classList.add("nav-pop");
   ```

5. **Animate interpolable geometry.** The seat-to-pop movement is expressed
   as `max-width 5xl → 6xl` and `padding-inline 0 → 2rem`, because both
   properties have a meaningful halfway point that the browser can draw.
   Everything stays in motion instead of teleporting. And the endpoints are
   theme tokens, so the midpoints can never drift out of sync with the
   container system the nav is aligning to.

6. **Respect reduced motion.** Both keyframes die under
   `prefers-reduced-motion: reduce`; the fades survive. Users who opt out of
   motion still get the function, minus the fireworks.

**Appendix — the CSS-only future:** scroll-driven animations
(`animation-timeline: scroll()`) and scroll-state container queries
(`@container scroll-state(stuck: top)`) let a sticky element detect and
express this state in CSS alone. Transitions under a scroll-state query
animate symmetrically by design, which suits this navbar perfectly.
Firefox support for scroll-state is still incomplete, so the JS fallback
stays for now.

---

## The four-checkpoint alignment test

Rules only hold if someone actually inspects them. This is the routine — in
Chrome or Firefox DevTools — that catches every alignment failure the
system can produce. Roughly ten minutes, and worth it before any release
that touched layout.

### Setup (once per session)

1. Open DevTools: `F12` / `Ctrl+Shift+I`. Toggle the **device toolbar**
   (responsive mode) with `Ctrl+Shift+M`, or click the phone-and-tablet icon
   at the top-left of the panel. Responsive mode renders the page at an
   arbitrary viewport size inside the panel — a resizable window into a
   phone-sized browser, without resizing your real window.
2. Pick **Responsive** in the device dropdown (don't use a named device
   preset — exact widths matter here). You can type a pixel width straight
   into the toolbar's size input (``Ctrl+Shift+M`` shows drag handles; the
   input box is faster).
3. Paste this into the **Console** to draw the alignment system on screen
   and log its edges:

   ```js
   const boxes = [...document.querySelectorAll(".container-page")];
   boxes.forEach((el) => (el.style.outline = "1px dashed magenta"));
   console.table(
     boxes.map((el) => ({
       where: el.closest("section,footer")?.id ?? el.tagName.toLowerCase(),
       boxLeft: Math.round(el.getBoundingClientRect().left),
     })),
   );
   ```

   The outlines make the container boxes visible; the table prints each
   box's left edge. **Every row should show the same number.** If one row
   differs by a few pixels, you've found the misalignment without eyeballing
   anything. This replaces the old method — screenshotting and counting
   pixels in an image editor.

### The four checkpoints

| # | Width | What this stress-tests | What failure looks like here |
|---|---|---|---|
| 1 | **375px** (small phone) | Gutters only — `max-width` never engages, so alignment is entirely `padding-inline` | Everything shifted a few px on one element: a gutter mismatch |
| 2 | **639px → 641px** (the `sm` seam) | The breakpoint bump — gutters grow `1rem → 1.5rem` at exactly 640px | One element bumps at a different width, or one forgets the bump entirely |
| 3 | **1071px → 1073px** (the cap seam) | Where `max-width` starts capping (5xl = 1024px + 2 × 24px gutters = 1072px) | A box that keeps growing past the cap, or caps at the wrong width because its padding wasn't matched (the border-box trap) |
| 4 | **1920px** (ultrawide) | The floating centered column — pure centering math, padding largely irrelevant | A column that's centered but off-rhythm with another column, or fixed furniture off by the gutter difference |

For each checkpoint:

4. Type the width into the size input. For the seam checkpoints (2 and 3),
   test **both sides**: `639` then `641`, `1071` then `1073`. The point is
   watching the transition happen at exactly the right pixel — "roughly the
   same region" is where breakpoint bugs hide.
5. Read the `console.table` from the setup step. Same `boxLeft` in every
   row? Aligned. Note the number only needs to match *within one width
   setting* — it's expected to differ between 375px and 1920px.
6. Handle the navbar's two states, since the nav pop is state-dependent:
   scroll down ~50px (the pill pops), then scroll back up, and check the
   console table both times. Seated, the nav's name must sit on the same
   left edge as the hero text — the border-box rule from the previous
   section. Popped, its pill edges intentionally slide *wider* than the
   column (5xl → 6xl) — verify the expansion is smooth and that returning
   to seated restores the exact alignment.

Why these four: they're not arbitrary sizes, they're the **failure modes of
the container contract**. Checkpoint 1 tests the gutter half of the
contract, checkpoints 2 and 3 test the two conditions (breakpoint, cap)
where behavior changes, and checkpoint 4 tests the centering half. If all
four pass, every intermediate width is provably fine — the system is piecewise
linear between checkpoints, so there is nowhere left for a bug to hide.

*Firefox note:* the steps are identical, and Firefox's responsive mode
additionally draws a media-query ruler above the page — the colored bars
mark every breakpoint in your CSS, which makes the seam checkpoints easy to
find visually.

---

## Checklist

- [ ] Things don't align? Count the containers in the stack — fix placement before touching any number.
- [ ] Tempted to add a magic margin to line something up? Stop. Fix the container structure; the number is compensating for it.
- [ ] New width or spacing value? It must come from a token via `container-page` (or another defined primitive), or it isn't part of the system.
- [ ] Every full-width section — fixed or in-flow — uses the same gutter values per breakpoint.
- [ ] Matching a column means matching `max-width` *and* `padding-inline` (border-box includes padding — the column is max-width minus 2 × padding).
- [ ] Navigation and shared furniture hold the same rhythm as the content sections, at every width.
- [ ] Two-state UI: one writer of truth (data-attribute), transitions for reversible changes, keyframes for one-shot accents, reduced-motion respected.
- [ ] Run the four-checkpoint alignment test (375px, both sides of the `sm` seam, both sides of the cap seam, 1920px) — seated and popped nav at each.
