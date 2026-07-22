import Link from "next/link";
import { site, socials } from "#content";
import { footerNav } from "@/lib/navigation";
import { Container } from "@/components/layout/container";

/**
 * The footer carries the full IA — including tier-3 routes kept out of
 * the header. The previous footer had zero links.
 */
export function Footer() {
  return (
    <footer className="mt-auto border-t border-subtle bg-surface-subtle">
      <Container>
        <div className="grid gap-10 py-16 md:grid-cols-[1.5fr_repeat(4,1fr)]">
          <div className="max-w-xs">
            <span aria-hidden="true" className="grid size-9 place-items-center rounded-md bg-primary text-body-sm font-semibold text-inverse">
              {site.shortName}
            </span>
            <p className="mt-4 text-body-sm text-secondary">{site.tagline}</p>
            <p className="mt-4 text-caption text-tertiary">
              {site.location} · {site.timezone}
            </p>
          </div>

          {footerNav.map((group) => (
            <nav key={group.heading} aria-label={group.heading}>
              <h2 className="mb-3 text-label uppercase text-tertiary">{group.heading}</h2>
              <ul className="flex flex-col gap-2">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="rounded-sm text-body-sm text-secondary transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="flex flex-col gap-4 border-t border-subtle py-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-caption text-tertiary">
            © {new Date().getFullYear()} {site.name}
          </p>
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target={s.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="rounded-sm text-caption text-tertiary transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </footer>
  );
}
