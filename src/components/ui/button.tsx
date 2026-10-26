import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import Link from "next/link";
import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

/** Square-cornered, flat buttons in the editorial style. */
export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[3px] font-medium tracking-[-0.005em] transition-colors duration-200 disabled:pointer-events-none disabled:opacity-60",
  {
    variants: {
      variant: {
        primary: "bg-kiln-700 text-white hover:bg-kiln-800",
        secondary: "border border-ink-950/25 bg-white text-ink-950 hover:border-ink-950 hover:bg-ink-950 hover:text-white",
        ghost: "text-ink-800 hover:bg-ink-950/5",
        dark: "bg-navy-900 text-white hover:bg-ink-800",
        light: "bg-white text-ink-950 hover:bg-paper",
        outlineLight: "border border-white/60 text-white hover:bg-white hover:text-ink-950",
        outlineDark: "border border-ink-950/25 text-ink-950 hover:border-ink-950 hover:bg-ink-950 hover:text-white",
      },
      size: {
        sm: "h-9 px-4 text-sm",
        md: "h-11 px-5 text-[0.95rem]",
        lg: "h-12 px-7 text-base",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & VariantProps<typeof buttonVariants> & { asChild?: boolean };

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button({ className, variant, size, asChild, ...props }, ref) {
  const Comp = asChild ? Slot : "button";
  return <Comp ref={ref} className={cn(buttonVariants({ variant, size }), className)} {...props} />;
});

export function ButtonLink({
  href,
  className,
  variant,
  size,
  children,
  ...rest
}: { href: string; className?: string; children: React.ReactNode } & VariantProps<typeof buttonVariants> &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href">) {
  return (
    <Link href={href} className={cn(buttonVariants({ variant, size }), className)} {...rest}>
      {children}
    </Link>
  );
}

/** Text link with an arrow, the default secondary action in editorial layouts. */
export function ArrowLink({ href, children, className }: { href: string; children: React.ReactNode; className?: string }) {
  return (
    <Link href={href} className={cn("group inline-flex items-center gap-2 font-medium text-ink-950", className)}>
      <span className="link-editorial">{children}</span>
      <svg aria-hidden="true" viewBox="0 0 16 16" className="h-4 w-4 text-kiln-700 transition-transform group-hover:translate-x-1">
        <path d="M2 8h11M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </Link>
  );
}
