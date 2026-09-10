"use client";

import Image from "next/image";
import type { ReactNode, SVGProps } from "react";
import { motion } from "motion/react";
import { useNarrowViewport } from "@/motion/useNarrowViewport";
import { OffscreenPause } from "@/motion/OffscreenPause";
import { useReplayOnScrollDown } from "@/motion/useReplayOnScrollDown";
import { Card, type CardFill } from "@/components/ui/Card";
import { ProofPeek } from "@/components/ui/ProofPeek";
import { proofForService } from "@/content/proof";
import type { Service } from "@/content/types";

const portfolioImages = [
  {
    src: "/servie_page_photo/webp/01.webp",
    alt: "Website design for a property brand",
    width: 720,
    height: 900,
  },
  {
    src: "/servie_page_photo/webp/02.webp",
    alt: "Website design for a hospitality brand",
    width: 720,
    height: 900,
  },
  {
    src: "/servie_page_photo/webp/03.webp",
    alt: "Jewellery website design",
    width: 720,
    height: 900,
  },
  {
    src: "/servie_page_photo/webp/04.webp",
    alt: "Brand website with product sections",
    width: 720,
    height: 900,
  },
  {
    src: "/servie_page_photo/webp/05.webp",
    alt: "Product website design with green plants",
    width: 720,
    height: 900,
  },
  {
    src: "/servie_page_photo/webp/06.webp",
    alt: "Beauty brand website design",
    width: 720,
    height: 900,
  },
  {
    src: "/servie_page_photo/webp/07.webp",
    alt: "Local service website design",
    width: 720,
    height: 900,
  },
  {
    src: "/servie_page_photo/webp/08.webp",
    alt: "Food product campaign website design",
    width: 682,
    height: 851,
  },
];

const CARD_POSITIONS = [
  "lg:col-start-1 lg:row-start-1 lg:justify-self-end",
  "lg:col-start-3 lg:row-start-1 lg:mt-4 lg:justify-self-start",
  "lg:col-start-1 lg:row-start-2 lg:mt-2 lg:mr-8 lg:justify-self-end",
  "lg:col-start-3 lg:row-start-2 lg:mt-6 lg:ml-8 lg:justify-self-start",
  "lg:col-start-1 lg:row-start-3 lg:mt-2 lg:justify-self-end",
  "lg:col-start-3 lg:row-start-3 lg:mt-6 lg:justify-self-start",
];

const CARD_FILLS: readonly CardFill[] = [
  "surface",
  "butter",
  "peach",
  "violet",
  "sage",
  "cloud",
];

const ICON_BADGES = [
  "bg-tint-violet",
  "bg-surface",
  "bg-tint-sage",
  "bg-surface",
  "bg-tint-butter",
  "bg-tint-peach",
] as const;

type ServiceIcon = (props: SVGProps<SVGSVGElement>) => ReactNode;

const SERVICE_ICONS: Record<string, ServiceIcon> = {
  "social-media-management": SocialIcon,
  "campaign-management": CampaignIcon,
  "content-creation": ContentIcon,
  "website-and-software-development": DevelopmentIcon,
  "business-growth-strategy": GrowthIcon,
  "brand-strategy-and-design": BrandIcon,
};

export function ServiceShowcase({
  services,
}: {
  services: readonly Service[];
}) {
  return (
    /*
     * Three bands, not two.
     *
     * At `lg` the composition is the real one: a column of cards, the work in
     * the middle, a column of cards. It needs two 23rem cards plus a 23rem rail
     * and does not fit below 1024.
     *
     * From `md` to `lg` the cards go TWO ACROSS with the work below them. A
     * tablet is 758px of content and a single column spends all of it on one
     * 758px card, so a reader met one service per screen and scrolled past a
     * band of empty page between each. Two across is 365px a card, which is the
     * width the card was drawn at.
     *
     * Below `md` it stacks, because two 340px columns on a phone is not two
     * columns, it is two half-legible ones.
     */
    <div className="service-showcase relative isolate mt-10 grid gap-7 md:grid-cols-2 md:gap-6 lg:mt-12 lg:grid-cols-[minmax(17rem,1fr)_minmax(23rem,28rem)_minmax(17rem,1fr)] lg:grid-rows-[auto_auto_auto] lg:items-stretch lg:gap-x-5 lg:gap-y-4">
      <PortfolioStack />

      {services.map((service, index) => (
        <ServiceCard key={service.slug} service={service} index={index} />
      ))}
    </div>
  );
}

/* One service, arriving from the side it sits on. */
function ServiceCard({ service, index }: { service: Service; index: number }) {
  const Icon = SERVICE_ICONS[service.slug] ?? BrandIcon;
  const fromLeft = index % 2 === 0;
  const narrow = useNarrowViewport();
  const { shown, handlers } = useReplayOnScrollDown();

  /*
   * The client's message about this service, where one exists.
   *
   * It opens INWARD, toward the middle of the band, because the section clips
   * its own overflow and a panel opening outward from the left column would be
   * cut in half by the page edge. Odd cards sit in the right column.
   */
  const proof = proofForService(service.slug);

  /* How far the card starts from home. */
  const travel = narrow ? "28%" : "52%";
  const offstage = { x: fromLeft ? `-${travel}` : travel, opacity: 0 };

  return (
    <motion.article
      {...handlers}
      /* A fifth of the card, not a third. */
      viewport={{ amount: 0.2 }}
      initial={offstage}
      animate={shown ? { x: 0, opacity: 1 } : offstage}
      /* The curve matters more than the duration. */
      transition={{
        duration: narrow ? 0.6 : 1,
        ease: [0.45, 0, 0.2, 1],
        delay: fromLeft || narrow ? 0 : 0.12,
      }}
      className={`group relative mx-auto w-full max-w-[23rem] min-w-0 lg:mx-0 lg:max-w-[22.5rem] ${CARD_POSITIONS[index] ?? ""}`}
      tabIndex={proof ? 0 : undefined}
    >
      <Card
        fill={CARD_FILLS[index % CARD_FILLS.length]}
        padding="p-5 sm:p-6"
        className="service-reference-card flex min-h-[13.5rem] flex-col"
      >
        <div className="flex min-w-0 items-start gap-4">
          <span
            className={`grid size-12 shrink-0 place-items-center rounded-token ${ICON_BADGES[index % ICON_BADGES.length]} text-ink shadow-soft`}
          >
            <Icon aria-hidden="true" className="size-6" />
          </span>
          <h3 className="min-w-0 font-display text-[1.45rem] font-bold leading-tight text-ink sm:text-display-m">
            {service.title}
          </h3>
        </div>
        <p className="mt-4 text-body text-ink-body">{service.summary}</p>
        {/* One line, and written to be one rather than trimmed into one. */}
        <p className="mt-auto pt-5 text-small font-semibold text-ink-body">
          {service.tagline}
        </p>
      </Card>

      {proof ? <ProofPeek proof={proof} side={index % 2 === 0 ? "right" : "left"} /> : null}
    </motion.article>
  );
}

function PortfolioStack() {
  const topRow = portfolioImages.slice(0, 4);
  const bottomRow = portfolioImages.slice(4);
  const narrow = useNarrowViewport();
  const { shown, handlers } = useReplayOnScrollDown();

  return (
    <motion.div
      {...handlers}
      /* A fixed 60px of the stack, not a fraction of it. */
      viewport={{ amount: "some", margin: "0px 0px -60px 0px" }}
      initial={{ opacity: 0, y: 28, scale: 0.97 }}
      animate={
        shown
          ? { opacity: 1, y: 0, scale: 1 }
          : { opacity: 0, y: 28, scale: 0.97 }
      }
      transition={{ duration: narrow ? 0.7 : 0.9, ease: [0.22, 1, 0.36, 1] }}
      className="relative order-last h-[30rem] min-w-0 overflow-hidden sm:h-[36rem] md:col-span-2 lg:order-none lg:col-span-1 lg:col-start-2 lg:row-span-3 lg:row-start-1 lg:my-6 lg:h-auto lg:min-h-0"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-14 bg-linear-to-b from-tint-cloud to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-14 bg-linear-to-t from-tint-cloud to-transparent" />
      {/* Both rails run `infinite`. Off screen they should not run at all. */}
      <OffscreenPause className="absolute inset-0 grid grid-cols-2 gap-3 overflow-hidden px-1 py-1">
        <ImageRail images={topRow} className="portfolio-rail-up" />
        <ImageRail images={bottomRow} className="portfolio-rail-down" />
      </OffscreenPause>
    </motion.div>
  );
}

function ImageRail({
  images,
  className,
}: {
  images: typeof portfolioImages;
  className: string;
}) {
  return (
    <div className="min-w-0 overflow-hidden">
      <ul className={`grid gap-4 ${className}`}>
        {[...images, ...images].map((image, index) => (
          <li
            key={`${image.src}-${index}`}
            aria-hidden={index >= images.length || undefined}
            className="overflow-hidden rounded-token bg-surface shadow-soft"
          >
            <Image
              src={image.src}
              alt={index >= images.length ? "" : image.alt}
              width={image.width}
              height={image.height}
              sizes="(max-width: 1024px) 42vw, 310px"
              className="aspect-[4/5] h-auto w-full object-cover"
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

function SocialIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect x="4" y="5" width="16" height="12" rx="2.5" />
      <path d="M8 9h8M8 13h5M9 17l-2.5 2.5V17" />
    </svg>
  );
}

function CampaignIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M5 13h3l8 4V7l-8 4H5z" />
      <path d="M8 13l1.5 5h3M18 10.5l2-1.5M18 13.5l2 1.5" />
    </svg>
  );
}

function ContentIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect x="4" y="5" width="16" height="14" rx="2.5" />
      <path d="M10 9.5v5l4-2.5zM7 19l2-3M17 19l-2-3" />
    </svg>
  );
}

function DevelopmentIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect x="4" y="5" width="16" height="14" rx="2.5" />
      <path d="M8.5 13l-2-2 2-2M15.5 9l2 2-2 2M13 8l-2 6" />
    </svg>
  );
}

function GrowthIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M4 18h16M6 15l4-4 3 3 5-7" />
      <path d="M15 7h3v3" />
    </svg>
  );
}

function BrandIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M5 19l4.5-1 8.8-8.8a2.1 2.1 0 0 0 0-3l-.5-.5a2.1 2.1 0 0 0-3 0L6 14.5z" />
      <path d="M13.5 7l3.5 3.5M6 14.5L9.5 18" />
    </svg>
  );
}
