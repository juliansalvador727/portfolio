import Link from "next/link";
import { FileText } from "lucide-react";
import { Page } from "@/components/porto/page";

export const metadata = { title: "Resume | Julian Salvador" };

export default function ResumePage() {
  return (
    <Page title="resume">
      <Link
        href="/resume.pdf"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 rounded-md bg-cobalt px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
      >
        <FileText className="h-4 w-4" /> open pdf
      </Link>
    </Page>
  );
}
