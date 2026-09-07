/**
 * The four things Kalaa does, as the about board sets them out.
 *
 * One line each, and the line is the whole point: a reader scanning this row is
 * not reading paragraphs, they are checking whether the four words describe the
 * job they need doing. Anything longer than a short sentence stops being
 * scannable and becomes a second paragraph competing with the first.
 *
 * The order is the order of the work: decide what to say, make it, put it in
 * front of the right people, and turn that into something the business can
 * count. It is the same sequence the artwork beside it prints across the top.
 */
export type AboutPillar = {
  readonly title: string;
  readonly line: string;
  /** Which glyph the section draws in the badge. Not content, so not a path. */
  readonly icon: "strategy" | "content" | "distribution" | "growth";
};

export const ABOUT_PILLARS: readonly AboutPillar[] = [
  { title: "Strategy", line: "Know what to say.", icon: "strategy" },
  { title: "Content", line: "Make people stop.", icon: "content" },
  { title: "Distribution", line: "Reach the right people.", icon: "distribution" },
  { title: "Growth", line: "Turn attention into action.", icon: "growth" },
];
