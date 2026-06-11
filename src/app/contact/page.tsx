import Link from "next/link";
import { Github, Linkedin, Mail, Code2 } from "lucide-react";
import { ScreenFrame } from "@/components/p3r/screen";

export const metadata = { title: "Contact | Julian Salvador" };

const links = [
  {
    label: "Email",
    value: "jesalvad@uwaterloo.ca",
    href: "mailto:jesalvad@uwaterloo.ca",
    icon: Mail,
  },
  {
    label: "GitHub",
    value: "juliansalvador727",
    href: "https://github.com/juliansalvador727",
    icon: Github,
  },
  {
    label: "LinkedIn",
    value: "in/juliansalvador727",
    href: "https://www.linkedin.com/in/julian-salvador727",
    icon: Linkedin,
  },
  {
    label: "Source",
    value: "this site's code",
    href: "https://github.com/juliansalvador727/portfolio",
    icon: Code2,
  },
];

export default function ContactPage() {
  return (
    <ScreenFrame title="Contact">
      <ul className="space-y-3">
        {links.map((l, i) => (
          <li
            key={l.label}
            className="p3r-enter-right"
            style={{ "--d": `${0.15 + i * 0.08}s` } as React.CSSProperties}
          >
            <Link
              href={l.href}
              target={l.href.startsWith("http") ? "_blank" : undefined}
              rel={
                l.href.startsWith("http") ? "noopener noreferrer" : undefined
              }
              className="group flex items-center gap-4 border border-white/15 bg-white/5 px-4 py-3 transition-all hover:border-p3r-red hover:bg-white hover:text-black"
              style={{
                clipPath:
                  "polygon(0 0, calc(100% - 1.1rem) 0, 100% 100%, 0 100%)",
              }}
            >
              <span className="flex h-10 w-10 shrink-0 -skew-x-12 items-center justify-center bg-p3r-navy text-p3r-cyan transition-colors group-hover:bg-p3r-red group-hover:text-white">
                <l.icon className="h-5 w-5 skew-x-12" />
              </span>
              <span>
                <span className="block text-sm font-black uppercase italic">
                  {l.label}
                </span>
                <span className="block text-xs text-white/60 group-hover:text-black/60">
                  {l.value}
                </span>
              </span>
              <span
                aria-hidden
                className="ml-auto font-black text-p3r-sky opacity-0 transition-opacity group-hover:opacity-100 group-hover:text-p3r-red"
              >
                ▶
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </ScreenFrame>
  );
}
