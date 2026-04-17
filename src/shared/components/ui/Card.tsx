import * as React from "react";

export type CardProps = React.HTMLAttributes<HTMLDivElement> & {
  media?: React.ReactNode;
};

function cx(...parts: Array<string | undefined | false | null>) {
  return parts.filter(Boolean).join(" ");
}

export function Card({ className, media, children, ...props }: CardProps) {
  return (
    <div
      className={cx(
        "group overflow-hidden rounded-2xl bg-[var(--ds-color-surface)]",
        "shadow-[var(--ds-shadow-card)] transition-[transform,box-shadow] duration-150 ease-[var(--ds-ease-standard)]",
        "hover:-translate-y-0.5 hover:shadow-[var(--ds-shadow-hover)]",
        className,
      )}
      {...props}
    >
      {media ? (
        <div className="relative overflow-hidden">
          <div className="aspect-[16/10] w-full">{media}</div>
        </div>
      ) : null}
      <div className="px-[var(--ds-space-16)] py-[var(--ds-space-12)]">
        {children}
      </div>
    </div>
  );
}

export type CardMediaProps = React.ImgHTMLAttributes<HTMLImageElement> & {
  dimOnHover?: boolean;
};

export function CardMedia({
  className,
  dimOnHover = true,
  alt = "",
  ...props
}: CardMediaProps) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      alt={alt}
      className={cx(
        "h-full w-full object-cover",
        "transition-[transform,filter] duration-220 ease-[var(--ds-ease-standard)]",
        "group-hover:scale-[1.02]",
        dimOnHover ? "group-hover:brightness-[0.98]" : undefined,
        className,
      )}
      {...props}
    />
  );
}

