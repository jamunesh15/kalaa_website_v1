import type { Problem } from "@/content/types";

/**
 * The things a business owner already knows are wrong.
 *
 * This section exists to make the services list land. A service list read cold
 * is a menu; the same list read after somebody has recognised their own problem
 * is a solution. So every line here is written as the owner would say it out
 * loud, not as an agency would describe it.
 *
 * Deliberately NOT "why you need social media". A business owner in 2026
 * already knows they need it, and every agency site on the internet has that
 * section saying the same four things: visibility, engagement, trust, growth.
 * This one is about them rather than about the industry.
 *
 * These lines also earn their place for search. They are close to how people
 * actually type and ask, which is what an answer engine can quote.
 *
 * Nothing here claims a number, a client or a result.
 */
export const PROBLEMS: readonly Problem[] = [
  {
    slug: "when-you-remember",
    title: "You post when you remember",
    summary:
      "Three posts in a week, then nothing for a month. The account goes quiet exactly when somebody is checking whether you are still open.",
    image: "/placeholder/problem-1.jpg",
  },
  {
    slug: "competitor-looks-better",
    title: "Their page looks better than yours",
    summary:
      "The shop down the road is not better at what they do. They are better at being seen doing it, and that is the whole difference.",
    image: "/placeholder/problem-2.jpg",
  },
  {
    slug: "boosted-once",
    title: "You boosted a post once and nothing happened",
    summary:
      "Money went out, a number went up, and no one walked in. Boosting is not advertising, and nobody explained the difference.",
    image: "/placeholder/problem-3.jpg",
  },
  {
    slug: "no-idea-what-worked",
    title: "You have no idea what actually worked",
    summary:
      "Somebody sends a report full of reach and impressions. What you wanted to know was how many people got in touch.",
    image: "/placeholder/problem-4.jpg",
  },
];
