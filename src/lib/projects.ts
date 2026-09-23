// Shown in this order on /projects; the home page takes the first few.
export type Project = {
  name: string;
  description: string;
  link: string;
};

export const PROJECTS: Project[] = [
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
