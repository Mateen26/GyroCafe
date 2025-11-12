const backgroundClasses = {
  white: "bg-white text-brand-dark",
  red: "bg-brand-red text-white",
  light: "bg-brand-muted text-brand-dark",
  transparent: "",
};

export function Section({
  id,
  background = "white",
  className = "",
  containerClassName = "",
  children,
  noContainer = false,
}) {
  const bgClass = backgroundClasses[background] ?? backgroundClasses.white;

  return (
    <section
      id={id}
      className={`${bgClass} w-full ${className}`}
    >
      {noContainer ? (
        children
      ) : (
        <div
          className={`mx-auto w-full max-w-[110rem] px-6 lg:px-16 ${containerClassName}`}
        >
          {children}
        </div>
      )}
    </section>
  );
}

