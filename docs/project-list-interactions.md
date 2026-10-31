# Project list interactions

Why project titles stay visually stable, and what qualifies as an
honest hover state.

## Underline is a contract

An underline is not neutral decoration on the web. It says **this text
is a link**. The old desktop project hover underlined `.project-title`,
but the title was a plain `<h3>`; only the explicit Source and Live Demo
controls were anchors. The hover therefore advertised an action that
did not exist.

The fix is subtraction: project titles no longer change on row hover,
and the row itself performs no hover theater. Only real links react:
their color strengthens and their external-link arrow enters. Keyboard
focus gets the same clear boundary through `:focus-visible`.

## What Kelvin Amoaba's project list teaches

[kelvinamoaba.com](https://kelvinamoaba.com/) uses underlined project
names correctly because each name is the outbound anchor. The useful
lesson is not “copy the underline”; it is **make appearance agree with
semantics**.

Other transferable ideas:

- **Editorial list over dashboard chrome.** Projects read as authored
  work, not interchangeable admin cards.
- **Outcome before implementation.** “Used by 11,000 people” explains
  importance faster than a stack label. Add real outcomes when we have
  them; never invent metrics.
- **Progressive disclosure when depth exists.** Kelvin's native
  `<details>` summaries work because the expanded copy adds substantial
  information. Our short/full descriptions currently overlap too much,
  so disclosure would add interaction without adding value.
- **Limit when volume requires it.** “Show more” helps a 13-project list;
  it would only hide useful work in our 5-project list.

## Current division by input mode

- **Desktop:** calm rows, stable titles, explicit Source/Live controls.
- **Mobile:** cards remain because swipe/pagination is a space decision,
  not a decorative one. Pagination dots look 6px wide but their actual
  button targets are 44×44px—Kelvin's “small visual, large hit area”
  pattern adapted for touch.
- **Motion:** arrow transitions are suppressed under
  `prefers-reduced-motion`.

The governing test: if an element reacts like a control, it must be a
control. If it is content, let it remain content.
