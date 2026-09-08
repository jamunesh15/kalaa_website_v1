import type { ArticleBody } from "@/content/types";

/*
 * The articles themselves, keyed by the slug in `blog.ts`.
 *
 * Every one is written from its own cover. The pictures already state the steps,
 * the mistakes and the formats, so taking the outline from the artwork is what
 * stops the words and the picture drifting apart. Nothing here names a client,
 * quotes a person or states a figure.
 *
 * Separate from `blog.ts` so the index stays readable, and shaped so that when a
 * CMS arrives this file becomes a fetch and nothing above it changes.
 */
export const ARTICLE_BODIES: Readonly<Record<string, ArticleBody>> = {
  "how-to-plan-your-social-media-strategy": {
    intro: [
      "Most social media plans come apart early, because they start with what to post rather than what the posting is for.",
      "Four steps, and the order matters. Skip one and the next has nothing to stand on.",
    ],
    sections: [
      {
        id: "set-clear-goals",
        heading: "Set clear goals",
        body: [
          "A goal has to be something you can check later. More enquiries this quarter is a goal. Growing the brand is not, because nobody can tell you at the end of the month whether it happened.",
          "Pick one goal at a time and let it decide everything else. Reach, enquiries and sales want different content, and a page trying to do all three at once usually does none of them well.",
        ],
      },
      {
        id: "know-your-audience",
        heading: "Know your audience",
        body: [
          "Write down who you are talking to before you write anything for them. What they already do, what they are choosing between, and what would make them hesitate.",
          "A lot of what gets called a content problem is an audience problem. The post was fine. It was written for somebody who was never going to buy.",
        ],
        list: [
          "What they already know about your category",
          "Who else they are comparing you against",
          "What they need to see before they trust you",
        ],
      },
      {
        id: "plan-the-content",
        heading: "Plan the content",
        body: [
          "Choose a small set of content pillars and a posting rhythm you can keep. Three pillars posted steadily will beat ten pillars posted in bursts.",
          "Plan a month at a time. It is the shortest window that shows you repetition and the longest one you can hold in your head.",
        ],
      },
      {
        id: "measure-and-improve",
        heading: "Measure and keep improving",
        body: [
          "Read the numbers against the goal you set in the first step, not against your last post. One reel doing well tells you very little. The same format doing well four times is a finding.",
          "Change one thing at a time. Change the hook, the format and the posting time together and the result teaches you nothing.",
        ],
      },
    ],
  },

  "common-social-media-mistakes-brands-make": {
    intro: [
      "Almost none of these are dramatic. They are small habits that quietly cost reach, and they are easy to keep because nothing obviously breaks.",
      "Eight of them, grouped by what they actually cost you.",
    ],
    sections: [
      {
        id: "no-plan",
        heading: "Posting without a plan",
        body: [
          "Posting whatever is to hand on the day produces a page with no shape. A reader scrolling it learns nothing about what you do or who you are for.",
          "Inconsistent posting does the same damage more slowly. A page that goes quiet for three weeks reads as a business that has gone quiet.",
        ],
      },
      {
        id: "all-selling",
        heading: "Making every post an advertisement",
        body: [
          "Only promotional content asks for something every time and offers nothing in between. People stop looking, and the page loses its audience by the day it finally has an offer worth seeing.",
          "Ignoring the replies compounds it. Comments and messages are the cheapest signal you will ever get about what people want to know.",
        ],
      },
      {
        id: "the-craft",
        heading: "Letting the craft slip",
        body: [
          "Poor visuals get judged before the words are read. A dark photograph or a cramped layout says something about the business whether or not it is true.",
          "Hashtags chosen without thought behave the same way. They look like effort and do nothing, because they describe the post rather than the search somebody is making.",
        ],
      },
      {
        id: "no-reading-back",
        heading: "Never reading anything back",
        body: [
          "Not looking at performance means repeating the format that failed and dropping the one that worked, because neither was noticed.",
          "Copying a trend that does not fit the brand is the same mistake in a costume. The trend brought its own audience rather than yours, and the page reads as somebody else's for a week.",
        ],
      },
    ],
  },

  "instagram-content-ideas-for-small-businesses": {
    intro: [
      "A small business rarely runs out of things to say. It runs out of formats, and the fourth photograph of the same product is what a page looks like when that happens.",
      "Five formats that keep an account moving, and none of them need a studio.",
    ],
    sections: [
      {
        id: "behind-the-scenes",
        heading: "Behind the scenes",
        body: [
          "Show the making, the workspace, or an ordinary day. It is the cheapest content you own and the hardest for a competitor to copy, because it is literally yours.",
          "It also does the work of proof. Somebody deciding whether you are real will believe a cluttered workbench before a polished product shot.",
        ],
      },
      {
        id: "product-highlights",
        heading: "Product highlights",
        body: [
          "Take one product and show one thing about it. The detail, the material, the size in a hand. A post about everything a product does is a post about nothing.",
          "Say what it costs or where to get it. A highlight with no next step is a nice picture.",
        ],
      },
      {
        id: "customer-stories",
        heading: "Customer stories",
        body: [
          "A customer describing what worried them before they bought will answer a question you cannot answer yourself without sounding like an advertisement.",
          "Ask while the purchase is fresh, and ask for the specific thing rather than a general compliment.",
        ],
      },
      {
        id: "tips-and-lifestyle",
        heading: "Tips, how-tos and lifestyle",
        body: [
          "Short useful tips are what get saved and sent on, and saves are the signal that keeps a post moving after its first day.",
          "Lifestyle posts do a different job. They show the product where it belongs rather than on a white background, so somebody can picture owning it.",
        ],
      },
    ],
  },

  "video-shooting-ideas-for-small-businesses": {
    intro: [
      "You do not need a crew. Almost everything below is one person, a phone, and enough light from a window.",
      "Six shots you can get this week, and what each one is for.",
    ],
    sections: [
      {
        id: "the-product",
        heading: "The product, close",
        body: [
          "Get near enough that a detail fills the frame, and move slowly. Close work is the thing a still photograph cannot do, so it is the first shot worth learning.",
          "Shoot it twice, once steady and once moving, and keep whichever holds attention longer.",
        ],
      },
      {
        id: "the-making",
        heading: "The making and the packing",
        body: [
          "Packing an order is one of the most watched things a small business posts, and it is the least staged. Start recording before you start packing.",
          "The same is true of anything you make by hand. The interesting part is almost always the step you find boring.",
        ],
      },
      {
        id: "the-day",
        heading: "A day in the life",
        body: [
          "Three or four short clips across one working day, cut together, will tell somebody more about the business than a page of copy.",
          "It works because it is specific. Opening up, the first order, the delivery run.",
        ],
      },
      {
        id: "reactions-and-tips",
        heading: "Reactions and quick tips",
        body: [
          "A customer opening or using the thing is proof you cannot write yourself. Ask before you film, and keep it short.",
          "A quick tip, one idea in fifteen seconds, is the format most likely to be saved. Say the useful thing first and leave the introduction out.",
        ],
      },
    ],
  },

  "marketing-trends-to-watch": {
    intro: [
      "Trends are only worth reading if they change what you do on Monday. These do.",
      "Ten shifts, grouped into the four decisions they affect.",
    ],
    sections: [
      {
        id: "how-people-watch",
        heading: "How people watch",
        body: [
          "Short-form video keeps taking attention from every other format, and it now sets the pace on every platform rather than one.",
          "Immersive formats, including try-ons in augmented reality, are moving from novelty to something a shopper expects in a few categories. Worth watching if you sell anything people want to see on themselves or in a room.",
        ],
      },
      {
        id: "who-people-believe",
        heading: "Who people believe",
        body: [
          "Content made by real users carries further than content about the brand, because it is read as evidence rather than as a claim.",
          "Influence has moved the same way. A smaller account with a specific audience now does more for a specific business than a large one with a general audience.",
          "Community-led growth is the version of this you own. A group of people who talk to each other about your category is worth more than a following that only talks to you.",
        ],
      },
      {
        id: "how-work-gets-made",
        heading: "How the work gets made",
        body: [
          "AI has changed the production step rather than the thinking step. It makes drafts, variants and cutdowns quickly, and it still needs somebody who knows the brand to choose between them.",
          "Personalisation from your own data is the other half. The same offer written for two segments beats one offer written for an average nobody is.",
        ],
      },
      {
        id: "what-people-buy-into",
        heading: "What people buy into",
        body: [
          "Value-first storytelling means the post is useful before it is persuasive. Purpose-driven positioning means the business stands for something a customer can name.",
          "Social commerce closes the gap between the two. When the shop sits inside the app, the distance between being convinced and buying is one tap, and the content has to be ready for that.",
        ],
      },
    ],
  },

  "a-month-of-content-in-five-steps": {
    intro: [
      "This is the rhythm we run on a client account, month after month. It is deliberately unexciting, because the point is that it repeats.",
      "Plan, create, share, analyse, grow.",
    ],
    sections: [
      {
        id: "plan",
        heading: "Plan",
        body: [
          "The month is decided before it starts. The pillars, the dates that matter, and roughly what each post is for. A calendar agreed in advance is what stops the last week of the month becoming filler.",
        ],
      },
      {
        id: "create",
        heading: "Create",
        body: [
          "Shoot and write in batches rather than daily. One shoot covering three weeks costs less time than nine separate afternoons and gives the month a consistent look.",
          "Leave a gap in the plan on purpose. Something will happen in the month worth posting, and a full calendar has nowhere to put it.",
        ],
      },
      {
        id: "share",
        heading: "Share",
        body: [
          "Post on the schedule, at the times the account's own data supports, and reply to what comes back the same day. The replies are part of the work rather than admin left over from it.",
        ],
      },
      {
        id: "analyse-and-grow",
        heading: "Analyse, then grow",
        body: [
          "At the end of the month, read the account against the goal rather than against last month. Look for a format that worked more than once.",
          "Growth is what happens when the next month keeps that format and drops one that did not earn its place. It compounds slowly, and only if the reading actually happens.",
        ],
      },
    ],
  },

  "what-a-small-ad-budget-can-actually-do": {
    intro: [
      "A small budget cannot buy attention at scale. It can buy answers, and early on those are worth more.",
      "Four things a modest budget still does well.",
    ],
    sections: [
      {
        id: "reach-the-right-people",
        heading: "Reach the right people",
        body: [
          "Even a small budget puts the brand in front of people who would never have found the page on their own, and it lets you choose who those people are.",
          "Narrow beats broad here. A small budget spread across everybody buys a little of nothing.",
        ],
      },
      {
        id: "earn-real-engagement",
        heading: "Earn real engagement",
        body: [
          "Good creative gets replies, saves and shares, and those keep working after the spending stops. Weak creative with money behind it reaches more people who ignore it.",
          "This is why the creative comes first. Budget makes a good post travel. It does not fix a bad one.",
        ],
      },
      {
        id: "learn-what-works",
        heading: "Learn what works",
        body: [
          "Running two versions of one idea against each other answers a question you would otherwise argue about for a month.",
          "Test one variable at a time, and keep the loser. Knowing which hook failed is as useful as knowing which one worked.",
        ],
      },
      {
        id: "build-on-it",
        heading: "Build on it",
        body: [
          "Small, steady spending behind the posts that already earn attention on their own compounds. Occasional large spending on untested creative does not.",
          "The point of the first months is not the return. It is arriving at a format you trust, so a bigger budget later has something proven to sit behind.",
        ],
      },
    ],
  },
};
