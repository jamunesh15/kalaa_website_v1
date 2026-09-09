import { WhatsappMark } from "@/components/ui/Glyph";
import { FOCUS_RING } from "@/components/ui/surface";
import { getChannels } from "@/content";

/*
 * WhatsApp, docked inside the bottom right of the sheet.
 *
 * The mark in white on WhatsApp's own green, and nothing else: no label, and
 * nothing that changes shape. The one thing it does is turn the mark through a
 * full circle while a pointer is on it.
 *
 * This is the one button on the site that is not black, at the client's ask. In
 * black it read as a dark dot over a pale sheet and got skipped.
 *
 * The number is never typed here. It comes from the same channel the contact
 * page and the footer use, so there is one WhatsApp link on the site.
 */
export function WhatsappDock() {
  const whatsapp = getChannels().find((channel) => channel.icon === "whatsapp");
  if (!whatsapp) return null;

  return (
    <a
      href={whatsapp.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={whatsapp.action}
      className={`whatsapp-dock ${FOCUS_RING}`}
    >
      <span className="whatsapp-dock-mark">
        <WhatsappMark size={24} />
      </span>
    </a>
  );
}
