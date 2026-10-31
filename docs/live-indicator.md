# Engineering a Live Indicator

How the pulsing status dot and the ticking Accra clock in the navbar's time
chip were built — the visual anatomy, the state contract, and the
performance mistakes the naive version makes. The worked example is the
`live-dot` and clock script in `src/components/site/DynamicElements.astro`.

The through-line: **"live" is a promise**. Whatever element signs it — a
pulsing dot, a moving number — has to be backed by genuinely live data, and
the code below is what makes that promise cheap to keep.

---

## Part 1 — The dot itself

### Size honesty: a dot your eyes can confirm

The original dot was `0.15rem` wrapped in a 2px ring — 2.4 pixels of blue.
At standard display density, anti-aliasing turns any colored element that
small into a mushy smear; you couldn't see a circle, only trust one. There's
a practical rule in that failure:

> If a viewer has to be told what an element is, it's below the rendering
> threshold. Eyeball-check it at 1x DPR, not at 3x on your phone.

A status light's job is to be legible at the periphery — you shouldn't
focus on it to know it's there. The fix is a 10px core (`h-2.5 w-2.5`),
which is the size real indicator dots settle at across design systems.

> Why not CSS pixels/physical pixels here? `rem` scales with the user's
> root font size — accessibility in the width contract; fixed pixel
> utilities (`h-2.5` = `calc(var(--spacing) * 2.5)` = 10px) are fine for a
> purely decorative shape whose meaning is carried elsewhere.

#### Addendum — icons must be drawn for their render size

The same rendering threshold, one level up: the quote chip's SVG icon was
three arcs in a 24-unit viewBox, stroked at 2 units, rendered at 12px
(`h-3 w-3`). Stroke weight scales *proportionally* with the icon, so at
12px those strokes came out ~1px wide — thin enough that anti-aliasing
turned a quotation mark into a squiggle. The math is worth internalizing:

> **effective stroke = rendered size × (stroke units ÷ viewBox units)**
>
> `12px × (2/24) = 1px`. A 1px stroke on a curved path only survives at
> 1x density for *straight, large* shapes; curves alias into noise.

Most icon libraries (Lucide, Feather, Phosphor line style) author at 24px
and assume **20–24px render size** — their hairline details are tuned to
that window. Shrinking them to 16px and hoping is the icon equivalent of
the 2.4px dot: the element is below the threshold its drawing was made
for. The fix ladder, in order of preference:

1. **Size up the icon** to its designed range (20px+).
2. **Swap strokes for a filled shape** at small sizes — filled silhouettes
   survive halving much better than hairlines (= solid ink vs. fine
   engraving).
3. **Let typography do the job** when the subject *is* text. A quotation
   mark is alphabet before it is imagery: a real `“` glyph in the serif
   stack beats any icon, inherits the theme for free, and adds zero
   dependency. All hierarchy, no bitmap.

And the semantic bow on that: pictograms for mechanical subjects (clock,
calendar, download) and typographic glyphs for verbal ones (quotes,
copyright, math marks). The two chips in the navbar ended up differing —
stroke clock icon, hanging serif quote — *because* their subjects differ,
not despite it. Consistency of *system*, not sameness of *pixels*, is
what reads as polish.

### One hue, one meaning

The old dot was blue in light mode and green in dark mode — two hues for
one semantic, and neither was the palette's own. The site already uses
`--primary` (the brand green) for *this is current* — the "current" tag in
Experience, the back-to-top button. A status dot joining a different color
family dilutes the system: color stops meaning anything when its meaning
shifts per theme.

> The token rule, restated from the container doc: colors are vocabulary.
> If a component drafts its own hue, it's a typo now and a rebrand's
> puzzle later. `bg-primary` in light and dark theme alike keeps the word
> "green" meaning the same thing everywhere, and a future theme change
> updates every live indicator for free.

### The two-element pulse: core + ripple

The standard anatomy is a stack, not a styled span:

```html
<span class="live-dot relative flex h-2.5 w-2.5" aria-hidden="true">
  <span class="live-dot-ping absolute inline-flex h-full w-full rounded-full bg-primary"></span>
  <span class="relative inline-flex h-2.5 w-2.5 rounded-full bg-primary"></span>
</span>
```

Two spans, both the same size, stacked. The bottom card is absolutely
positioned at full size — it's the one that animates, growing to twice its
width while fading out. This is a pebble in a pond: a ring that is born at
full strength and dies by travel. The core doesn't move at all; the ring
gives the motion. Two elements, each with one job — vectors, not a single
element trying to both pulse and stay put.

The eye-catch keyframe has one crucial detail: **the ring's rest state is
empty.**

```css
@keyframes live-ping {
  0%   { transform: scale(1); opacity: 0.5; }
  70%, 100% { transform: scale(2); opacity: 0; }
}
```

Holding at 70%–100% empty gives the dot a silent rest between beats — it
beats, then holds its breath, instead of strobing. Cadence (1.8s, an
ease-out arc) is a taste knob: slow reads as calm, fast reads as urgent.

### Motion as enhancement, never as the carrier

The full animation dies under `prefers-reduced-motion: reduce`:

```css
@media (prefers-reduced-motion: reduce) {
  .live-dot-ping {
    animation: none;
    opacity: 0.15;  /* static faint halo */
  }
}
```

Note the subtlety: the ring isn't *deleted*, it's **frozen at a whisper**.
The signal survives — a faint halo that still says "present" — while the
breathing goes. If motion vanishes and takes the meaning with it, motion
was the meaning, and that's a bug in the design, not a concession to the
media query. Every animated element should be able to answer "what do I
communicate when I stop?" — here the answer is the halo.

### Decoration stays out of screen readers

`aria-hidden="true"` on the whole dot. Screen-reader users shouldn't be
announced the punctuation — the chip's text ("10:20 pm, Accra, GH,
Now - Afternoon flow") carries all the information. A live *visual* cue is
for the eyes; its content twin is the text next to it.

---

## Part 2 — The clock, i.e. the honesty the dot is selling

### Never animate a claim the data doesn't back

The dot pulsed before the clock did. That mattered, because the clock was
**frozen at build time**: `{currentTime}` in the frontmatter is a string
computed once at `astro build`, and every visitor from then on saw the
minute the build happened. A pulsing dot beside a stopped clock doesn't
look alive — it looks caught lying.

> A dot certifies "this number moves". Never let an indicator sign a check
> the data can't cash. If the data is a snapshot, the animation is a
> confession, and the viewer's eye (or renewed inspection) will find the
> mismatch.

### The SSR handoff: ship a truth, then make it true

The fix follows the progressive enhancement playbook. The markup still
ships the build-time string as initial content; a small `<script>` then
takes over:

1. `document.querySelector("[data-clock-time]")` — the hook is a `data-*`
   attribute, not a styling class. Styling classes refactor freely; the
   wiring survives.
2. First `tick()` runs immediately, correcting build time to real Accra
   time — no empty frame ever exists. Server truth → client truth, in that
   order, with `.textContent` so no layout reads and the `font-mono`
   styling does its job.
3. `setInterval(tick, 1000)` keeps it honest from then on.

No-JS visitors still see *a* time — the build-time one, slightly stale but
never blank. That's the shape of every progressive enhancement: the
statically rendered content is the floor, hydration raises it.

> Mirror the exact formatters and the hour→status mapping from component
> frontmatter, so the server string and the client string agree by
> construction. If you change a label ("Evening reset" → "Wind-down"),
> change it once and both paths follow. Two sources of truth drift apart —
> that's drift's favorite place to live ("do these two look identical?")
> is the wrong question; "is only one file in charge?" is right.

### Hot-path hygiene: construction outside the loop

The clock runs every second, which makes `tick()` a hot path — code
executed so often its cost dominates. `Intl.DateTimeFormat` is one of the
more costly constructors in the browser (locale tables get parsed per
instance), and formatting with an existing instance is trivially cheap by
comparison:

```ts
// Built once, outside `tick`:
const timeFmt = new Intl.DateTimeFormat("en-GB", { … });
const hourFmt = new Intl.DateTimeFormat("en-US", { … });

const tick = () => {
  const now = new Date();
  timeEl.textContent = timeFmt.format(now);   // cheap: reuse
  …
};
```

Building the formatters *inside* `tick` — the natural-looking way — pays
that parsing cost every second, forever. The general rule ("hoist
everything reusable out of the per-frame function") applies unchanged to
media queries, DOM queries, and object/spawn costs in any request handler,
animation frame, or interval. A vacuum cleaner that reassembles itself
between rooms.

### One script, nineteen pages

Astro's `<script>` in a component is bundled, hoisted, and **deduped** —
the navbar renders on every page, but the browser fetches and runs the
clock script once per full page load, not once per component instance.
Component-local logic and page-load cost stay decoupled: reusing a
component across the site never multiplies its JS.

---

## Part 3 — The quote side, or: decoration must earn existence

### The tooltip redundancy, diagnosed

The quote chip's hover tooltip originally showed the same quote the chip
already displays. A tooltip that repeats visible text is decoration that
does no work — the interaction story inverts: the hover announces itself
(motion, focus-grab) and delivers **nothing you didn't have**. Worse, a
tooltip is expensive real estate: it's the only surface in the chip that
reaches beyond its box, the only place "more" can live.

> Every non-interactive element must answer: **what does the user get from
> me that they can't get without me?** A tooltip answers it worst of all,
> because its mere appearance is a cost — the user's eye commits to a
> detour. A tooltip that returns nothing converts a pleasant chip into a
> broken promise.

### The design call: archive peek, not truncate-rescue

Two candidate fixes existed. Truncate-detection (tooltip only when the
quote clips) makes the tooltip conditional — a mechanism built for an
edge case that rarely fires, since most quotes fit the chip's ~320px.
The chosen fix is the **archive peek**: the chip holds today's quote
(date-keyed from the existing rotation), and the tooltip reveals
**tomorrow's**.

Why this wins:

- **It gives decoration a job everywhere otherwise.** The tooltip now
  carries content that exists nowhere else on the page, at every
  viewport. No conditional logic, no "worth it / not worth it" toggling —
  the answer to "what does the tooltip give me" is always "a quote you
  haven't read, that the site will show tomorrow."
- **It's deterministic and build-consistent.** No randomness, no client
  state, no stake of variations between visitors. The rotation math stays
  key on UTC — Ghana is UTC+0 year-round, so the UTC date *is* the Accra
  date, and the "tomorrow's" index rolls month boundaries correctly via
  a timestamped date (`31st + 24h → 1st`).
- **It echoes the clock chip's rhythm.** Time ticks live; quotes turn on
  their calendar. Two neighboring chips, two honest time-cadences — and
  the peek makes the rotation *visible*, which is the difference between
  a daily quote and a static line of text you stopped seeing.

### The honest caveat — the snapshot rule, applied to content

"Tomorrow's quote" was originally computed **at build time**, which meant
a stale build showed a stale tomorrow — and it sat beside an element
(the clock) that *does* tick live, making the drift noticeable. The
archive has since been relocated: the quote list lives in
`src/data/quotes.ts`, imported by both the frontmatter (SSR floor) and
the bundled client script, which recomputes both quote slots for each
visitor on load and rolls them at Accra midnight via the same 1s ticker
that drives the clock. One heartbeat, many limbs: the interval that owns
time-derived state owns *all* time-derived state — no second interval,
no split authority.

The build-time compute remains solely as the no-JS floor: server-truth
first, client-truth after, by the same progressive-enhancement shape as
the clock (see Part 2).

### Typography doing one last job

The peeked quote is crowned by a **micro-label** — uppercase 10px,
wide-tracked, muted. Eyebrow style: it says "Tomorrow's quote" the way a
magazine caption identifies a pull-quote. Without it, the tooltip floats
a sentence with no frame, and its punchline (*why am I being shown this?*)
stays implicit. One label converts an easter egg into a designed feature.

---

## Checklist

- [ ] Decorative elements: `aria-hidden="true"`, and meaning readable from the adjacent text alone.
- [ ] Elements below ~8px: eyeball them at 1x DPR before shipping; trust nothing anti-aliased.
- [ ] Icons: check the effective stroke (`rendered size × stroke÷viewBox`); below ~1.5px at the render size they need a filled shape or a typographic glyph.
- [ ] Colors for a semantic ("live", "current", "error") come from the accent tokens, never per-component hues.
- [ ] Every animated element has a zero-motion state that still carries meaning ("what do I say when I stop?").
- [ ] Pulse patterns: animating ring's rest state is empty (hold at 70%+), cadence 1.5–2s.
- [ ] Any element displaying volatile data: is the source live upstream, or a build-time snapshot? Never pulse a snapshot.
- [ ] Script hooks are `data-*` attributes, never styling classes.
- [ ] Per-tick cost: constructors, queries, and allocations hoisted out of the hot path; formatters built once.
- [ ] Every non-interactive element (especially tooltips) states what it gives that nothing else on the page gives; decoration that repeats visible text ships as nothing.
- [ ] SSR ships initial truth; the script corrects it — there's never an empty frame.
