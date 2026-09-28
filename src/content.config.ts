import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { glob } from "astro/loaders";

const works = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/works" }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    lang: z.enum(["zh", "en"]),
    icon: z.string().default(""),
    order: z.number().default(99),
    featured: z.boolean().default(false),
    period: z.string().optional(),
    org: z.string().optional(),
    tech: z.array(z.string()).default([]),
    problem: z.string().default(""),
    approach: z.array(z.string()).default([]),
    impact: z.array(z.string()).default([]),
    links: z
      .array(z.object({ label: z.string(), url: z.string() }))
      .default([]),
    todo: z.array(z.string()).default([]),
  }),
});

const notes = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/notes" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    lang: z.enum(["zh", "en"]),
    pubDate: z.coerce.date(),
    langGroup: z.string(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

export const collections = { works, notes };
