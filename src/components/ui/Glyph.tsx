import type { ReactNode } from "react";

/* Every small mark this site draws, in one file. */

/* The channel glyphs, drawn rather than imported. */
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

  /* WhatsApp's own mark rather than a speech bubble. */
  return <WhatsappMark size={size} />;
}

/*
 * The plan marks.
 *
 * One per plan and each one says what that plan is: a rocket for the month a
 * brand gets off the ground, a rising bar for the month it starts buying reach, two
 * people for the month the scope is written rather than picked off a card. They
 * are named after the plan's meaning, not its position, so reordering the three
 * cards cannot silently hand a plan somebody else's icon.
 */
export function PlanGlyph({ name, size = 22 }: { name: "rocket" | "chart" | "team"; size?: number }) {
  if (name === "rocket") {
    return (
      <Glyph size={size}>
        {/* Nose, window, two fins and the burn, which is the fewest parts that still read as a rocket at 22px. */}
        <path d="M12 2.4c2.9 2.5 4.5 6 4.5 9.7v3.5h-9v-3.5c0-3.7 1.6-7.2 4.5-9.7z" />
        <circle cx="12" cy="10.2" r="1.9" />
        <path d="M7.5 12.2C5.3 13.4 4 15.7 4 18.3l3.5-1.6z" />
        <path d="M16.5 12.2c2.2 1.2 3.5 3.5 3.5 6.1l-3.5-1.6z" />
        <path d="M10.1 18.3c.4 1.4 1 2.5 1.9 3.3.9-.8 1.5-1.9 1.9-3.3" />
      </Glyph>
    );
  }

  if (name === "chart") {
    return (
      <Glyph size={size}>
        <rect x="3.8" y="13" width="4.4" height="7.2" rx="1.2" />
        <rect x="9.8" y="8.4" width="4.4" height="11.8" rx="1.2" />
        <rect x="15.8" y="3.8" width="4.4" height="16.4" rx="1.2" />
      </Glyph>
    );
  }

  /* One whole person and the shoulder of a second, which is how a group reads at this size without turning into a crowd. */
  return (
    <Glyph size={size}>
      <circle cx="9.4" cy="8.3" r="3.3" />
      <path d="M3.4 19.7c0-3.3 2.7-5.5 6-5.5s6 2.2 6 5.5" />
      <path d="M16.5 5.9a3.3 3.3 0 010 6.4" />
      <path d="M18.1 14.8c2.1.8 3.5 2.6 3.5 4.9" />
    </Glyph>
  );
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

/* The social glyphs. */
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

/* WhatsApp's mark, drawn once and used twice: in the contact column beside the number and again as a profile button. */
export function WhatsappMark({ size = 17 }: { size?: number }) {
  return (
    /* The mark is the published one, not a redrawing of it. */
    <svg width={size} height={size} viewBox="-1.5 -1.5 27 27" fill="currentColor" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
}

/* The reel player's marks. */
export function PlayerGlyph({
  name,
  size = 18,
}: {
  name: "play" | "pause" | "sound" | "muted" | "close";
  size?: number;
}) {
  if (name === "play") {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M7.5 4.5v15l12-7.5z" />
      </svg>
    );
  }

  if (name === "pause") {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <rect x="6" y="4.5" width="4" height="15" rx="1" />
        <rect x="14" y="4.5" width="4" height="15" rx="1" />
      </svg>
    );
  }

  if (name === "sound") {
    return (
      <Glyph size={size}>
        <path d="M4 9.5v5h3.5L12 18.5v-13L7.5 9.5z" fill="currentColor" />
        <path d="M15.5 9a4.2 4.2 0 010 6" />
        <path d="M18.2 6.3a8 8 0 010 11.4" />
      </Glyph>
    );
  }

  if (name === "muted") {
    return (
      <Glyph size={size}>
        <path d="M4 9.5v5h3.5L12 18.5v-13L7.5 9.5z" fill="currentColor" />
        <path d="M16 9.5l5 5M21 9.5l-5 5" />
      </Glyph>
    );
  }

  return (
    <Glyph size={size}>
      <path d="M6 6l12 12M18 6L6 18" />
    </Glyph>
  );
}

/* The frame every glyph in this file is drawn in. */
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
