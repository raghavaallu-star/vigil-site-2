"use client";

import * as Accordion from "@radix-ui/react-accordion";
import * as Dialog from "@radix-ui/react-dialog";
import { ChevronDown, Menu, X } from "lucide-react";
import Link from "next/link";
import { mainNav, siteConfig } from "@/config/site";
import { ButtonLink } from "@/components/ui/button";
import { LogoMark, Wordmark } from "./logo";

export function MobileDrawer({ open, onOpenChange }: { open: boolean; onOpenChange: (o: boolean) => void }) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Trigger asChild>
        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-[3px] border border-ink-950/15 text-ink-950 lg:hidden"
          aria-label={siteConfig.ui.openMenu}
        >
          <Menu aria-hidden="true" className="h-5 w-5" />
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[60] bg-white/70 backdrop-blur-sm lg:hidden" />
        <Dialog.Content className="fixed inset-y-0 right-0 z-[70] flex w-full max-w-sm flex-col overflow-y-auto border-l border-ink-950/10 bg-white lg:hidden">
          <div className="flex h-16 items-center justify-between border-b border-ink-950/10 px-4">
            <Dialog.Title asChild>
              <span className="inline-flex items-center gap-2">
                <LogoMark className="h-7 w-7" />
                <Wordmark className="text-lg" />
              </span>
            </Dialog.Title>
            <Dialog.Description className="sr-only">{siteConfig.ui.mainNav}</Dialog.Description>
            <Dialog.Close
              className="inline-flex h-10 w-10 items-center justify-center rounded-[3px] border border-ink-950/15 text-ink-950"
              aria-label={siteConfig.ui.closeMenu}
            >
              <X aria-hidden="true" className="h-5 w-5" />
            </Dialog.Close>
          </div>
          <nav aria-label={siteConfig.ui.mainNav} className="flex-1 px-4 py-2">
            <Accordion.Root type="single" collapsible>
              {mainNav.map((item) => (
                <Accordion.Item key={item.label} value={item.label} className="border-b border-ink-950/10">
                  <Accordion.Header>
                    <Accordion.Trigger className="group flex w-full items-center justify-between py-4 text-left text-base font-medium text-ink-950">
                      {item.label}
                      <ChevronDown aria-hidden="true" className="h-4 w-4 transition-transform group-data-[state=open]:rotate-180" />
                    </Accordion.Trigger>
                  </Accordion.Header>
                  <Accordion.Content className="pb-4">
                    {item.groups.map((group) => (
                      <div key={group.heading} className="mb-3">
                        <p className="px-2 text-[0.72rem] font-semibold tracking-[0.14em] text-ink-600 uppercase">{group.heading}</p>
                        <ul className="mt-1">
                          {group.links.map((link) => (
                            <li key={link.href + link.label}>
                              <Link
                                href={link.href}
                                onClick={() => onOpenChange(false)}
                                className="block rounded-lg px-2 py-2.5 text-[0.95rem] text-ink-800 hover:bg-ink-950/[0.04] hover:text-ink-950"
                              >
                                {link.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </Accordion.Content>
                </Accordion.Item>
              ))}
            </Accordion.Root>
          </nav>
          <div className="grid gap-3 border-t border-ink-950/10 p-4">
            <ButtonLink href={siteConfig.ctas.primary.href} onClick={() => onOpenChange(false)}>
              {siteConfig.ctas.primary.label}
            </ButtonLink>
            <ButtonLink href={siteConfig.ctas.assessment.href} variant="secondary" onClick={() => onOpenChange(false)}>
              {siteConfig.ctas.assessment.label}
            </ButtonLink>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
