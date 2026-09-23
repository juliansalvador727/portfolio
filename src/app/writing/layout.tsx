import { Page } from "@/components/porto/page";

// Shared frame for the writing index and every entry.
export default function WritingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Page title="writing">
      <div className="[&_a.underline]:text-cobalt [&_h1]:font-serif [&_h1]:text-3xl [&_h1]:font-normal [&_h1]:tracking-tight">
        {children}
      </div>
    </Page>
  );
}
