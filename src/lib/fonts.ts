import { Inter, JetBrains_Mono } from "next/font/google";

/**
 * Self-hosted via next/font. This removes the two render-blocking
 * third-party origins (fonts.googleapis.com + fonts.gstatic.com) the
 * previous build hit on the critical path, and eliminates FOUT by
 * generating size-adjusted local fallback metrics.
 */
export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  adjustFontFallback: true,
});

export const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono-jetbrains",
  display: "swap",
});
