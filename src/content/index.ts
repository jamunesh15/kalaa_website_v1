import { ABOUT_PILLARS } from "@/content/about";
import { ARTICLE_BODIES } from "@/content/articles";
import { ARTICLES } from "@/content/blog";
import type { AboutPillar } from "@/content/about";
import { CAPABILITIES } from "@/content/capabilities";
import { CHANNELS, SOCIALS, STUDIO } from "@/content/contact";
import type { ContactChannel, SocialProfile } from "@/content/contact";
import { CLIENT_LOGOS } from "@/content/clientLogos";
import { FAQ_ITEMS } from "@/content/faq";
import { PLAN_OFFER, PLANS } from "@/content/pricing";
import { PROBLEMS } from "@/content/problems";
import { PROCESS_STEPS } from "@/content/process";
import { SERVICES } from "@/content/services";
import { POSTS, REELS } from "@/content/work";
import type {
  Article,
  FullArticle,
  Capability,
  ClientLogo,
  FaqItem,
  Plan,
  Problem,
  ProcessStep,
  Service,
  WorkPiece,
} from "@/content/types";

/* The only way a page gets content. */

export function getServices(): readonly Service[] {
  return SERVICES;
}

export function getCapabilities(): readonly Capability[] {
  return CAPABILITIES;
}

export function getClientLogos(): readonly ClientLogo[] {
  return CLIENT_LOGOS;
}

export function getService(slug: string): Service | undefined {
  return SERVICES.find((service) => service.slug === slug);
}

export function getProcessSteps(): readonly ProcessStep[] {
  return PROCESS_STEPS;
}

/** The questions on the home page, and the source of its `FAQPage` markup. */
export function getFaqItems(): readonly FaqItem[] {
  return FAQ_ITEMS;
}

export function getProblems(): readonly Problem[] {
  return PROBLEMS;
}

/** The blog, newest first. */
export function getArticles(): readonly Article[] {
  return ARTICLES;
}

/**
 * One article with its body, or nothing.
 *
 * Nothing rather than a throw: the page turns it into a 404, which is the honest
 * answer for a slug that does not exist and the only one a crawler can act on.
 */
export function getArticle(slug: string): FullArticle | undefined {
  const article = ARTICLES.find((entry) => entry.slug === slug);
  const body = ARTICLE_BODIES[slug];
  return article && body ? { ...article, ...body } : undefined;
}

/** The other articles, for the row at the foot of one. */
export function getOtherArticles(slug: string, count = 3): readonly Article[] {
  return ARTICLES.filter((entry) => entry.slug !== slug).slice(0, count);
}

/** The reels, in the order they are shown on the work wall. */
export function getReels(): readonly WorkPiece[] {
  return REELS;
}

/** The posts, in the order they are shown on the work wall. */
export function getPosts(): readonly WorkPiece[] {
  return POSTS;
}

export function getPlans(): readonly Plan[] {
  return PLANS;
}

/** The offer line that applies to every plan, so the section states it once. */
export function getPlanOffer(): string {
  return PLAN_OFFER;
}

/** The four beats of the work, as the about board sets them out. */
export function getAboutPillars(): readonly AboutPillar[] {
  return ABOUT_PILLARS;
}

/* The ways in: email, phone and WhatsApp, from `contact.ts`. */
export function getChannels(): readonly ContactChannel[] {
  return CHANNELS;
}

/** The office address and the pin that goes with it. */
export function getStudio(): typeof STUDIO {
  return STUDIO;
}

/** Kalaa's own social profiles. Empty until a real URL exists for one. */
export function getSocials(): readonly SocialProfile[] {
  return SOCIALS;
}
