import z from "astro/zod";

/** Object Types */

export type ImageMetadata = {
  url: URL;
  type: string;
  width: string;
  height: string;
};

/** Enums */

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

/** Collection Types */

export const contactSchema = z.object({
  id: z.string(),
  type: z.enum(["Codeberg", "GitHub", "LinkedIn", "Mastodon"]),
  href: z.string(),
  title: z.string(),
});

export type Contact = z.infer<typeof contactSchema>;

export const projectSchema = z.object({
  id: z.string(),
  company: z.string(),
  name: z.string(),
  years: z.string(),
  details: z.array(z.string()),
  technologies: z.array(technologySchema),
});

export type Project = z.infer<typeof projectSchema>;

export const referenceSchema = z.object({
  id: z.string(),
  company: z.string(),
  title: z.string(),
  years: z.string(),
  details: z.array(z.string()),
});

export type Reference = z.infer<typeof referenceSchema>;

export const skillSchema = z.object({
  id: z.string(),
  name: z.string(),
  icon: z.string(),
  level: z.number(),
  years: z.string(),
});

export type Skill = z.infer<typeof skillSchema>;
