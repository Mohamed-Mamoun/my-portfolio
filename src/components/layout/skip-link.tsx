/**
 * Keyboard users shouldn't have to tab the whole header on every page.
 * The previous build had no skip link at all.
 */
export function SkipLink() {
  return (
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-100 focus:rounded-md focus:bg-accent focus:px-4 focus:py-2 focus:text-body-sm focus:font-medium focus:text-accent-contrast focus:shadow-lg"
    >
      Skip to content
    </a>
  );
}
