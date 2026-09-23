import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Page } from "@/components/porto/page";

export const metadata = { title: "Projects | Julian Salvador" };

type Project = {
  name: string;
  description: string;
  link: string;
};

const projects: Project[] = [
  {
    name: "berg",
    description: "Switzerland Rail Watcher",
    link: "https://github.com/juliansalvador727/berg",
  },
  {
    name: "goosehunt",
    description: "waterlooworks scraper + resume matching",
    link: "https://github.com/juliansalvador727/goosehunt",
  },
  {
    name: "emulator",
    description: "rust nes emulator.",
    link: "https://github.com/juliansalvador727/emulator",
  },
  {
    name: "vmc",
    description: "variational monte carlo simulator",
    link: "https://github.com/UWHPC/Variational-Monte-Carlo",
  },
  {
    name: "reeljobs",
    description:
      "ai-generated videos of real job postings + 3rd @ deltahacks XII.",
    link: "https://devpost.com/software/reeljobs",
  },
];

export default function ProjectsPage() {
  return (
    <Page title="projects">
      <ul className="divide-y divide-border">
        {projects.map((p) => (
          <li key={p.name}>
            <Link
              href={p.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-baseline gap-4 py-3"
            >
              <span className="w-28 shrink-0 font-medium transition-colors group-hover:text-cobalt sm:w-32">
                {p.name}
              </span>
              <span className="flex-1 text-sm text-muted-foreground">
                {p.description}
              </span>
              <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-cobalt" />
            </Link>
          </li>
        ))}
      </ul>
    </Page>
  );
}
