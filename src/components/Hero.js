import Image from "next/image";

import { Button } from "./Button";
import { Section } from "./Section";

const horizontalAlignments = {
  left: { justify: "justify-start", text: "text-left", self: "" },
  center: { justify: "justify-center", text: "text-center", self: "mx-auto" },
  right: { justify: "justify-end", text: "text-right", self: "ml-auto" },
};

const verticalAlignments = {
  top: "items-start",
  center: "items-center",
  bottom: "items-end",
};

const paddingByAlign = {
  left: "pl-6 pr-6 sm:pl-20 sm:pr-8 lg:pl-24 lg:pr-10",
  center: "px-6 sm:px-16 lg:px-20",
  right: "pl-6 pr-6 sm:pl-8 sm:pr-20 lg:pl-10 lg:pr-24",
};

const gradientByAlign = {
  left: "bg-gradient-to-r from-black/75 via-black/60 to-black/40",
  center: "bg-gradient-to-r from-black/75 via-black/60 to-black/40",
  right: "bg-gradient-to-l from-black/75 via-black/55 to-transparent",
};

export function Hero({
  eyebrow,
  title,
  description,
  subline,
  primaryCta,
  secondaryCta,
  backgroundImage,
  backgroundPosition = "center",
  align = "left",
  vertical = "center",
  contentWidth = "max-w-[90rem]",
}) {
  const horizontal = horizontalAlignments[align] ?? horizontalAlignments.left;
  const verticalClass = verticalAlignments[vertical] ?? verticalAlignments.center;
  const paddingClass = paddingByAlign[align] ?? paddingByAlign.left;
  const gradientClass = gradientByAlign[align] ?? gradientByAlign.center;

  return (
    <Section background="transparent" className="relative p-0" noContainer>
      <div className="relative h-[90vh] min-h-[480px] w-full overflow-hidden mb-10 pt-20 md:pt-0">
        {backgroundImage ? (
          <Image
            src={backgroundImage}
            alt=""
            fill
            priority
            className="object-cover"
            style={{ objectPosition: backgroundPosition }}
          />
        ) : (
          <div className="h-full w-full bg-brand-red" />
        )}

        <div className={`pointer-events-none absolute inset-0 ${gradientClass}`} />

        <div className="absolute inset-0">
          <div
            className={`mx-auto flex h-full w-full ${contentWidth} ${verticalClass} ${horizontal.justify} ${paddingClass} py-12 sm:py-16 lg:py-20`}
          >
            <div
              className={`w-full max-w-3xl space-y-4 text-white sm:space-y-6 lg:space-y-7 ${horizontal.self} ${horizontal.text}`}
            >
              {eyebrow ? (
                <p className="text-[10px] uppercase tracking-[0.4em] text-white/70 sm:text-xs">
                  {eyebrow}
                </p>
              ) : null}
              {title ? (
                <h1 className="text-3xl font-bold uppercase tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
                  {title}
                </h1>
              ) : null}
              {description ? (
                <p className="whitespace-pre-line text-sm leading-relaxed text-white/80 sm:text-base md:text-lg lg:text-xl">
                  {description}
                </p>
              ) : null}
              <div
                className={`flex flex-col gap-3 ${
                  align === "center"
                    ? "items-center justify-center sm:flex-row"
                    : "items-end sm:flex-row sm:justify-end"
                }`}
              >
                {primaryCta ? (
                  <Button
                    href={primaryCta.href}
                    external={primaryCta.external}
                    variant={primaryCta.variant ?? "primary"}
                    {...primaryCta.props}
                  >
                    {primaryCta.label}
                  </Button>
                ) : null}
                {secondaryCta ? (
                  <Button
                    href={secondaryCta.href}
                    variant={secondaryCta.variant ?? "light"}
                    external={secondaryCta.external}
                    {...secondaryCta.props}
                  >
                    {secondaryCta.label}
                  </Button>
                ) : null}
              </div>
              {subline ? (
                <p className="text-[10px] uppercase tracking-widest text-white/70 sm:text-xs">
                  {subline}
                </p>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

