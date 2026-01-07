import Link from "next/link";
import { Button } from "@/components/ui/button";
import ProjectGroup from "@/components/project";

// Replace these with your real images (or use /public paths as strings)
import UWLogo from "@/components/icons/UWLogo.png"; // placeholder.
import WiiGym from "@/components/images/WiiGym.png";
import c2c from "@/components/images/c2c.png";

type Project = Parameters<typeof ProjectGroup>[0];

const PROJECTS: Project[] = [
  {
    title: "c2c",
    description:
      "Interactive country-to-country shortest-path visualization via BFS.",
    techStack: ["Next.js", "TypeScript"],
    image: {
      src: c2c, // swap to real screenshot
      alt: "Country to Country visualized.",
    },
    links: {
      live: "https://c2c-visualized-v2.vercel.app/",
      github: "https://github.com/juliansalvador727/c2c_visualized_v2",
    },
    featured: false,
  },
  {
    title: "WiiGym",
    description:
      "Video calling with pose tracking and a leaderboard to make workouts feel social and competitive.",
    techStack: ["WebRTC", "MediaPipe", "Websockets", "MongoDB", "Node.js"],
    image: {
      src: WiiGym,
      alt: "WiiGym",
    },
    links: {
      github: "https://github.com/sebandx/nwhacks",
      // demo: "https://...",
    },
  },
];

export default function ProjectsPage() {
  return (
    <>
      {/* Grid */}
      <div className="space-y-4">
        {PROJECTS.map((p) => (
          <ProjectGroup key={p.title} {...p} />
        ))}
      </div>

      {/* Footer CTA */}
      <p className="text-sm pt-8">
        For more projects check out my{" "}
        <span>
          <Link
            className="underline"
            href="https://www.github.com/juliansalvador727"
            target="_blank"
            rel="noopener noreferrer"
          >
            Github.
          </Link>
        </span>
      </p>
    </>
  );
}
