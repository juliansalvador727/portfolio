"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      aria-label="Toggle dark mode"
      className="relative flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-cobalt"
    >
      <Sun className="h-4 w-4 scale-100 transition-transform dark:scale-0" />
      <Moon className="absolute h-4 w-4 scale-0 transition-transform dark:scale-100" />
    </button>
  );
}
