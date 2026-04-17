"use client";

import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import type { EmblaOptionsType } from "embla-carousel";

function cx(...parts: Array<string | undefined | false | null>) {
  return parts.filter(Boolean).join(" ");
}

export const carouselMaskPeekFade =
  "[mask-image:linear-gradient(to_right,transparent,black_12px,black_calc(100%-48px),transparent)] " +
  "[-webkit-mask-image:linear-gradient(to_right,transparent,black_12px,black_calc(100%-48px),transparent)]";

const defaultAutoplayOptions = {
  delay: 4500,
  stopOnInteraction: true,
  stopOnMouseEnter: true,
  playOnInit: true,
} as const;

export type CarouselAutoplayOptions = {
  delay?: number;
  stopOnInteraction?: boolean;
  stopOnMouseEnter?: boolean;
  playOnInit?: boolean;
  jump?: boolean;
  stopOnFocusIn?: boolean;
  stopOnLastSnap?: boolean;
};

export type CarouselProps = {
  slides: React.ReactNode[];
  className?: string;
  /** Outer wrapper of viewport + dots */
  viewportClassName?: string;
  /** Each slide cell (default adds full width + padding) */
  slideClassName?: string;
  emblaOptions?: EmblaOptionsType;
  /** `false` disables autoplay; `true`/omit uses defaults; object merges with defaults */
  autoplay?: boolean | CarouselAutoplayOptions;
  /** Dots row */
  dotsClassName?: string;
  /** Active dot */
  dotActiveClassName?: string;
  /** Inactive dots */
  dotInactiveClassName?: string;
  /** Hide dots when only one slide */
  hideDotsWhenSingle?: boolean;
};

export function Carousel({
  slides,
  className,
  viewportClassName,
  slideClassName,
  emblaOptions,
  autoplay: autoplayProp,
  dotsClassName,
  dotActiveClassName = "bg-brand-rausch",
  dotInactiveClassName = "bg-[#DDDDDD]",
  hideDotsWhenSingle = true,
}: CarouselProps) {
  const plugins = React.useMemo(() => {
    if (autoplayProp === false) return [];
    const extra =
      autoplayProp === true || autoplayProp === undefined
        ? {}
        : autoplayProp;
    return [Autoplay({ ...defaultAutoplayOptions, ...extra })];
  }, [autoplayProp]);

  const [emblaRef, emblaApi] = useEmblaCarousel(emblaOptions, plugins);

  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [scrollSnaps, setScrollSnaps] = React.useState<number[]>([]);

  const onSelect = React.useCallback((api: NonNullable<typeof emblaApi>) => {
    setSelectedIndex(api.selectedScrollSnap());
  }, []);

  React.useEffect(() => {
    if (!emblaApi) return;

    const handleSelect = () => onSelect(emblaApi);
    const handleReInit = () => {
      setScrollSnaps(emblaApi.scrollSnapList());
      onSelect(emblaApi);
    };

    setScrollSnaps(emblaApi.scrollSnapList());
    setSelectedIndex(emblaApi.selectedScrollSnap());

    emblaApi.on("select", handleSelect);
    emblaApi.on("reInit", handleReInit);

    return () => {
      emblaApi.off("select", handleSelect);
      emblaApi.off("reInit", handleReInit);
    };
  }, [emblaApi, onSelect]);

  const showDots = !hideDotsWhenSingle || scrollSnaps.length > 1;

  return (
    <div className={cx("w-full flex flex-col overflow-hidden", className)}>
      <div
        ref={emblaRef}
        className={cx(
          "overflow-hidden",
          carouselMaskPeekFade,
          viewportClassName,
        )}
      >
        <div className="flex">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={cx(
                "min-w-0 flex-[0_0_100%] shrink-0",
                slideClassName,
              )}
            >
              {slide}
            </div>
          ))}
        </div>
      </div>

      {showDots ? (
        <div
          className={cx("flex justify-start px-4 mt-6 gap-2", dotsClassName)}
          role="tablist"
          aria-label="Carousel slides"
        >
          {scrollSnaps.map((_, i) => {
            const active = i === selectedIndex;
            return (
              <button
                key={i}
                type="button"
                role="tab"
                aria-selected={active}
                aria-label={`Slide ${i + 1}`}
                className={cx(
                  "dot h-1.5 w-1.5 rounded-full transition-all duration-300",
                  active ? dotActiveClassName : dotInactiveClassName,
                )}
                onClick={() => emblaApi?.scrollTo(i)}
              />
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
