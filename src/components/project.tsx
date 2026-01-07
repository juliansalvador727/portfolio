import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";

type ProjectLinks = {
  github?: string;
  live?: string;
};

export type ProjectGroupProps = {
  title: string;
  description: string;
  techStack: string[];
  image: {
    src: StaticImageData | string;
    alt: string;
  };
  links?: ProjectLinks;
  featured?: boolean;
};

function IconLinkButton({
  href,
  label,
  icon: Icon,
}: {
  href?: string;
  label: string;
  icon: React.ElementType;
}) {
  if (!href) return null;

  const isExternal = /^https?:\/\//.test(href);

  return (
    <Button asChild size="sm" variant="outline">
      <Link
        href={href}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
        className="flex items-center gap-1.5"
      >
        <Icon className="h-4 w-4" />
        {label}
      </Link>
    </Button>
  );
}

export default function ProjectGroup({
  title,
  description,
  techStack,
  image,
  links,
  featured = false,
}: ProjectGroupProps) {
  return (
    <article
      className={[
        "group overflow-hidden rounded-2xl border bg-background",
        "transition-all hover:-translate-y-0.5 hover:shadow-md",
        featured ? "border-foreground/15" : "border-border",
      ].join(" ")}
    >
      {/* Project Image */}
      <div className="relative aspect-[16/10] w-full overflow-hidden">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority={featured}
        />
      </div>

      <div className="flex flex-col gap-4 p-5">
        {/* Name */}
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-semibold tracking-tight">{title}</h3>
          {featured && (
            <span className="rounded-full border px-2 py-0.5 text-xs text-foreground/80">
              featured
            </span>
          )}
        </div>

        {/* Tech Stack */}
        <ul className="flex flex-wrap gap-2">
          {techStack.map((tech) => (
            <li
              key={tech}
              className="rounded-full border bg-muted/30 px-2.5 py-1 text-xs text-foreground/80"
            >
              {tech}
            </li>
          ))}
        </ul>

        {/* Description */}
        <p className="text-sm leading-relaxed text-foreground/90">
          {description}
        </p>

        {/* Links */}
        {(links?.live || links?.github) && (
          <div className="flex flex-wrap gap-2 pt-1">
            <IconLinkButton
              href={links?.live}
              label="Link"
              icon={ExternalLink}
            />
            <IconLinkButton href={links?.github} label="GitHub" icon={Github} />
          </div>
        )}
      </div>
    </article>
  );
}
