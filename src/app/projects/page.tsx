import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Page } from "@/components/porto/page";
import { PROJECTS } from "@/lib/projects";

export const metadata = { title: "Projects | Julian Salvador" };

export default function ProjectsPage() {
  return (
    <Page title="projects">
      <ul className="divide-y divide-border">
        {PROJECTS.map((p) => (
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
