import { Hero } from "@/components/home/hero";
import { FeaturedWork } from "@/components/home/featured-work";
import { Expertise } from "@/components/home/expertise";
import { LatestWriting } from "@/components/home/latest-writing";
import { CurrentFocus } from "@/components/home/current-focus";
import { ContactCta } from "@/components/home/contact-cta";

/**
 * The homepage is a lobby, not the whole building. Full skill grids,
 * complete project lists, and long bios live on their own pages.
 *
 * Each block self-censors when it has no real content — LatestWriting
 * renders nothing with zero posts rather than showing an empty strip.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedWork />
      <LatestWriting />
      <Expertise />
      <CurrentFocus />
      <ContactCta />
    </>
  );
}
