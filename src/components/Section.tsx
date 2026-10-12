import type { ReactNode } from "react";
import { clsx } from "clsx";
import {
  SlideUpPanel,
  ZoomInPanel,
  ZoomOutPanel,
  SuctionPanel,
  SlideLeftPanel,
  SlideRightPanel,
} from "./Reveal";

const TONE_BG: Record<string, string> = {
  ink: "bg-ink",
  navy: "bg-gradient-to-b from-navy via-[#05123a] to-ink",
  deep: "bg-[#030817]",
  vivid: "bg-gradient-to-br from-signal via-electric to-iris",
};

const TRANSITION_WRAPPER = {
  none: null,
  panel: SlideUpPanel,
  zoomIn: ZoomInPanel,
  zoomOut: ZoomOutPanel,
  suction: SuctionPanel,
  slideLeft: SlideLeftPanel,
  slideRight: SlideRightPanel,
} as const;

export function Section({
  id,
  children,
  className,
  tone = "ink",
  panel = false,
  transition = "none",
  wide = false,
}: {
  id?: string;
  children: ReactNode;
  className?: string;
  tone?: "ink" | "navy" | "deep" | "vivid";
  panel?: boolean;
  transition?: "none" | "panel" | "zoomIn" | "zoomOut" | "suction" | "slideLeft" | "slideRight";
  wide?: boolean;
}) {
  const resolvedTransition = panel ? "panel" : transition;
  const Wrapper = TRANSITION_WRAPPER[resolvedTransition];

  const content = (
    <section
      id={id}
      className={clsx(
        "relative w-full scroll-mt-20 overflow-hidden px-4 py-24 sm:px-6 sm:py-32",
        TONE_BG[tone],
        resolvedTransition === "panel" &&
          "rounded-t-[2.5rem] border-t border-white/10 shadow-[0_-30px_60px_-25px_rgba(0,0,0,0.7)]",
        className
      )}
    >
      <div className={clsx("relative mx-auto", wide ? "max-w-6xl" : "max-w-5xl")}>{children}</div>
    </section>
  );

  return Wrapper ? <Wrapper>{content}</Wrapper> : content;
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="mb-5 inline-flex items-center gap-2.5 font-display text-[11px] font-semibold uppercase tracking-[0.3em] text-signal sm:text-xs">
      <svg viewBox="0 0 12 11" className="h-2.5 w-2.5" aria-hidden>
        <path d="M6 0.8 L11.2 10.2 H0.8 Z" fill="none" stroke="currentColor" strokeWidth="1.6" />
      </svg>
      {children}
    </p>
  );
}

export function Kicker({ children }: { children: ReactNode }) {
  return (
    <p className="text-gradient-delta mt-8 font-display text-lg font-bold leading-relaxed sm:text-2xl">
      {children}
    </p>
  );
}
