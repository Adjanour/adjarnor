# The Color System (and Hover Etiquette)

Why the site's hover states use neutral surface shifts instead of colored
fills, what color theory the decision stands on, and the engineering that
keeps it uniform. Worked example: the highlight chips, theme toggle, and
404 button that used to fill green on hover.

The one-line rule this document defends:

> **Hue is meaning. Value is affordance.**

---

## The theory in three channels

Computers talk about color in RGB; humans experience it in three
distinguishable dimensions, and interaction states should pick one:

1. **Hue — the category channel.** Red means error, green means
   live/current/confirmed. Hue changes tell the user "this is a different
   *kind* of thing." That's semantic information, the scarcest channel:
   the moment several gestures borrow a hue, its meaning erodes.
2. **Value (luminance) — the physical channel.** How bright is it? Value
   shifts read as *light and elevation*: something brightening feels like
   it moves toward you (a lamp under a hand, a door face catching light as
   your hand reaches for it). This is what "pressable" is made of.
3. **Saturation — the urgency channel.** Raised saturation concentrates
   attention; it metabolizes as intensity. Used in moderation — a palette
   where everything is intense has no intensity at all.

A hover does one thing: acknowledges your pointer. That's a physical claim,
so it should be filed in the **value** channel — brighten the surface,
strengthen its border — while hue stays untouched. A hover that repaints a
component in a new hue claims "this has changed categories," which
over-promises massively: nobody hovering a chip has changed its
citizenship.

### The diagnosis: what the green hover was actually saying

The old treatment (`hover:bg-accent hover:text-accent-foreground`) had
three compounding problems:

1. **Wrong channel.** The pale sage fill (`158 15% 88%` in light mode) is
   a *hue* change — every hover told a small lie about the chip's
   identity.
2. **Hue monopoly violated.** Green is this site's most load-bearing hue:
   `--primary` means *live/current* (the pulsing dot, the Experience
   "current" tag, the back-to-top button). Letting hover borrow green
   means the eye can no longer infer "green = live here" — the gesture
   channel and the meaning channel fought over the same paint.
   See the token rule in `live-indicator.md`: one hue, one meaning.
3. **Dark-mode physics.** In dark themes, **light reads as near**: elevated
   surfaces are the *lighter* ones (light falls from above; your eye has
   learned this from living under it). So dark-mode hover is a small
   **lightness raise**, and the classic hazard of colored dark-hover
   fills is **halation** — a saturated hue at low lightness TV-tubes
   against low-contrast text, vibrating instead of clarifying. The dark
   `--accent` (`158 40% 20%`) fill was exactly that hazard shape.

## The token ramp (the actual plumbing)

The palette already encodes the right roles — the hover bug was simply
three components reading from the wrong rung:

| Token | Light | Dark | Role |
|---|---|---|---|
| `--background` | `0 0% 100%` | `222 84% 4.9%` | the page floor; surfaces rest here |
| `--muted` | `210 40% 96.1%` | `217 33% 17.5%` | **the hover rung** — a neutral step up/down in value |
| `--accent` | `158 15% 88%` | `158 40% 20%` | selected/active states (not hovers) |
| `--primary` | `158 64% 32%` | `158 64% 42%` | the meaningful action; green = live/current |

Note what `--muted` is per theme: not a color choice but a *value step*
the theme itself defines. Light mode shifts the surface to a whisper of
blue-gray (96% lightness); dark mode to a lighter navy slate (17.5% →
visibly above the 4.9% floor). Both are the "door catching light" move,
expressed in each theme's own physics — which is precisely why the fix
survives theme switching with zero per-theme code.

## The engineering: unification over invention

The interesting discovery: the codebase **already had** a hover language.
A sweep of every `hover:` utility found the neutral system in place
almost everywhere — `ArticleCard` and `WritingCard` hover with
`bg-muted/30`, `ShareButtons` with `bg-muted`, the featured writing card
with `border-border` strengthening, and ~15 links with `text-foreground`
value shifts. Only three components broke rank with green fills: the
highlight chips, the theme toggle, and the 404 button — three swap-edits
(`hover:bg-accent hover:text-accent-foreground` → `hover:bg-muted`).
No new classes were invented; the anomaly was brought to the majority.

> This is the "count the containers" lesson in hue: when something looks
> wrong, check first whether it's a *loaner* — styles a component adopted
> ad hoc that no peer uses. The fix is then subtraction, not design.

Also worth naming: the swap drops `hover:text-accent-foreground`
entirely. Text color never needed to change on hover — the surface shift
is the whole signal. Keeping text fixed means no contrast re-check per
theme, and the transition is one property, `background-color`, which is
what `transition-colors` was already animating.

## OKLCH — the green ramp in a perceptual space

The green tokens (`--primary`, `--accent`, `--brand-start`) are now defined
in **OKLCH**, not HSL. OKLCH is a *perceptual* color space (built on
Björn Ottosson's OKLab, 2020): its L axis genuinely tracks perceived
lightness and its C axis genuinely tracks perceived chroma, so equal
numeric steps are equal *visual* steps. In HSL, S=50% looks loud at some
lightnesses and hollow at others, because HSL is a math-first deformation
of RGB, not a vision model. Working in OKLCH, the question "can dark-mode
green be more vivid without breaking contrast?" became *measurable
arithmetic* instead of monitor-squinting.

### The workflow (reusable for any token)

1. **Convert** the current token to OKLCH (sRGB → OKLab matrices).
2. **Decide the budget**: the one hard constraint per context is WCAG
   contrast. For this ramp: light primary sits on white (budget ≈ 4.5:1,
   *and only 4.55:1 today — no room*), dark primary sits on near-black and
   carries prose links (AA floor, plus headroom).
3. **Gamut-fit**: raise chroma until sRGB runs out of monitor and refuses
   — then binary-search back to the in-gamut edge. The dark lift came
   from exactly this: at the old lightness the gamut exhausted at
   C ≈ 0.145, so the move was lightness 0.673 → 0.70 *and* chroma to
   0.152 (chroma +12%, contrast 7.49 → 5.16 — still above AA).
4. **Lock the hue axis**: ~163° across every token, light and dark —
   hue is the one axis meaning lives in (see the token rule above), so
   vividness work never touches it.

| Token | Was (HSL) | Now (OKLCH) | Notes |
|---|---|---|---|
| `--primary` light | `158 64% 32%` | `oklch(0.552 0.11 163.1)` | exact conversion; contrast budget spent |
| `--primary` dark  | `158 64% 42%` | `oklch(0.7 0.152 162.8)` | the vividness lift, computed |
| `--accent` light  | `158 15% 88%` | `oklch(0.914 0.011 172.2)` | space conversion only |
| `--accent` dark   | `158 40% 20%` | `oklch(0.365 0.053 167)` | space conversion only |
| `--brand-start`   | `158 64% 36/45%` | `oklch(0.6 0.12 163)` / `oklch(0.7085 0.1435 162.7)` | gradient anchor, converted |

### The unit bug (a confession worth keeping)

The first contrast pass lied: dark candidates showed *impossible* numbers
because the luminance function re-encoded already-linear RGB — applying
the sRGB transfer curve twice. Color math is unit soup: **encoded sRGB,
linear light, and perceptual axes are three different coordinate
systems**, and mixing them is the single most common color-programming
mistake. The corrected pipeline kept one rule: luminance takes linear
values, nothing else touches the encoding curve twice.

### The consumer migration (mechanical, but worth reading once)

OKLCH strings can't sit inside the old `hsl(var(--primary) / alpha)`
wrapper pattern, so every consumer migrated to `color-mix`:

```css
/* was: hsl(var(--primary) / 0.85) */
color-mix(in oklab, var(--primary) 85%, transparent);
```

`color-mix(in oklab, …)` is the modern alpha/blend tool — it interpolates
in the perceptual space too. Tailwind v4 needed no help: the `@theme`
mapping became `--color-primary: var(--primary)` and every
`bg-primary/85`-style utility compiled to `color-mix` automatically.

Two edge cases in that sweep are since resolved rather than leftover:
the blog **diagram utilities** were passing `hsl(var(--primary))` strings
into SVG *presentation attributes* (`fill=`), where CSS variables don't
resolve in browsers — `serialize()` now pre-walks the element tree and
promotes any var-carrying `fill`/`stroke`/`font-family` attribute to an
inline `style`, where variables do resolve. And the dark-mode
**back-to-top button** (white-on-green text below AA) got its text
swapped to the background token — navy on the lifted green, which
mirrors the green's own 5.16:1 — while its hover was converted from a
translucent alpha-mix (content bleeds through a floating button, so
text contrast goes uncontrolled) to an opaque value-shift
(`color-mix` 10% toward black).

## Checklist

- [ ] Interaction states (hover/active/focus) move in value & border, not hue.
- [ ] Hue assignments are scarce: one hue = one meaning, tracked (`--primary` green is owned by *live/current*).
- [ ] Every evaluator pair checked in **both themes** — dark-mode hover is a lightness raise, with halation risk on saturated fills.
- [ ] New hover states reuse the neutral ramp (`bg-muted`, `border-border`, `text-foreground`) before proposing anything else.
- [ ] If a sweat-case hover genuinely needs a different fill, it goes through a token — not an arbitrary class.
- [ ] Green-ramp tokens (`--primary`, `--accent`, `--brand-start`) are OKLCH; hue axis stays ~163°; never touch it for vividness.
- [ ] Contrast is computed, not eyeballed — and the pipeline must be unit-clean (luminance takes *linear* RGB; never encode twice).
- [ ] Alpha over OKLCH tokens goes through `color-mix(in oklab, …)`, never an HSL wrapper.
- [ ] New colors: convert → budget → gamut-fit → lock hue, in that order (see the OKLCH section).
