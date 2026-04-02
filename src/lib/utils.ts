import { clsx, type ClassValue } from "clsx";
import { parse } from "node-html-parser";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getSVG(name: string) {
  const filepath = `/src/images/${name}.svg`;
  const files = import.meta.glob<string>("/src/images/**/*.svg", {
    query: "?raw",
    import: "default",
    eager: true,
  });

  if (!(filepath in files)) {
    throw new Error(`${filepath} not found`);
  }

  const root = parse(files[filepath]);

  const svg = root.querySelector("svg");

  if (!svg) {
    throw new Error(`No <svg> element found in ${filepath}`);
  }

  const { attributes, innerHTML } = svg;

  return {
    attributes,
    innerHTML,
  };
}
