import { file } from "astro/loaders";
import { defineCollection } from "astro:content";
import { referenceSchema } from "~/types";

const experience = defineCollection({
  loader: file("src/content/experience.json"),
  schema: referenceSchema,
});

const projects = defineCollection({
  loader: file("src/content/projects.json"),
  schema: referenceSchema,
});

export const collections = { experience, projects };
