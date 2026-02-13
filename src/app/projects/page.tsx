import Link from "next/link";

type Project = {
  name: string;
  description: string;
  link: string | null;
};

const projects: Record<string, Project[]> = {
  software: [
    {
      name: "izhnet",
      description: "𝑁-neuron izhikevich network. (in progress)",
      link: "https://github.com/juliansalvador727/izhnet",
    },
    {
      name: "axonhh",
      description: "hodgkin–huxley neuron model solver. (in progress)",
      link: "https://github.com/juliansalvador727/axonhh",
    },
    {
      name: "emulator",
      description: "rust nes emulator.",
      link: "https://github.com/juliansalvador727/emulator",
    },
    {
      name: "reeljobs",
      description:
        "ai-generated videos of real job postings + 3rd @ deltahacks XII.",
      link: "https://devpost.com/software/reeljobs",
    },
    {
      name: "c2c",
      description: "bfs on a world map.",
      link: "https://c2c-visualized-v2.vercel.app/",
    },
    {
      name: "jakegen",
      description: "jake's resume for people who don't like latex.",
      link: "https://jake-gen-v2.vercel.app/",
    },
    {
      name: "quickflix",
      description: "digital camera photo renamer.",
      link: "https://github.com/juliansalvador727/quickflix",
    },
  ],
  hardware: [
    {
      name: "actuate",
      description: "rf-based wireless game controller w/ <5ms latency.",
      link: "https://github.com/juliansalvador727/actuate",
    },
    {
      name: "lumen",
      description:
        "500khz bandwidth oscilloscope with lcd display (in progress).",
      link: "",
    },
    {
      name: "apls",
      description:
        "scaleable hospital patient bluetooth esp32 monitoring system.",
      link: "",
    },
    {
      name: "nfc pcb card",
      description: "custom pcb with copper antenna sharing contact info.",
      link: "",
    },
  ],
} as const;

export default function ProjectsPage() {
  return (
    <main>
      <div className="space-y-1">
        {Object.entries(projects).map(([c, p]) => (
          <div key={c}>
            <p>{c}:</p>
            <ul className="list-none">
              {p.map((project) => (
                <li key={project.name} className="flex items-start gap-1">
                  <span className="mt-0.5 shrink-0">‣</span>
                  <span className="min-w-0 break-words">
                    {project.link ? (
                      <Link
                        className="underline"
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {project.name}
                      </Link>
                    ) : (
                      <button
                        type="button"
                        className="relative inline cursor-pointer group"
                      >
                        <span className="underline">{project.name}</span>
                        <span className="pointer-events-none absolute left-0 top-full z-10 mt-1 w-max max-w-[calc(100vw-2rem)] whitespace-normal rounded border bg-background px-2 py-1 text-left text-xs opacity-0 transition-opacity duration-200 delay-0 group-hover:opacity-100 group-hover:delay-[1000ms] group-active:opacity-100 group-active:delay-0 group-focus-visible:opacity-100 group-focus-visible:delay-0 sm:max-w-xs sm:whitespace-nowrap">
                          link/source available upon request
                        </span>
                      </button>
                    )}
                    <span> — {project.description}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </main>
  );
}
