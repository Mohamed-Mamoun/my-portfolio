import { site, socials, experience } from "#content";

/**
 * Person + WebSite schema. The previous build had a decent Person block
 * but no WebSite, no SearchAction, and no image — so search engines had
 * no way to resolve the entity beyond a name.
 */
export function SiteStructuredData() {
  const current = experience.find((role) => role.current);

  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${site.url}/#person`,
        name: site.name,
        jobTitle: site.role,
        description: site.positioning,
        email: `mailto:${site.email}`,
        url: site.url,
        image: `${site.url}${site.avatar}`,
        address: { "@type": "PostalAddress", addressLocality: "Cairo", addressCountry: "EG" },
        alumniOf: { "@type": "CollegeOrUniversity", name: "The Future University" },
        ...(current ? { worksFor: { "@type": "Organization", name: current.company } } : {}),
        knowsAbout: [
          "Flutter",
          "Dart",
          "Mobile Architecture",
          "State Management",
          "Firebase",
          "Offline-first Applications",
          "CI/CD",
        ],
        sameAs: socials.filter((s) => s.href.startsWith("http")).map((s) => s.href),
      },
      {
        "@type": "WebSite",
        "@id": `${site.url}/#website`,
        url: site.url,
        name: site.name,
        description: site.positioning,
        publisher: { "@id": `${site.url}/#person` },
        inLanguage: "en",
      },
    ],
  };

  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }} />
  );
}
