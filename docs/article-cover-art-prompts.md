# Technical article cover-art prompt chain

A repeatable image-generation workflow for every published article.
The covers serve two places: the 64px blog-list tile and the right-hand
art tile inside the generated 1200×630 OG card.

## Asset contract

- Generation target: 1600×1600 PNG, square, sRGB (the image model may
  emit another square size; the intake script accepts ≥512px).
- No title, letters, numbers, code, logos, watermarks, or UI screenshots.
- Keep the central subject inside the middle 72% of the canvas; reserve
  14% breathing room on every edge.
- The idea must remain recognizable at 64×64px.
- Run the approved source through:

  `node scripts/article-cover-intake.mjs /path/to/source.png <article-slug>`

  The original is archived under `src/assets/article-covers/`; a 512px
  progressive JPEG is emitted under `public/article-images/` for the
  blog tile and OG renderer. Add that `.jpg` public path as `image:` in
  article frontmatter.

## Prompt 0 — lock the style once per generation session

Run this before working on any article. Attach the halftone glasses
avatar as a texture/palette reference. Once the first cover is approved,
attach that cover as the primary reference for every later article.

```text
You are art-directing a coherent editorial cover series for Bernard
Katamanso's technical essays. Treat the attached reference as an
immutable style specimen, not as content to copy.

STYLE CONTRACT
- Retro editorial risograph / screen-print illustration.
- Thick confident near-black ink contours, cross-hatching, coarse
  halftone dots, slight print misregistration, tactile paper grain.
- Flat colors only: dark navy #020817, deep green #1D8660, warm gold
  #F9B310, warm cream #F7F3E8, near-black ink #17130E.
- Navy is the canvas. Cream carries diagrams. Green builds the main
  structure. Gold marks one focal insight.
- One large technical metaphor, not a collage of unrelated objects.
- Geometric, diagrammatic, intelligent, calm—not playful clip art.
- Strong silhouette, generous negative space, readable at 64px.
- Square 1600×1600 composition; all essential detail inside the central
  72%; no important object touches an edge.

HARD EXCLUSIONS
No text, letters, numbers, code snippets, logos, brand marks, gradients,
photorealism, glossy 3D, neon cyberpunk, generic circuit-board filler,
screenshots, interface windows, stock icons, or watermarks.

Do not generate yet. Reply only: STYLE LOCKED.
```

## How to run each article chain

For each article below:

1. Run its **Concept prompt**. Do not generate yet.
2. If the plan respects the style contract, run its **Generation prompt**.
3. Run the universal audit prompt near the end of this document.
4. If anything fails, run the universal surgical-revision prompt.
5. Save under the listed filename and add it to frontmatter.

## Current batch status

Integrated and passing: `36-statements-for-good-code`,
`applying-36-things-to-code`, `elegance-of-bit-shifting`,
`explicit-errors-functional-cores`, `lifeblood-of-git`,
`two-pointer-technique`, and `understanding-generics`.

Integrated provisionally: `autocomplete-with-tries-in-go`. Its tree
composition and palette fit the series, but the generated leaf nodes
contain English words. Those labels become noise at 64px and violate the
text-free contract. Regenerate it with the repair prompt in that section;
rerun the intake script with the same slug to replace both source archive
and live JPEG without touching frontmatter.

The Git archive cover deliberately uses Git marks. This is a documented
exception to the no-logo rule: the marks are the article's subject,
function as object identity at thumbnail size, and do not replace the
site or author brand.

---

## 1. 36 Things We Keep Learning About Software

File: `public/article-images/36-statements-for-good-code.png`

### Concept prompt

```text
Do not generate an image. Plan one cover using the locked style.

Article idea: recurring truths about complexity, abstraction, data
layout, and organizational boundaries distilled across decades.

Central metaphor: a 6×6 field of small cream engineering tiles being
compressed through a green funnel into one clear gold structural block.
The grid should read as accumulated knowledge, not a literal spreadsheet.

Return only: focal hierarchy, object placement, palette allocation,
halftone placement, and how the silhouette survives at 64px.
```

### Generation prompt

```text
Generate the approved composition under the locked style contract. Show
a field of accumulated engineering fragments converging into one stable,
gold-highlighted structural block through a green distillation funnel.
Keep the 6×6 rhythm visible as texture without making it fussy. No text,
numbers, symbols, or labels. Square 1600×1600 PNG.
```

## 2. What These Statements Look Like in Code

File: `public/article-images/applying-36-things-to-code.png`

### Concept prompt

```text
Do not generate. Plan one cover using the locked style.

Article idea: six software-design principles transformed from abstract
statements into practical TypeScript refactorings.

Central metaphor: one continuous machine crossing the canvas—tangled,
fragile piping on the left enters a green refactoring press and exits as
three clean cream modules with one gold connection on the right.

Return only the composition plan and 64px legibility strategy.
```

### Generation prompt

```text
Generate the approved before/after refactoring machine in the locked
risograph style. The transformation must read through shape and order,
not arrows with labels: tangled inputs become clean modular outputs, with
one gold seam identifying the design insight. No code or text. Square
1600×1600 PNG.
```

## 3. Autocomplete with Tries in Go

File: `public/article-images/autocomplete-with-tries-in-go.png`

### Concept prompt

```text
Do not generate. Plan one cover using the locked style.

Article idea: efficient prefix search through a trie.

Central metaphor: a strong green root grows into a symmetric branching
search tree; one partial route is illuminated in gold while unused
branches remain cream halftone. End nodes resemble small suggestion
cards but contain no letters.

Return only the composition plan and small-size silhouette test.
```

### Generation prompt

```text
Generate the approved prefix-tree composition in the locked style. Make
the gold search path unambiguous from root to selected branch, while the
remaining branches form a disciplined cream trie. No alphabet, words,
code, or Go logo. Square 1600×1600 PNG.
```

### Repair prompt for the current provisional cover

```text
Edit the supplied autocomplete cover only. Preserve the exact tree
silhouette, branch positions, green trunk, gold selected path, navy
background, crop, and risograph texture. Remove every English word and
letter from the leaf tiles. Replace each label with a blank cream tile
containing only an abstract halftone notch or dot pattern—no glyph-like
marks. Do not redesign the tree or add objects. Return a square PNG.
```

## 4. The Elegance of Bit Shifting in Subset Generation

File: `public/article-images/elegance-of-bit-shifting.png`

### Concept prompt

```text
Do not generate. Plan one cover using the locked style.

Article idea: bit masks turn subset generation into simple hardware-
friendly operations.

Central metaphor: a green mechanical shift register slides a row of
cream and dark tiles; below it, the possible tile groups fan out in a
precise geometric pattern. One shifted tile and its resulting subset are
gold. Use lit/unlit geometry—never printed 0s or 1s.

Return only the composition plan and palette map.
```

### Generation prompt

```text
Generate the approved mechanical bit-shift/subset composition using the
locked style. Communicate binary state through filled and empty tiles,
not digits. One gold tile should visibly trigger one gold subset below.
No text, numerals, or code. Square 1600×1600 PNG.
```

## 5. Explicit Errors and Functional Cores

File: `public/article-images/explicit-errors-functional-cores.png`

### Concept prompt

```text
Do not generate. Plan one cover using the locked style.

Article idea: errors as values, pure business logic at the center, and
side effects pushed to system boundaries.

Central metaphor: a solid green geometric core sits inside a cream
boundary ring. Gold error tokens travel on an explicit rail around the
core; noisy side-effect waves remain outside the ring.

Return only the visual hierarchy and boundary/rail composition.
```

### Generation prompt

```text
Generate the approved functional-core composition in the locked style.
The calm green core must feel deterministic; gold error tokens must be
visible data on a rail, not explosions or warning signs; side effects
stay at the cream boundary. No text or code. Square 1600×1600 PNG.
```

## 6. Hello, I'm Bernard Katamanso

File: `public/article-images/hello-world.png`

### Concept prompt

```text
Do not generate. Plan one cover using the locked style and the attached
approved portrait as an identity reference.

Article idea: an introduction to Bernard as an engineer, Pan-Africanist,
and builder from Ghana.

Central metaphor: Bernard's halftone portrait emerging from a green
technical blueprint halo, with one warm gold Ghana-inspired sun disc.
Preserve his likeness; do not invent clothes, glasses, or facial traits.

Return only crop, negative space, and palette plan.
```

### Generation prompt

```text
Create a square editorial cover from the approved portrait reference
under the locked style. Preserve Bernard's exact likeness and green
jacket. Add only a restrained cream blueprint halo and one gold sun disc.
No flags, maps, text, slogans, or extra symbols. Square 1600×1600 PNG.
```

## 7. The Object in the Machine

File: `public/article-images/lifeblood-of-git.png`

### Concept prompt

```text
Do not generate. Plan one cover using the locked style.

Article idea: Git history is built from content-addressed blobs, trees,
and commits chained through an immutable object store.

Central metaphor: three distinct objects—a compact cream data stone, a
green branching tree object, and a gold sealed commit object—lock into
one descending immutable chain inside a dark archive.

Return only the object silhouettes, chain direction, and depth plan.
```

### Generation prompt

```text
Generate the approved Git object-chain composition in the locked style.
Make blob, tree, and commit visually distinct without words, letters,
hashes, or Git logos. The gold commit seal should close an immutable
cream-and-green chain. Square 1600×1600 PNG.
```

## 8. LLM Reasoning: From Next-Token Prediction to Constrained Decoding

File: `public/article-images/llm-reasoning-foundations.png`

### Concept prompt

```text
Do not generate. Plan one cover using the locked style.

Article idea: token prediction, hallucination, and constrained decoding
that grounds model output in valid structure.

Central metaphor: cream token tiles flow through a green lattice. Loose
halftone possibilities scatter outward, while gold rails constrain one
clean geometric output path.

Return only the flow composition and how constraint differs from chaos.
```

### Generation prompt

```text
Generate the approved token-lattice composition in the locked style.
Show many plausible cream fragments entering a green reasoning lattice;
gold rails admit one valid structured path while faint alternatives
dissolve outside. No brains, robots, chat bubbles, text, or code. Square
1600×1600 PNG.
```

## 9. Two-Pointer Technique

File: `public/article-images/two-pointer-technique.png`

### Concept prompt

```text
Do not generate. Plan one cover using the locked style.

Article idea: two indices scan one sequence to solve several apparently
different array problems.

Central metaphor: a horizontal row of cream stones with two green
mechanical pointers approaching from opposite ends. Their active meeting
interval forms one gold container shape beneath the row.

Return only the pointer geometry, negative space, and focal hierarchy.
```

### Generation prompt

```text
Generate the approved two-pointer composition in the locked style. Two
distinct green pointers must clearly track one cream sequence, with the
resolved interval highlighted as a gold vessel below. No hands, labels,
array indices, numerals, or code. Square 1600×1600 PNG.
```

## 10. Understanding Generics

File: `public/article-images/understanding-generics.png`

### Concept prompt

```text
Do not generate. Plan one cover using the locked style.

Article idea: reusable abstractions that preserve compile-time type
safety across different concrete types.

Central metaphor: one green precision mold accepts three differently
shaped cream inputs and produces three matching outputs without losing
their shapes. A gold calibration ring represents the preserved contract.

Return only the composition plan and type-safety metaphor test.
```

### Generation prompt

```text
Generate the approved generic-mold composition in the locked style. One
reusable green mechanism must process varied shapes while a gold ring
preserves each shape's identity. Avoid alphabetic type variables, angle
brackets, code, labels, and puzzle-piece clichés. Square 1600×1600 PNG.
```

## 11. What a Struct Actually Is

File: `public/article-images/what-a-struct-actually-is.png`

### Concept prompt

```text
Do not generate. Plan one cover using the locked style.

Article idea: concrete memory layout, field offsets, alignment, padding,
and the hidden cost introduced by virtual dispatch.

Central metaphor: an exploded green memory slab with cream compartments
aligned on a strict grid, visible padding gaps, and one gold hidden
pointer casting a structural shadow behind the block.

Return only the exploded-layout plan and depth hierarchy.
```

### Generation prompt

```text
Generate the approved exploded memory-layout composition in the locked
style. Show aligned compartments and padding through physical spacing;
show the hidden virtual pointer as one gold concealed structural element.
No addresses, byte counts, language logos, text, or code. Square
1600×1600 PNG.
```

## 12. What Is a Polyfill?

File: `public/article-images/what-is-a-polyfill.png`

### Concept prompt

```text
Do not generate. Plan one cover using the locked style.

Article idea: modern JavaScript behavior patched into older runtimes
that lack it.

Central metaphor: an old cream mechanical window frame has one missing
section; a precisely shaped gold patch completes it so a modern green
mechanism can pass through intact.

Return only the repair metaphor, composition, and small-size read.
```

### Generation prompt

```text
Generate the approved runtime-repair composition in the locked style.
The gold patch must visibly complete a missing capability in an older
cream frame, allowing a green modern mechanism through. No browser logos,
JavaScript marks, text, tools with brand shapes, or code. Square
1600×1600 PNG.
```

## 13. What Is a Struct?

File: `public/article-images/what-is-a-struct.png`

### Concept prompt

```text
Do not generate. Plan one cover using the locked style.

Article idea: related values grouped into one composite type with a
predictable memory representation.

Central metaphor: several distinct cream objects—round, narrow, wide—fit
into named-looking but unlabeled compartments inside one sturdy green
container. One gold outer bracket makes the grouping read as a unit.

Return only the anatomy and grouping composition.
```

### Generation prompt

```text
Generate the approved struct-anatomy composition in the locked style.
Different cream field shapes must occupy clear compartments inside one
green composite container, unified by one gold bracket. No labels,
letters, addresses, code, or language logos. Square 1600×1600 PNG.
```

## 14. Why Structs

File: `public/article-images/why-structs.png`

### Concept prompt

```text
Do not generate. Plan one cover using the locked style.

Article idea: structs reduce parameter explosion, gather scattered state,
and stabilize function boundaries in production code.

Central metaphor: many loose cream cables and objects converge into one
green carrying frame; on the far side, a single gold connector crosses a
stable boundary. This cover must feel operational, unlike the anatomical
container used for “What Is a Struct?”.

Return only the consolidation flow and distinction from article 13.
```

### Generation prompt

```text
Generate the approved consolidation composition in the locked style.
Show scattered inputs becoming one durable green unit that crosses a
boundary through one gold connector. Emphasize reduced complexity and
stable interfaces. No labels, parameter names, code, or diagrams copied
from article 13. Square 1600×1600 PNG.
```

---

## Prompt 3 — universal audit after every generation

```text
Do not regenerate or edit yet. Audit this cover against the locked style
and report PASS or FAIL for every item:

1. Exactly square and suitable for 1600×1600 export.
2. Central idea remains legible when viewed at 64×64.
3. Essential content stays inside the central 72% safe zone.
4. Uses only #020817, #1D8660, #F9B310, #F7F3E8, and #17130E.
5. One dominant metaphor, not a collage.
6. Thick ink contours, halftone/cross-hatch, risograph texture.
7. No text, letters, numbers, code, logo, watermark, or UI screenshot.
8. No photorealism, glossy 3D, neon, or generic circuit filler.
9. Gold marks only the focal insight; it does not dominate the canvas.
10. It visibly belongs beside the approved series reference.

For every FAIL, state one precise repair. Do not propose a redesign.
```

## Prompt 4 — universal surgical revision

```text
Edit the existing image only. Preserve the approved central metaphor,
camera, silhouette, object count, and layout. Apply only the failed audit
repairs listed below.

[PASTE FAILED AUDIT ITEMS]

Re-enforce the immutable palette and risograph texture. Do not introduce
new objects, text, labels, logos, code, gradients, or extra detail. Keep
all essential content inside the central 72% and preserve recognition at
64×64. Return a square 1600×1600 PNG.
```

## Batch discipline

Approve one cover before generating the next. Feed the approved cover
back as the style reference. Never generate all 14 in one request: batch
generation optimizes for variety, while this system needs family
resemblance. Change article metaphor only; keep every style-contract word
unchanged.
