"use client";

import Link from "next/link";
import { ModeToggle } from "@/components/mode";

export function Navbar() {
  return (
    <nav className="mt-8">
      <div className="mx-auto flex max-w-xl items-center justify-between py-3">
        {/* Left side - name */}
        <Link href="/" className="text-base font-semibold">
          julian salvador
        </Link>

        {/* Right side - links */}
        <div className="flex items-center gap-2 sm:gap-10">
          {/* <Link
            href="/resume.pdf"
            target="_blank" // open in a new tab
            rel="noopener noreferrer"
            className="text-sm font-medium hover:underline underline-offset-4"
          >
            resume
          </Link> */}
          <Link
            href="/projects"
            className="text-sm font-medium hover:underline underline-offset-4"
          >
            projects
          </Link>
          <Link
            href="/fun-stuff"
            className="text-sm font-medium hover:underline underline-offset-4"
          >
            fun stuff
          </Link>
          <ModeToggle />
        </div>
      </div>
    </nav>
  );
}
