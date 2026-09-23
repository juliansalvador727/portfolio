import Link from "next/link";
import { ArrowUpRight, Code2, Github, Linkedin, Mail } from "lucide-react";
import { Page } from "@/components/porto/page";

export const metadata = { title: "Contact | Julian Salvador" };

const links = [
  {
    label: "email",
    value: "jesalvad@uwaterloo.ca",
    href: "mailto:jesalvad@uwaterloo.ca",
    icon: Mail,
  },
  {
    label: "github",
    value: "juliansalvador727",
    href: "https://github.com/juliansalvador727",
    icon: Github,
  },
  {
    label: "linkedin",
    value: "in/julian-salvador727",
    href: "https://www.linkedin.com/in/julian-salvador727",
    icon: Linkedin,
  },
  {
    label: "source",
    value: "this site's code",
    href: "https://github.com/juliansalvador727/portfolio",
    icon: Code2,
  },
];

export default function ContactPage() {
  return (
    <Page title="contact" description="say olá.">
      <ul className="divide-y divide-border">
        {links.map((l) => (
          <li key={l.label}>
            <Link
              href={l.href}
              target={l.href.startsWith("http") ? "_blank" : undefined}
              rel={l.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="group flex items-center gap-4 py-3"
            >
              <l.icon className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-cobalt" />
              <span className="w-20 font-medium">{l.label}</span>
              <span className="flex-1 text-sm text-muted-foreground">
                {l.value}
              </span>
              <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-cobalt" />
            </Link>
          </li>
        ))}
      </ul>
    </Page>
  );
}
