/** Standard page heading: serif title, optional muted line, cobalt rule. */
export function Page({
  title,
  description,
  children,
}: {
  title: string;
  description?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="pt-8 sm:pt-12">
      <header className="mb-10">
        <h1 className="font-serif text-5xl leading-none tracking-tight">
          {title}
        </h1>
        {description && (
          <p className="mt-3 text-muted-foreground">{description}</p>
        )}
      </header>
      {children}
    </div>
  );
}

/** Small uppercase mono label used above lists. */
export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-4 font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
      {children}
    </h2>
  );
}
