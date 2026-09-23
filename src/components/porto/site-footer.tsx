import Link from "next/link";
import { Github, Linkedin, Mail } from "lucide-react";
import { Cercadura } from "@/components/porto/azulejo";

export const SOCIALS = [
  {
    label: "GitHub",
    href: "https://github.com/juliansalvador727",
    icon: Github,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/julian-salvador727",
    icon: Linkedin,
  },
  { label: "Email", href: "mailto:jesalvad@uwaterloo.ca", icon: Mail },
];

export function SiteFooter() {
  return (
    <footer className="mt-16">
      <Cercadura id="footer-border" height={18} className="opacity-70" />
      <div className="flex items-center justify-between gap-4 py-6 text-sm text-muted-foreground">
        <span className="font-mono text-xs">
          © {new Date().getFullYear()} julian salvador
        </span>
        <div className="flex items-center gap-4">
          {SOCIALS.map((s) => (
            <Link
              key={s.label}
              href={s.href}
              target={s.href.startsWith("http") ? "_blank" : undefined}
              rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
              aria-label={s.label}
              className="transition-colors hover:text-cobalt"
            >
              <s.icon className="h-4 w-4" />
            </Link>
          ))}
          <Link
            href="https://github.com/juliansalvador727/portfolio"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Source code"
            className="font-mono text-xs transition-colors hover:text-cobalt"
          >
            {"</>"}
          </Link>
        </div>
      </div>
    </footer>
  );
}
