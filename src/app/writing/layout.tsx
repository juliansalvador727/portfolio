import { ScreenFrame } from "@/components/p3r/screen";

// Dictionary-style frame shared by the writing index and every entry.
export default function WritingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ScreenFrame title="Writing">{children}</ScreenFrame>;
}
