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
const nextConfig: NextConfig = {};

export default nextConfig;
