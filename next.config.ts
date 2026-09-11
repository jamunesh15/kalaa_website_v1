import type { NextConfig } from "next";

/**
 * Deliberately close to empty.
 *
 * The previous repository set `output: "standalone"` because it shipped over
 * SSH to a small shared box. Where this site is hosted has not been decided, and
 * `next start` refuses to run against a standalone build, so carrying that
 * setting forward would break local preview to serve a deployment that may never
 * happen. Add it back the day the box is chosen.
 */
const nextConfig: NextConfig = {
  images: {
    /*
      75 is Next's default and every other image uses it. 90 is for the team's
      photographs in the capability cards, where softness in a face shows.
      Next 16 only serves a `quality` listed here, so without 90 in the list
      `quality={90}` would not reach the optimiser.
    */
    qualities: [75, 90],
  },
};

export default nextConfig;
