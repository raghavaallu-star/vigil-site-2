import type { MDXComponents } from "mdx/types";
import Link from "next/link";
import { BeforeAfterChart, CaseFacts, Metrics, PullQuote } from "@/components/mdx/case-study";

const components: MDXComponents = {
  Metrics,
  PullQuote,
  BeforeAfterChart,
  CaseFacts,
  a: ({ href = "", children, ...rest }) =>
    href.startsWith("/") ? (
      <Link href={href} {...rest}>
        {children}
      </Link>
    ) : (
      <a href={href} rel="noopener noreferrer" target="_blank" {...rest}>
        {children}
      </a>
    ),
};

export function useMDXComponents(): MDXComponents {
  return components;
}
