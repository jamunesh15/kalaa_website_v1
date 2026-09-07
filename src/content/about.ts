/* The four things Kalaa does, as the about board sets them out. */
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
