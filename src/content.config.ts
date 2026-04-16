import { file } from "astro/loaders";
import { defineCollection } from "astro:content";
import {
  contactSchema,
  projectSchema,
  referenceSchema,
  skillSchema,
} from "~/types";

const contact = defineCollection({
  loader: file("src/content/contact.json"),
  schema: contactSchema,
});

const experience = defineCollection({
  loader: file("src/content/experience.json"),
  schema: referenceSchema,
});

const projects = defineCollection({
  loader: file("src/content/projects.json"),
  schema: projectSchema,
});

const skills = defineCollection({
  loader: file("src/content/skills.json"),
  schema: skillSchema,
});

export const collections = { contact, experience, projects, skills };
