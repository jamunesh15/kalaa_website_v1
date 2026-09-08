import { BLOG_MEDIA } from "@/content/blogMedia";

/*
 * Every picture on the blog goes through here.
 *
 * All of it is 3:2, and every box that holds it is 3:2 as well, so `object-cover`
 * crops nothing. That matters more here than elsewhere: each of these pictures
 * has the article's own title written inside it, and a crop would cut the words.
 *
 * A plain `img` against the two files `npm run media` already wrote, rather than
 * `next/image`: these are pre-sized to the only two widths the page draws them
 * at, so the optimiser has nothing to add and it was costing the opening picture
 * 200ms over the paint budget while it resized on the first request.
 */
export function ArticleArtwork({
  image,
  alt,
  sizes,
  className = "",
  eager = false,
}: {
  /** Slug in `BLOG_MEDIA`. */
  image: string;
  alt: string;
  sizes: string;
  className?: string;
  /** For the picture on the first screen, which must not wait to be scrolled to. */
  eager?: boolean;
}) {
  const media = BLOG_MEDIA.find((entry) => entry.slug === image);
  if (!media) return null;

  return (
    <div className={`aspect-[3/2] overflow-hidden bg-tint-cloud ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element -- already sized and encoded by `npm run media`. */}
      <img
        src={media.src}
        srcSet={`${media.small} 700w, ${media.src} 1400w`}
        sizes={sizes}
        width={media.width}
        height={media.height}
        alt={alt}
        loading={eager ? "eager" : "lazy"}
        fetchPriority={eager ? "high" : undefined}
        decoding="async"
        draggable={false}
        className="h-full w-full object-cover"
      />
    </div>
  );
}
