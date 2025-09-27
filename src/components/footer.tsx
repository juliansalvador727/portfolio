"use client";

import Link from "next/link";
import { Github, Linkedin, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="">
      <div className="mx-auto max-w-xl flex items-center gap-6 border-border border-t py-2">
        {/* GitHub */}
        <Link
          href="https://github.com/juliansalvador727"
          target="_blank"
          rel="noopener noreferrer"
          className="text-foreground hover:text-primary transition"
          aria-label="GitHub"
        >
          <Github className="h-5 w-5" />
        </Link>

        {/* LinkedIn */}
        <Link
          href="https://www.linkedin.com/in/juliansalvador727"
          target="_blank"
          rel="noopener noreferrer"
          className="text-foreground hover:text-primary transition"
          aria-label="LinkedIn"
        >
          <Linkedin className="h-5 w-5" />
        </Link>

        {/* Email */}
        <Link
          href="mailto:your-email@example.com"
          className="text-foreground hover:text-primary transition"
          aria-label="Email"
        >
          <Mail className="h-5 w-5" />
        </Link>

        {/* Repository / Code Brackets */}
        <Link
          href="https://github.com/juliansalvador727/portfolio"
          target="_blank"
          rel="noopener noreferrer"
          className="text-foreground hover:text-primary transition text-lg font-mono"
          aria-label="Repository"
        >
          {"</>"}
        </Link>
      </div>
    </footer>
  );
}
