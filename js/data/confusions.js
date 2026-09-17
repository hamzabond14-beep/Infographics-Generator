/**
 * Lightweight index of word-confusion pages, used to power the
 * on-page search box. Kept separate from the static homepage
 * cards (which stay server-rendered HTML for SEO).
 */
export const CONFUSIONS = [
  {
    terms: ["affect", "effect"],
    keywords: ["affect vs effect", "affect or effect", "affect effect"],
    hint: "Affect is usually a verb (to influence); effect is usually a noun (a result).",
    url: "confusions/affect-vs-effect.html",
  },
  {
    terms: ["their", "there", "they're", "theyre"],
    keywords: ["their there they're", "their vs there", "there vs they're"],
    hint: "Their shows possession, there shows place, they're means \"they are.\"",
    url: "confusions/their-there-theyre.html",
  },
  {
    terms: ["your", "you're", "youre"],
    keywords: ["your vs you're", "your youre", "your you are"],
    hint: "Your shows possession; you're is short for \"you are.\"",
    url: "confusions/your-vs-youre.html",
  },
  {
    terms: ["then", "than"],
    keywords: ["then vs than", "then than"],
    hint: "Then is about time or sequence; than is used for comparisons.",
    url: "confusions/then-vs-than.html",
  },
  {
    terms: ["its", "it's"],
    keywords: ["its vs it's", "its its", "it's or its"],
    hint: "Its shows possession; it's is short for \"it is\" or \"it has.\"",
    url: "confusions/its-vs-its.html",
  },
  {
    terms: ["accept", "except"],
    keywords: ["accept vs except", "accept except"],
    hint: "Accept means to receive or agree to something; except means excluding something.",
    url: "confusions/accept-vs-except.html",
  },
];

/**
 * Finds the best-matching confusion entry for a free-text query.
 * Returns null when nothing matches closely enough.
 */
export function findConfusion(query) {
  const q = query.trim().toLowerCase().replace(/[^a-z' ]/g, "");
  if (!q) return null;

  let best = null;
  let bestScore = 0;

  const STOPWORDS = new Set(["vs", "or", "and", "the", "a", "an", "is", "are", "than"]);

  for (const entry of CONFUSIONS) {
    let score = 0;
    const haystacks = [...entry.terms, ...entry.keywords];
    for (const h of haystacks) {
      const needle = h.toLowerCase();
      if (q === needle) score = Math.max(score, 100);
      else if (q.includes(needle) || needle.includes(q)) score = Math.max(score, 60);
      else if (
        needle
          .split(/[^a-z']+/)
          .some((word) => word.length > 2 && !STOPWORDS.has(word) && q.includes(word))
      ) {
        score = Math.max(score, 30);
      }
    }
    if (score > bestScore) {
      bestScore = score;
      best = entry;
    }
  }

  return bestScore >= 30 ? best : null;
}
