"use client";

import { ArrowRight, ChevronDown, Menu } from "lucide-react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { mainNav, siteConfig, type NavItem } from "@/config/site";
import { cn } from "@/lib/utils";
import { EditorialArt } from "@/components/diagrams/editorial-art";
import { ButtonLink } from "@/components/ui/button";
import { Logo } from "./logo";

// The drawer (Radix Dialog + Accordion) loads in its own chunk, off the critical path.
const MobileDrawer = dynamic(() => import("./mobile-drawer").then((m) => m.MobileDrawer), {
  ssr: false,
  loading: () => (
    <span
      className="inline-flex h-10 w-10 items-center justify-center rounded-[3px] border border-ink-950/15 text-ink-950 lg:hidden"
      aria-hidden="true"
    >
      <Menu className="h-5 w-5" />
    </span>
  ),
});

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hoverOpenedAt = useRef(0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menus when the route changes.
  useEffect(() => {
    setOpen(null);
    setDrawerOpen(false);
  }, [pathname]);

  const close = useCallback((returnFocusTo?: string) => {
    setOpen(null);
    if (returnFocusTo) document.getElementById(`nav-trigger-${returnFocusTo}`)?.focus();
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close(open);
    };
    const onClick = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setOpen(null);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [open, close]);

  const hoverOpen = (label: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    if (open !== label) hoverOpenedAt.current = Date.now();
    setOpen(label);
  };
  const hoverClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpen(null), 160);
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b bg-white transition-shadow duration-300",
        scrolled || open
          ? "border-ink-950/10 shadow-[0_1px_0_rgb(16_21_28/0.04),0_8px_24px_-18px_rgb(16_21_28/0.25)]"
          : "border-ink-950/[0.07]",
      )}
    >
      <div className="mx-auto flex h-[72px] w-full max-w-[1240px] items-center justify-between gap-6 px-5 sm:px-8 lg:h-20 lg:px-10">
        <Logo />

        <nav ref={navRef} aria-label={siteConfig.ui.mainNav} className="hidden lg:block" onMouseLeave={hoverClose}>
          <ul className="relative flex items-center gap-1">
            {mainNav.map((item) => {
              const isOpen = open === item.label;
              const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <li key={item.label} onMouseEnter={() => hoverOpen(item.label)}>
                  <button
                    id={`nav-trigger-${item.label}`}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={`nav-panel-${slugify(item.label)}`}
                    onClick={() => {
                      // A click that lands right after hover opened the panel should not close it.
                      if (isOpen && Date.now() - hoverOpenedAt.current < 400) return;
                      setOpen(isOpen ? null : item.label);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "ArrowDown") {
                        e.preventDefault();
                        setOpen(item.label);
                        requestAnimationFrame(() =>
                          document.querySelector<HTMLAnchorElement>(`#nav-panel-${slugify(item.label)} a`)?.focus(),
                        );
                      }
                    }}
                    className={cn(
                      "relative inline-flex h-20 items-center gap-1.5 px-4 text-[0.95rem] font-medium transition-colors after:absolute after:inset-x-4 after:bottom-0 after:h-[2px] after:transition-colors",
                      isOpen || active ? "text-ink-950 after:bg-kiln-600" : "text-ink-800 after:bg-transparent hover:text-ink-950",
                    )}
                  >
                    {item.label}
                    <ChevronDown aria-hidden="true" className={cn("h-4 w-4 transition-transform duration-200", isOpen && "rotate-180")} />
                  </button>
                  <MegaPanel item={item} open={isOpen} onNavigate={() => setOpen(null)} />
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <ButtonLink href={siteConfig.ctas.contact.href} size="sm" variant="secondary" className="hidden sm:inline-flex">
            {siteConfig.ctas.contact.label}
          </ButtonLink>
          <MobileDrawer open={drawerOpen} onOpenChange={setDrawerOpen} />
        </div>
      </div>
    </header>
  );
}

function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-");
}

function MegaPanel({ item, open, onNavigate }: { item: NavItem; open: boolean; onNavigate: () => void }) {
  const cols = item.groups.reduce((n, g) => n + (g.columns ?? 1), 0);
  const width = cols >= 3 ? (item.feature ? "w-[960px]" : "w-[760px]") : cols === 2 || item.feature ? "w-[720px]" : "w-[360px]";
  return (
    <div
      id={`nav-panel-${slugify(item.label)}`}
      hidden={!open}
      className={cn("absolute top-full left-1/2 z-50 max-w-[calc(100vw-2rem)] -translate-x-1/2", width)}
    >
      <div className="overflow-hidden border border-t-2 border-ink-950/10 border-t-kiln-600 bg-white shadow-[0_24px_60px_-28px_rgb(16_21_28/0.3)]">
        <div className={cn("grid gap-0", item.feature ? "grid-cols-[1fr_240px]" : "grid-cols-1")}>
          <div className={cn("grid gap-6 p-6", cols >= 3 ? "grid-cols-3" : cols === 2 ? "grid-cols-2" : "grid-cols-1")}>
            {item.groups.map((group) => (
              <div key={group.heading} className={group.columns === 2 ? "col-span-2" : undefined}>
                <p className="border-b border-ink-950/10 pb-2 text-[0.72rem] font-semibold tracking-[0.14em] text-ink-600 uppercase">
                  {group.heading}
                </p>
                <ul className={cn("mt-3", group.columns === 2 ? "grid grid-cols-2 gap-x-2 gap-y-0.5" : "space-y-0.5")}>
                  {group.links.map((link) => (
                    <li key={link.href + link.label}>
                      <Link href={link.href} onClick={onNavigate} className="group block px-0 py-1.5 transition-colors hover:text-kiln-700">
                        <span className="flex items-center gap-2 text-[0.95rem] font-medium text-ink-950">
                          {link.label}
                          <ArrowRight
                            aria-hidden="true"
                            className="h-3.5 w-3.5 -translate-x-1 text-kiln-700 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100"
                          />
                        </span>
                        {link.description && <span className="mt-0.5 block text-sm text-ink-600">{link.description}</span>}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          {item.feature && (
            <div className="relative flex flex-col justify-end overflow-hidden border-l border-ink-950/10 bg-paper p-6">
              <div aria-hidden="true" className="absolute inset-x-0 top-0 h-28 opacity-90">
                <EditorialArt variant="contours" seed={3} />
              </div>
              <p className="mt-24 text-[0.72rem] font-semibold tracking-[0.14em] text-kiln-700 uppercase">{item.feature.eyebrow}</p>
              <p className="mt-2 font-display text-xl text-ink-950">{item.feature.title}</p>
              <p className="mt-2 text-sm leading-relaxed text-ink-700">{item.feature.body}</p>
              <Link
                href={item.feature.cta.href}
                onClick={onNavigate}
                className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-kiln-700 hover:text-kiln-700"
              >
                {item.feature.cta.label}
                <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
