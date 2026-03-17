import base from "@/i18n/en.json";
import z from "astro/zod";

export type LocaleSchema = typeof base;

export type ImageMetadata = {
  url: URL;
  type: string;
  width: string;
  height: string;
};

export const referenceSchema = z.object({
  id: z.string(),
  company: z.string(),
  title: z.string(),
  startDate: z.string(),
  endDate: z.string(),
  description: z.string(),
});

export type Reference = z.infer<typeof referenceSchema>;

export const technologySchema = z.enum([
  "Accessibility",
  "Agile",
  "Angular",
  "AngularJS",
  "Astro",
  "Azure DevOps",
  "C#/.NET",
  "CSS",
  "Docker",
  "Elasticsearch",
  "Excel",
  "Express",
  "GitHub Enterprise",
  "JavaScript",
  "Jenkins",
  "MongoDB",
  "Next.js",
  "Node.js",
  "PostgreSQL",
  "React",
  "SharePoint",
  "SQL",
  "TypeScript",
  "Visual Basic",
]);

export type Technology = z.infer<typeof technologySchema>;

export const projectSchema = z.object({
  id: z.string(),
  company: z.string(),
  name: z.string(),
  startDate: z.string(),
  endDate: z.string(),
  description: z.string(),
  technologies: z.array(technologySchema),
});

export type Project = z.infer<typeof projectSchema>;

export const contactSchema = z.object({
  id: z.string(),
  type: z.enum(["Codeberg", "GitHub", "LinkedIn", "Mastodon"]),
  href: z.string(),
  title: z.string(),
});

export type Contact = z.infer<typeof contactSchema>;
