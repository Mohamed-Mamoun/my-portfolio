/**
 * Header holds six items maximum — beyond that, scanning cost exceeds
 * navigation value. Everything deeper is reachable via ⌘K and the
 * footer, which exposes the rest of the IA.
 */

import { site } from "#content";

export const primaryNav = [
  { label: "Work", href: "/projects" },
  { label: "Writing", href: "/blog" },
  { label: "About", href: "/about" },
  { label: "Uses", href: "/uses" },
] as const;

export type NavLink = {
  label: string;
  href: string;
  /**
   * Release tier (docs/02 §9). Tier 1 is built and linked. Tiers 2 and 3
   * are the roadmap — they are FILTERED OUT of rendered navigation until
   * the route exists, because a link to a 404 is worse than no link.
   *
   * To ship one: build the route, then delete its `tier` here.
   */
  tier?: 2 | 3;
};

const nav: readonly { heading: string; links: readonly NavLink[] }[] = [
  {
    heading: "Work",
    links: [
      { label: "Projects", href: "/projects" },
      { label: "Experience", href: "/experience" },
      { label: "Skills", href: "/skills" },
      // Static asset, not a route — same as the RSS entry below.
      { label: "Résumé", href: site.resume },
      { label: "Open Source", href: "/open-source", tier: 2 },
    ],
  },
  {
    heading: "Writing",
    links: [
      { label: "Blog", href: "/blog" },
      { label: "RSS", href: "/rss.xml" },
      { label: "Newsletter", href: "/newsletter", tier: 2 },
      { label: "Speaking", href: "/speaking", tier: 3 },
    ],
  },
  {
    heading: "Personal",
    links: [
      { label: "About", href: "/about" },
      { label: "Now", href: "/now" },
      { label: "Uses", href: "/uses" },
      { label: "Bookmarks", href: "/bookmarks", tier: 3 },
    ],
  },
  {
    heading: "Connect",
    links: [
      { label: "Contact", href: "/contact" },
      { label: "Search", href: "/search" },
      { label: "Resources", href: "/resources", tier: 3 },
    ],
  },
];

/** Only shipped routes. Groups that end up empty are dropped entirely. */
export const footerNav = nav
  .map((group) => ({ ...group, links: group.links.filter((link) => !link.tier) }))
  .filter((group) => group.links.length > 0);

/** The unfiltered roadmap, for planning — not for rendering. */
export const plannedRoutes = nav.flatMap((group) => group.links.filter((link) => link.tier));
