import base from "@/i18n/en.json";

export type LocaleSchema = typeof base;

export type ImageMetadata = {
  url: URL;
  type: string;
  width: string;
  height: string;
};
