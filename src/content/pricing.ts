import type { BillingTerm, Plan } from "@/content/types";

/*
 * Kalaa's packages, exactly as the client supplied them.
 *
 * Only `monthly` is stored. What a quarter costs, what a year costs and the
 * struck figure beside each are all derived from it by `priceFor` below, so a
 * plan cannot end up advertising a discount its own numbers do not support.
 */
export const PLANS: readonly Plan[] = [
  {
    slug: "basic-kickstart",
    name: "Basic Kickstart",
    monthly: 30000,
    summary: "For a business putting its first consistent month of work out.",
    reelsPerMonth: 10,
    shoots: 1,
    includes: [
      "Social media management across 3 platforms",
      "Content planning and strategy",
      "Influencer marketing",
      "Meta ads",
      "Monthly performance report",
    ],
    icon: "rocket",
    cta: "Start with Kickstart",
    featured: false,
  },
  {
    slug: "advanced-growth",
    name: "Advanced Growth",
    monthly: 40000,
    summary: "For a brand with a page that works and a reason to push it harder.",
    reelsPerMonth: 15,
    shoots: 2,
    includes: [
      "Social media management across 3 platforms",
      "Content planning and strategy",
      "Influencer marketing",
      "Meta ads",
      "Monthly performance report",
    ],
    icon: "chart",
    cta: "Start with Growth",
    featured: true,
  },
  {
    slug: "premium-impact",
    name: "Premium Impact",
    monthly: 60000,
    summary: "For a brand shooting every week and buying reach behind all of it.",
    reelsPerMonth: 30,
    shoots: 4,
    includes: [
      "Social media management across 3 platforms",
      "Content planning and strategy",
      "Influencer marketing",
      "Meta ads",
      "Priority support",
      "Monthly performance report",
    ],
    icon: "team",
    cta: "Start with Premium",
    featured: false,
  },
];

/*
 * The three lengths a visitor can buy.
 *
 * `paidMonths` is what they pay for, `months` is what they get. Nothing states a
 * percentage: the struck figure is the months they get at the monthly rate and
 * the price is the months they pay for, so the saving is arithmetic the reader
 * can check rather than a claim they have to take on trust.
 */
export const BILLING_TERMS: readonly BillingTerm[] = [
  {
    key: "monthly",
    label: "Monthly",
    paidMonths: 1,
    months: 1,
    period: "/month",
    monthsLabel: "1",
    offer: "",
  },
  {
    key: "quarterly",
    label: "Quarterly",
    paidMonths: 2,
    months: 3,
    period: "/quarter",
    monthsLabel: "2+1",
    offer: "Pay for 2 months, the third is free",
  },
  {
    key: "annual",
    label: "Annual",
    paidMonths: 6,
    months: 12,
    period: "/year",
    monthsLabel: "6+6",
    offer: "Pay for 6 months, 6 months are free",
  },
];

/** What a plan costs on a term, and what those months would cost month by month. */
export function priceFor(plan: Plan, term: BillingTerm) {
  return {
    pay: plan.monthly * term.paidMonths,
    /** The struck figure. Equal to `pay` on the monthly term, where nothing is saved. */
    usual: plan.monthly * term.months,
  };
}

/*
 * Rupees, grouped the Indian way: 1,80,000 rather than 180,000.
 *
 * `en-IN` is what puts the separator after the first three digits and every two
 * after that, and getting it from the platform rather than writing the grouping
 * by hand is the difference between a figure that reads as local and one that
 * reads as converted.
 */
const RUPEES = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

export function formatRupees(amount: number) {
  return RUPEES.format(amount);
}

/** The line that applies to every plan. The client's words, under every button. */
export const PLAN_OFFER = "Feedspace's $49 Plan for Free";
