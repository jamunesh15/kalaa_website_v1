import Image from "next/image";
import { SITE } from "@/site";

/* Kalaa's mark, defined once. */
export function BrandMark({
  className = "h-7 w-auto",
  priority = false,
  /** The masthead's mark names the link to home. The footer's sits beside the
   *  name in text, so a second announcement of it is noise. */
  decorative = false,
}: {
  className?: string;
  priority?: boolean;
  decorative?: boolean;
}) {
  return (
    <Image
      src="/brand/kalaa-logo.webp"
      alt={decorative ? "" : SITE.name}
      width={512}
      height={184}
      className={className}
      priority={priority}
      unoptimized
    />
  );
}
