import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 font-mono uppercase transition-all duration-300 focus-visible:outline-2 focus-visible:outline-accent disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "rounded-full bg-accent font-semibold tracking-[0.18em] text-void hover:bg-accent-hi hover:shadow-[0_0_48px_-8px_rgba(245,197,24,0.45)]",
        ghost:
          "rounded-full border border-line-strong tracking-[0.18em] text-bone hover:border-accent hover:text-accent",
        subtle:
          "tracking-[0.18em] text-fog hover:text-accent",
      },
      size: {
        sm: "px-5 py-2.5 text-[0.65rem]",
        md: "px-7 py-4 text-[0.72rem]",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  }
);

type ButtonProps = VariantProps<typeof buttonVariants> & {
  href?: string;
  download?: boolean | string;
  className?: string;
  children: React.ReactNode;
  ariaLabel?: string;
};

/** Polymorphic button: renders an anchor when `href` is provided. */
export function Button({
  href,
  download,
  variant,
  size,
  className,
  children,
  ariaLabel,
}: ButtonProps) {
  const classes = cn(buttonVariants({ variant, size }), className);
  if (href) {
    return (
      <a href={href} download={download} className={classes} aria-label={ariaLabel}>
        {children}
      </a>
    );
  }
  return (
    <button type="button" className={classes} aria-label={ariaLabel}>
      {children}
    </button>
  );
}
