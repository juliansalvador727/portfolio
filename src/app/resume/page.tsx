import Link from "next/link";
import { FileText } from "lucide-react";
import { ScreenFrame } from "@/components/p3r/screen";

export const metadata = { title: "Resume | Julian Salvador" };

export default function ResumePage() {
  return (
    <ScreenFrame title="Resume">
      <div className="space-y-6">
        <p
          className="p3r-enter-up text-base leading-relaxed text-white/85"
          style={{ "--d": "0.15s" } as React.CSSProperties}
        >
          The one-page version: computer engineering at uwaterloo, embedded
          software and systems programming, currently interning in aerospace.
        </p>

        <Link
          href="/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="p3r-enter-up p3r-shine relative inline-flex -skew-x-12 items-center gap-3 overflow-hidden bg-gradient-to-r from-p3r-red to-p3r-pink px-8 py-3 text-lg font-black uppercase italic text-white shadow-[0_0_28px_rgba(230,0,51,0.55)] transition-transform hover:scale-105"
          style={{ "--d": "0.25s" } as React.CSSProperties}
        >
          <span className="flex skew-x-12 items-center gap-3">
            <FileText className="h-5 w-5" /> Open PDF
          </span>
        </Link>

        <p
          className="p3r-enter-up text-xs text-white/50"
          style={{ "--d": "0.35s" } as React.CSSProperties}
        >
          opens in a new tab. prefer the interactive version? check{" "}
          <Link href="/about" className="underline hover:text-p3r-cyan">
            status
          </Link>
          ,{" "}
          <Link href="/experience" className="underline hover:text-p3r-cyan">
            experience
          </Link>{" "}
          and{" "}
          <Link href="/projects" className="underline hover:text-p3r-cyan">
            projects
          </Link>
          .
        </p>
      </div>
    </ScreenFrame>
  );
}
