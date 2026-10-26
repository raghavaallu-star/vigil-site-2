import Link from "next/link";
import { footerCopy, footerNav, legalNav, siteConfig } from "@/config/site";
import { Container } from "@/components/ui/section";
import { Logo } from "./logo";
import { CookieSettingsButton } from "./consent";

export function Footer({ analyticsEnabled }: { analyticsEnabled: boolean }) {
  return (
    <footer className="border-t border-ink-950/10 bg-paper text-ink-700">
      <Container className="pt-16 pb-10 lg:pt-20">
        <div className="grid gap-12 border-b border-ink-950/10 pb-14 lg:grid-cols-[1fr_2.6fr] lg:gap-16">
          <div>
            <Logo />
            <p className="mt-6 max-w-xs font-display text-xl leading-snug text-ink-950">{siteConfig.positioning}</p>
            <p className="mt-4 max-w-xs text-sm leading-relaxed">{footerCopy.blurb}</p>
            <p className="mt-6 text-sm">{siteConfig.location.note}</p>
            <a href={`mailto:${siteConfig.contact.email}`} className="link-editorial mt-2 inline-block text-sm text-ink-950">
              {siteConfig.contact.email}
            </a>
          </div>
          <nav aria-label={siteConfig.ui.footerNav} className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-3 xl:grid-cols-5">
            {footerNav.map((group) => (
              <div key={group.heading}>
                <p className="text-[0.72rem] font-semibold tracking-[0.14em] text-ink-950 uppercase">{group.heading}</p>
                <ul className="mt-4 space-y-2.5 text-sm">
                  {group.links.map((link) => (
                    <li key={link.href + link.label}>
                      <Link href={link.href} className="hover:text-kiln-700">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>
        <div className="flex flex-col gap-4 pt-8 text-sm sm:flex-row sm:items-center sm:justify-between">
          <p>{footerCopy.copyright}</p>
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {legalNav.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-kiln-700">
                  {link.label}
                </Link>
              </li>
            ))}
            {analyticsEnabled && (
              <li>
                <CookieSettingsButton label={footerCopy.cookieSettings} />
              </li>
            )}
            {siteConfig.social.map((s) => (
              <li key={s.label}>
                <a href={s.href} className="hover:text-kiln-700" rel="noopener noreferrer" target="_blank">
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
