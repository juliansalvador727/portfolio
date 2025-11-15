"use client";

interface ProjectProps {
  name: string;
  img: string;
  tools: string[];
  desc: string;
  github?: string;
  demo?: string;
  tags?: string[];
}

export function Project({
  name,
  img,
  tools,
  desc,
  github,
  demo,
  tags,
}: ProjectProps) {
  return (
    <div className="p-4 rounded-xl shadow border hover:shadow-lg transition">
      <img src={img} alt={name} className="rounded-md mb-4" />

      <h2 className="text-xl font-bold">{name}</h2>
      <p className="text-gray-600 text-sm mt-1">{desc}</p>

      <div className="flex flex-wrap gap-2 mt-3">
        {tools.map((tool) => (
          <span
            key={tool}
            className="px-2 py-1 text-xs bg-gray-200 rounded-full"
          >
            {tool}
          </span>
        ))}
      </div>

      <div className="flex gap-4 mt-4">
        {demo && (
          <a className="text-blue-500 underline" href={demo}>
            Demo
          </a>
        )}
        {github && (
          <a className="text-blue-500 underline" href={github}>
            GitHub
          </a>
        )}
      </div>
    </div>
  );
}
