"use client";

import { ThemeProvider as NextThemeProvider } from "next-themes";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      // Transitions during a theme swap read as a glitch, not a flourish.
      disableTransitionOnChange
    >
      {children}
    </NextThemeProvider>
  );
}
