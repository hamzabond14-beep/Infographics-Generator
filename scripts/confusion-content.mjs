/**
 * Content source for the /confusions/*.html detail pages.
 * Run `node scripts/build-confusions.mjs` after editing this file
 * to regenerate the static pages.
 */
export const CONFUSIONS = [
  {
    slug: "affect-vs-effect",
    title: "Affect vs Effect",
    metaDescription:
      "Affect vs effect explained simply: affect is almost always a verb meaning to influence, while effect is almost always a noun meaning a result. Examples and a quick memory trick included.",
    quickAnswer:
      "Affect is (almost always) a verb meaning “to influence.” Effect is (almost always) a noun meaning “a result.” If you can swap in “influence,” use affect. If you can swap in “a result,” use effect.",
    trick: "Remember: A is for Action (affect, the verb). E is for End result (effect, the noun).",
    sections: [
      {
        heading: "Affect (verb): to influence or change something",
        body: "Use <strong>affect</strong> when you mean that one thing is changing or influencing another. It's the action.",
        examples: [
          { good: "The weather can affect your mood.", bad: "The weather can effect your mood." },
          { good: "Lack of sleep affects concentration.", bad: "Lack of sleep effects concentration." },
        ],
      },
      {
        heading: "Effect (noun): a result or outcome",
        body: "Use <strong>effect</strong> when you're talking about the result of an action — the thing that happened because of something else.",
        examples: [
          { good: "The new policy had a positive effect on sales.", bad: "The new policy had a positive affect on sales." },
          { good: "One effect of the storm was flooding.", bad: "One affect of the storm was flooding." },
        ],
      },
      {
        heading: "The rare exception",
        body: "Occasionally <strong>effect</strong> is used as a verb meaning “to bring about” (e.g., “to effect change”), and <strong>affect</strong> can be a noun in psychology meaning an observed emotion. In everyday writing, though, the affect = verb, effect = noun rule holds almost every time.",
        examples: [],
      },
    ],
    relatedSlugs: ["then-vs-than", "accept-vs-except"],
  },
  {
    slug: "their-there-theyre",
    title: "Their vs There vs They're",
    metaDescription:
      "Their, there, and they're explained clearly: their shows possession, there refers to a place, and they're is short for “they are.” Simple rules and examples for each.",
    quickAnswer:
      "Their shows ownership (“their car”). There refers to a place or existence (“over there,” “there is”). They're is a contraction of “they are.”",
    trick: "If you can replace the word with “they are” and the sentence still works, it's they're. If you're pointing somewhere, it's there (notice “there” contains “here”). Otherwise, it's probably their.",
    sections: [
      {
        heading: "Their: shows possession",
        body: "Use <strong>their</strong> when something belongs to a group of people or things.",
        examples: [
          { good: "The students left their books on the desk.", bad: "The students left there books on the desk." },
          { good: "That's their decision to make.", bad: "That's they're decision to make." },
        ],
      },
      {
        heading: "There: refers to a place or introduces a statement",
        body: "Use <strong>there</strong> to point to a location, or to introduce that something exists (“there is,” “there are”).",
        examples: [
          { good: "Put the box over there.", bad: "Put the box over their." },
          { good: "There are three options available.", bad: "Their are three options available." },
        ],
      },
      {
        heading: "They're: short for “they are”",
        body: "Use <strong>they're</strong> only when you could substitute “they are” without changing the meaning.",
        examples: [
          { good: "They're coming over for dinner tonight.", bad: "There coming over for dinner tonight." },
          { good: "I think they're right about this.", bad: "I think their right about this." },
        ],
      },
    ],
    relatedSlugs: ["your-vs-youre", "its-vs-its"],
  },
  {
    slug: "your-vs-youre",
    title: "Your vs You're",
    metaDescription:
      "Your vs you're made simple: your shows possession, you're is short for “you are.” Learn the one-second test to always choose the right one.",
    quickAnswer:
      "Your shows that something belongs to you (“your phone”). You're is a contraction of “you are” (“you're late”).",
    trick: "Say the sentence with “you are” instead. If it still makes sense, use you're. If not, use your.",
    sections: [
      {
        heading: "Your: shows possession",
        body: "Use <strong>your</strong> when referring to something that belongs to the person you're speaking to.",
        examples: [
          { good: "Is this your umbrella?", bad: "Is this you're umbrella?" },
          { good: "Your presentation was excellent.", bad: "You're presentation was excellent." },
        ],
      },
      {
        heading: "You're: short for “you are”",
        body: "Use <strong>you're</strong> whenever you mean “you are,” and nothing else.",
        examples: [
          { good: "You're going to love this.", bad: "Your going to love this." },
          { good: "Let me know when you're ready.", bad: "Let me know when your ready." },
        ],
      },
      {
        heading: "A quick self-check",
        body: "Before hitting send, scan for every “your” or “you're” in your message and mentally expand it to “you are.” If it sounds wrong, you've found your fix.",
        examples: [],
      },
    ],
    relatedSlugs: ["their-there-theyre", "its-vs-its"],
  },
  {
    slug: "then-vs-than",
    title: "Then vs Than",
    metaDescription:
      "Then vs than explained: then relates to time and sequence, than is used for comparisons. Clear examples and a memory trick to keep them straight.",
    quickAnswer:
      "Then is about time or what happens next (“first this, then that”). Than is used to compare two things (“better than,” “more than”).",
    trick: "Than has an “a”, like “compArison.” Then has an “e”, like “sequEnce” or “timE”.",
    sections: [
      {
        heading: "Then: time, sequence, or consequence",
        body: "Use <strong>then</strong> to show when something happens or what comes next in a sequence.",
        examples: [
          { good: "We had dinner, then watched a movie.", bad: "We had dinner, than watched a movie." },
          { good: "If it rains, then we'll stay inside.", bad: "If it rains, than we'll stay inside." },
        ],
      },
      {
        heading: "Than: comparisons",
        body: "Use <strong>than</strong> only when you are comparing two or more things.",
        examples: [
          { good: "This book is better than the last one.", bad: "This book is better then the last one." },
          { good: "She runs faster than I do.", bad: "She runs faster then I do." },
        ],
      },
      {
        heading: "Side by side",
        body: "If no comparison is happening, you almost certainly want <strong>then</strong>. If two things are being weighed against each other, you want <strong>than</strong>.",
        examples: [],
      },
    ],
    relatedSlugs: ["affect-vs-effect", "accept-vs-except"],
  },
  {
    slug: "its-vs-its",
    title: "Its vs It's",
    metaDescription:
      "Its vs it's, the shortest rule in English grammar: its shows possession, it's is short for “it is” or “it has.” See examples of each.",
    quickAnswer:
      "Its shows that something belongs to “it” (no apostrophe). It's is a contraction of “it is” or “it has” (always with an apostrophe).",
    trick: "Expand it: “it's” always means “it is” or “it has.” If that swap doesn't work, drop the apostrophe and use its.",
    sections: [
      {
        heading: "Its: shows possession",
        body: "Use <strong>its</strong> (no apostrophe) when something belongs to “it” — an object, animal, or idea.",
        examples: [
          { good: "The company updated its logo.", bad: "The company updated it's logo." },
          { good: "The dog wagged its tail.", bad: "The dog wagged it's tail." },
        ],
      },
      {
        heading: "It's: short for “it is” or “it has”",
        body: "Use <strong>it's</strong> (with an apostrophe) only when you mean “it is” or “it has.”",
        examples: [
          { good: "It's raining again.", bad: "Its raining again." },
          { good: "It's been a long week.", bad: "Its been a long week." },
        ],
      },
      {
        heading: "Why this one trips people up",
        body: "Normally an apostrophe + s shows possession (“Sarah's book”). Its is the exception — possessive pronouns like his, hers, and its never take an apostrophe.",
        examples: [],
      },
    ],
    relatedSlugs: ["your-vs-youre", "their-there-theyre"],
  },
  {
    slug: "accept-vs-except",
    title: "Accept vs Except",
    metaDescription:
      "Accept vs except explained: accept means to receive or agree to something, except means excluding something. Learn the difference with clear examples.",
    quickAnswer:
      "Accept means to receive, agree to, or approve of something. Except means excluding or leaving something out.",
    trick: "Accept starts like “access” — letting something in. Except starts like “exclude” — leaving something out.",
    sections: [
      {
        heading: "Accept: to receive or agree to",
        body: "Use <strong>accept</strong> when someone agrees to, receives, or approves of something.",
        examples: [
          { good: "She decided to accept the job offer.", bad: "She decided to except the job offer." },
          { good: "We accept all major credit cards.", bad: "We except all major credit cards." },
        ],
      },
      {
        heading: "Except: excluding something",
        body: "Use <strong>except</strong> when you're leaving something out of a group or statement.",
        examples: [
          { good: "Everyone came to the party except Sam.", bad: "Everyone came to the party accept Sam." },
          { good: "The store is open every day except Sunday.", bad: "The store is open every day accept Sunday." },
        ],
      },
      {
        heading: "A helpful contrast",
        body: "Accept is about inclusion — letting something in. Except is about exclusion — leaving something out. Thinking of them as opposites makes the choice easy.",
        examples: [],
      },
    ],
    relatedSlugs: ["affect-vs-effect", "then-vs-than"],
  },
];
