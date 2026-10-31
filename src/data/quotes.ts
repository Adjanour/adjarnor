/**
 * The quote archive.
 *
 * Lives in a module (not in a component's frontmatter) so it can be
 * imported by BOTH the server (frontmatter — the SSR floor) and the
 * client script (the per-visitor rotation). Rotation is date-keyed;
 * see DynamicElements.astro.
 */
export const quotes: string[] = [
  "Measure twice, cut once.",
  "Software is a craft, not a commodity.",
  "The most dangerous phrase in engineering is 'it works in my environment.'",
  "Good engineering is about saying no to complexity.",
  "The best code is the code you don't have to write.",
  "Software is never finished, only abandoned.",
  "If you educate a man, you educate an individual. If you educate a woman, you educate a nation.",
  "Technology is best when it brings people together.",
  "Consistency is what transforms average into excellence.",
  "The best tools feel invisible.",
  "Debugging is twice as hard as writing code in the first place.",
  "The illusion of simplicity is the hardest thing to engineer.",
  "Contrary to popular belief, computers are not complicated. People are.",
  "Until the lion learns to write, every story will glorify the hunter.",
  "Make it correct, make it clear, make it concise, make it fast. In that order.",
  "First solve the problem, then write the code.",
  "A well-placed abstraction eliminates an entire class of bugs.",
  "The purpose of abstraction is not to be vague, but to create a new semantic level.",
  "Freedom is not something one people can bestow on another as a gift. They claim it as their own.",
  "Tomorrow belongs to the people who prepare for it today.",
  "Don't repeat yourself. Once is fine, twice is a pattern, three times is refactoring time.",
  "Engineering is not about perfection. It is about trade-offs, and knowing which ones to make.",
  "There is no better than adversity. Every defeat, every heartbreak, every loss, contains its own seed.",
  "Good interfaces hide complexity. Great interfaces make complexity feel like simplicity.",
  "Every line of code is a liability. Make each one earn its keep.",
  "We have the right and duty to remake this world.",
  "Premature optimization is the root of all evil.",
  "A people without the knowledge of their past history, origin and culture is like a tree without roots.",
  "Pull requests are conversations, not verdicts.",
  "I am the master of my fate, I am the captain of my soul.",
]
