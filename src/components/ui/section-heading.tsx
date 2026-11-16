import { cn } from "@/lib/utils";

/** Standard editorial section header: mono index + large display title. */
export function SectionHeading({
  code,
  title,
  className,
}: {
  code: string;
  title: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mb-10 sm:mb-16", className)}>
      <p className="tech-label flex items-center gap-3">
        <span className="inline-block h-px w-10 bg-accent" aria-hidden />
        {code}
      </p>
      <h2 className="mt-5 max-w-4xl text-balance font-display text-4xl font-bold uppercase leading-[0.97] tracking-tight text-bone sm:text-6xl lg:text-7xl">
        {title}
      </h2>
    </div>
  );
}
