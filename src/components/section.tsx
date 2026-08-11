import type { ReactNode } from "react";
import { Reveal } from "./reveal";

type SectionProps = {
  /** Anchor id, also used to associate the heading with the region. */
  id: string;
  title: string;
  description?: string;
  children: ReactNode;
};

/**
 * Server component. Only the inner reveal wrappers are client components, so
 * section content stays in the RSC payload.
 */
export function Section({ id, title, description, children }: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className="scroll-mt-24 border-t border-border py-16 md:py-20"
    >
      <Reveal>
        <h2
          id={`${id}-heading`}
          className="text-h1 font-bold tracking-tight text-foreground"
        >
          {title}
        </h2>
        {description ? (
          <p className="text-body mt-3 max-w-2xl text-muted-foreground">
            {description}
          </p>
        ) : null}
      </Reveal>
      <div className="mt-8 md:mt-10">{children}</div>
    </section>
  );
}
