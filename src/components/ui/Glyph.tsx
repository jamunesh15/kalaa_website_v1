import type { ReactNode } from "react";

/**
 * Every small mark this site draws, in one file.
 *
 * They were local to the footer until the contact page needed the same three
 * channels, and two copies of a mail envelope is how a set of icons stops being
 * a set. Nothing here is imported from a package: eight outlines at one stroke
 * width are not worth an icon library on the wire, and every other mark on this
 * site is drawn in the repository too.
 */

/**
 * The channel glyphs, drawn rather than imported.
 *
 * Three outlines at one stroke width are not worth an icon package on the wire,
 * and every other mark on this site is drawn in the file that uses it.
 */
export function ChannelGlyph({ name, size }: { name: "mail" | "phone" | "whatsapp"; size?: number }) {
  if (name === "mail") {
    return (
      <Glyph size={size}>
        <rect x="2.5" y="4.5" width="19" height="15" rx="2" />
        <path d="M3 6.5l9 6 9-6" />
      </Glyph>
    );
  }

  if (name === "phone") {
    return (
      <Glyph size={size}>
        <path d="M6.5 3.5h3l1.5 4-2 1.5a12 12 0 006 6l1.5-2 4 1.5v3a2 2 0 01-2.2 2A17.5 17.5 0 014.5 5.7 2 2 0 016.5 3.5z" />
      </Glyph>
    );
  }

  /*
    WhatsApp's own mark rather than a speech bubble. The client asked for it by
    name, and the difference matters: a bubble says "message us somehow" and
    this says which app opens, which is the thing the line under it promises.
  */
  return <WhatsappMark size={size} />;
}

/** The map pin, for the studio line. */
export function PinGlyph() {
  return (
    <Glyph>
      <path d="M12 21.5s7-6.1 7-11a7 7 0 10-14 0c0 4.9 7 11 7 11z" />
      <circle cx="12" cy="10.4" r="2.6" />
    </Glyph>
  );
}

/**
 * The social glyphs.
 *
 * Three, because three profiles exist. Instagram is drawn in the same outline
 * as the channel marks, since its logo IS an outline. X and WhatsApp are solid,
 * because their logos are silhouettes: an outlined X is a close button and an
 * outlined WhatsApp is a speech bubble. Recognition beats a consistent stroke
 * width here, and at 18px inside a filled circle the mixture does not read as
 * inconsistent.
 */
export function SocialGlyph({ name }: { name: "instagram" | "x" | "whatsapp" }) {
  if (name === "instagram") {
    return (
      <Glyph>
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
      </Glyph>
    );
  }

  if (name === "x") {
    return (
      <svg width={16} height={16} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M18.24 2.25h3.31l-7.23 8.26 8.5 11.24h-6.65l-5.22-6.82-5.96 6.82H1.68l7.73-8.84L1.25 2.25h6.83l4.71 6.23zm-1.16 17.52h1.83L7.08 4.13H5.12z" />
      </svg>
    );
  }

  return <WhatsappMark />;
}

/**
 * WhatsApp's mark, drawn once and used twice: in the contact column beside the
 * number and again as a profile button.
 *
 * Solid, and the handset is cut out of the bubble rather than drawn on top of
 * it, which is what keeps it readable at 16px. An outlined version was what
 * this replaced and it read as a generic chat bubble at any size. The path is
 * the published mark (Simple Icons, CC0), see the note inside.
 */
export function WhatsappMark({ size = 17 }: { size?: number }) {
  return (
    /*
      The mark is the published one, not a redrawing of it. A hand-typed
      approximation shipped first and the client called it: the bubble's
      bottom sat flat, as if pressed from below, because the tail and the
      ring were traced by eye. The published outline is drawn full-bleed in a
      24-box, so the viewBox is inset by 1.5 on each side to sit it at the
      same optical size as the outlined glyphs beside it, which are drawn
      inside 2.5 to 21.5.
    */
    <svg width={size} height={size} viewBox="-1.5 -1.5 27 27" fill="currentColor" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
}

/**
 * The frame every glyph in this file is drawn in.
 *
 * One box, one stroke width, one join. Eight marks each setting their own is
 * how a set of icons stops looking like a set.
 */
export function Glyph({ children, size = 18 }: { children: ReactNode; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {children}
    </svg>
  );
}
