import Link from "next/link";

const baseStyles =
  "inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold uppercase tracking-wide transition focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-red focus-visible:ring-offset-2";

const variants = {
  primary:
    "bg-brand-red text-white shadow-md shadow-brand-red/30 hover:opacity-90",
  secondary:
    "bg-black text-white shadow-md shadow-black/30 hover:opacity-80",
  outline:
    "border border-brand-red text-brand-red hover:bg-brand-red/10",
  ghost: "text-brand-red hover:text-black",
  light:
    "bg-white text-brand-red border border-white/40 hover:bg-white/90",
};

export function Button({
  as = "button",
  href,
  external,
  variant = "primary",
  className = "",
  children,
  ...props
}) {
  const variantStyles = variants[variant] ?? variants.primary;

  if (href) {
    const isExternal =
      typeof external === "boolean"
        ? external
        : href.startsWith("http") || href.startsWith("mailto:");

    if (isExternal) {
      return (
        <a
          href={href}
          className={`${baseStyles} ${variantStyles} ${className}`}
          {...props}
        >
          {children}
        </a>
      );
    }

    return (
      <Link
        href={href}
        className={`${baseStyles} ${variantStyles} ${className}`}
        {...props}
      >
        {children}
      </Link>
    );
  }

  const Comp = as;
  const finalProps = { ...props };
  if (typeof Comp === "string" && Comp === "button" && !("type" in finalProps)) {
    finalProps.type = "button";
  }

  return (
    <Comp
      className={`${baseStyles} ${variantStyles} ${className}`}
      {...finalProps}
    >
      {children}
    </Comp>
  );
}

