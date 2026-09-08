import type { Service } from "@/content/types";

/*
 * What Kalaa sells, in the order a business meets it.
 *
 * `summary` is the pitch and runs on the home page. `detail` and `delivers` are
 * the method and the handover, and run on the services page only. All of it
 * lives here rather than split across two files, which is what stops the two
 * pages describing one service differently.
 *
 * Social media leads, at his instruction on 2026-09-08: technology is what Kalaa
 * is positioned as and social media is what it is known for, and the order of
 * this list is where a reader learns which is which.
 *
 * **`detail` says how the work runs. `delivers` says what lands.** They are kept
 * apart on purpose. The first draft had both saying the same thing in different
 * words, so a reader met "a plan you approve before anything is made" twice in
 * one band, once as prose and once as a tick.
 *
 * **Keep `detail` to two sentences and `delivers` to four lines.** On the
 * services page the picture sets the height of the band and the copy has to fit
 * inside it. Longer copy makes the column outrun the image, which is the one
 * thing he asked never to happen.
 */
export const SERVICES: readonly Service[] = [
  {
    slug: "social-media-management",
    title: "Social Media Management",
    summary:
      "We plan, write, design, and schedule posts so your page stays active and your brand feels consistent.",
    includes: ["Monthly content plan", "Posts and stories", "Captions", "Scheduling"],
    tagline: "Content plan, posts, scheduling",
    detail:
      "Every month starts with a plan you approve before anything is made. You see it laid out before it runs rather than after.",
    delivers: [
      "A content calendar for the month, mapped day by day",
      "Posts and stories designed and written for your page",
      "Captions written for each post rather than repeated",
      "Everything scheduled ahead, so nothing waits on a free afternoon",
    ],
    image: "ms1",
    alt: "A monthly plan calendar with coloured notes marking plan content, shoot day, edit videos, post, engage and analyse, beside a phone showing a profile grid",
  },
  {
    slug: "campaign-management",
    title: "Campaign Management",
    summary:
      "We manage paid campaigns across Meta and Google, with creative, setup, testing, and reporting kept together.",
    includes: ["Meta ads", "Google ads", "Creative testing", "Reports"],
    tagline: "Meta ads, Google ads, reporting",
    detail:
      "Creative and setup are built together rather than handed between people. Two versions run against each other instead of one going live and being left alone.",
    delivers: [
      "Campaigns set up and managed across Meta and Google",
      "Ad creative made for the campaign, not reused from posts",
      "Audiences built, and warm viewers followed up with",
      "A monthly report naming what ran and what it returned",
    ],
    image: "ms2",
    alt: "Two printed advertisement cards, one circled in coral marker, beside a folded card reading Testing",
  },
  {
    slug: "content-creation",
    title: "Content Creation",
    summary:
      "We create reels, posts, stories, scripts, captions, and shoot plans built around how people actually scroll.",
    includes: ["Reels", "Posts", "Stories", "Shoot planning"],
    tagline: "Reels, posts, shoot planning",
    detail:
      "Reels are planned as shots before a camera comes out: what is wide, what is close, and what the last frame has to say. Shoot days are grouped so one session covers a month.",
    delivers: [
      "Reels, posts and stories shot for the things you sell",
      "A shoot plan agreed before the day, so nothing is improvised",
      "Editing, covers and on screen text finished for you",
      "Files delivered in the sizes each platform wants",
    ],
    image: "ms3",
    alt: "A phone on a tripod filming a ceramic vase, beside a storyboard of three frames marked wide shot, close up and final shot",
  },
  {
    slug: "website-and-software-development",
    title: "Website and Software Development",
    summary:
      "We build websites, landing pages, lead forms, and business software so attention has a place to convert.",
    includes: ["Websites", "Landing pages", "Lead forms", "Custom software"],
    tagline: "Websites, landing pages, forms",
    detail:
      "The site is mapped page by page before a screen is designed, so the structure follows how people buy from you. It is what gives attention from social somewhere to land instead of stopping at a profile.",
    delivers: [
      "A website built to be found, not only to look right",
      "Landing pages made for one campaign rather than everything",
      "Lead forms that send enquiries where your team will see them",
      "Custom software when an off the shelf tool will not do",
    ],
    image: "ms4",
    alt: "A laptop showing a Kalaa web page beside a hand drawn site map linking home to about, services, blog and contact",
  },
  {
    slug: "business-growth-strategy",
    title: "Business Growth Strategy",
    summary:
      "We help shape offers, campaigns, and next steps so marketing supports the way your business needs to grow.",
    includes: ["Offer planning", "Campaign direction", "Sales flow", "Growth roadmap"],
    tagline: "Offers, campaigns, sales flow",
    detail:
      "The month is planned against the whole path rather than the top of it: who the offer is for, what makes them trust it, and what happens after somebody enquires.",
    delivers: [
      "The offer shaped so it is worth enquiring about",
      "The audience named, so the spend reaches the right people",
      "The steps from first view to enquiry written down",
      "A roadmap for the months after this one",
    ],
    image: "ms5",
    alt: "A hand drawn marketing funnel with stages for awareness, interest, consideration and conversion, and notes reading right audience, consistent content and real results",
  },
  {
    slug: "brand-strategy-and-design",
    title: "Brand Strategy and Design",
    summary:
      "We refine your visual identity, messaging, and content style so people recognise you across every touchpoint.",
    includes: ["Brand identity", "Messaging", "Design system", "Creative direction"],
    tagline: "Identity, messaging, design",
    detail:
      "Colour, type, tone and layout are decided once and written down, so a post, an advert and a page all read as the same business. A brand recognised mid scroll costs less to advertise than one met fresh every time.",
    delivers: [
      "A visual identity documented rather than remembered",
      "Colour, type and layout fixed so everything matches",
      "Messaging that says the same thing in every place",
      "Creative direction your own team can follow",
    ],
    image: "ms6",
    alt: "A brand board showing the Kalaa mark, a colour palette in sage, sand, butter and coral, a type specimen and fabric and paper swatches",
  },
];
