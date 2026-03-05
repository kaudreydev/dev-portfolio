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
