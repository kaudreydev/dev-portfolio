import { file } from "astro/loaders";
import { defineCollection } from "astro:content";
import {
  contactSchema,
  projectSchema,
  referenceSchema,
  skillSchema,
} from "~/types";

const experience = defineCollection({
  loader: file("src/content/experience.json"),
  schema: referenceSchema,
});

const projects = defineCollection({
  loader: file("src/content/projects.json"),
  schema: projectSchema,
});

const contact = defineCollection({
  loader: file("src/content/contact.json"),
  schema: contactSchema,
});

const skills = defineCollection({
  loader: file("src/content/skills.json"),
  schema: skillSchema,
});

export const collections = { experience, projects, contact, skills };
