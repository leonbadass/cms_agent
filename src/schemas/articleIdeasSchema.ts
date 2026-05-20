import { title } from "node:process";
import { z } from "zod";

export const ArticleIdeaSchema = z.object({
  title: z.string(),
  slug: z.string(),
  metaDescription: z.string(),
  keywords: z.array(z.string()),
  difficulty: z.enum(["Beginner", "Intermediate", "Advanced"]),
  reason: z.string(),
});

export const ArticleIdeasResponseSchema = z.object({
  ideas: z.array(ArticleIdeaSchema),
});

export type ArticleIdeaResponse = z.infer<typeof ArticleIdeasResponseSchema>;
