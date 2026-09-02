import type { CreateChallengeOptions, DeriveKeyFunction } from "altcha-lib";
import type { verify } from "altcha-lib/frameworks/shared";
import type {
  AltchaMiddlewareOptions,
  AltchaResult,
  AltchaOptions as BaseAltchaOptions,
} from "altcha-lib/frameworks/types";
import type { APIContext } from "astro";
import z from "astro/zod";

/** Library Types */

export type Altcha = {
  challengeHandler: (_req: AltchaRequest) => Promise<Response>;
  withMiddleware: (
    handler: (req: AltchaRequest) => Promise<Response> | Response,
    options?: AltchaMiddlewareOptions,
  ) => (req: AltchaRequest) => Promise<Response>;
  verifyHandler: (context: APIContext) => Promise<Response>;
  getPayloadFromRequest: (
    req: AltchaRequest,
    cookieName?: string,
  ) => Promise<string | undefined>;
  middleware: (
    req: AltchaRequest,
    throwOnFailure?: boolean,
  ) => Promise<Response | AltchaResult>;
  verify: typeof verify;
};

// Override the base type to ensure these options cannot be `undefined`,
// because the `createChallenge` method expects them to be there since
// we are not using Altcha's Sentinel feature.
export interface AltchaOptions extends BaseAltchaOptions {
  createChallengeParameters: () => Pick<
    CreateChallengeOptions,
    "algorithm" | "cost"
  > &
    Partial<CreateChallengeOptions>;
  deriveKey: DeriveKeyFunction;
}

export type AltchaRequest = Request & { __altcha: AltchaResult };

/** Input Types */

export const contactMessage = z.object({
  name: z.string().max(100, "Name must be at most 100 characters."),
  email: z.email().max(150, "E-mail must be at most 150 characters."),
  subject: z
    .string()
    .max(150, "Subject must be at most 150 characters.")
    .optional(),
  message: z.string().max(500, "Message must be at most 500 characters."),
});

export type ContactMessage = z.infer<typeof contactMessage>;

/** Value Types */

export type ImageMetadata = {
  url: URL;
  type: string;
  width: string;
  height: string;
};

export type NavItem = {
  id: string;
  path: string;
  text: string;
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
