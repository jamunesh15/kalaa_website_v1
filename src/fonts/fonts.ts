import { Kalam } from "next/font/google";
import localFont from "next/font/local";

/* The site's two faces, self-hosted. */

/* The display face. */
export const displayFace = localFont({
  src: [
    { path: "./satoshi-500.woff2", weight: "500", style: "normal" },
    { path: "./satoshi-700.woff2", weight: "700", style: "normal" },
    { path: "./satoshi-900.woff2", weight: "900", style: "normal" },
  ],
  variable: "--font-display-face",
  display: "swap",
});

/* The text face. */
export const switzer = localFont({
  src: [
    { path: "./switzer-400.woff2", weight: "400", style: "normal" },
    { path: "./switzer-500.woff2", weight: "500", style: "normal" },
    { path: "./switzer-600.woff2", weight: "600", style: "normal" },
    { path: "./switzer-700.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-switzer",
  display: "swap",
});

/* The hand, for the two lines in the impact section that are handwritten. */
export const hand = Kalam({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-hand-face",
  display: "swap",
});
