import { z } from "zod";

export const OutlineSectionSchema = z.object({
  heading: z.string(),
  summary: z.string(),
  keyPoints: z.array(z.string()),
});

export const OutlineSchema = z.object({
  title: z.string(),
  slug: z.string(),
  targetKeywords: z.array(z.string()),
  introductionAngle: z.string(),
  sections: z.array(OutlineSectionSchema),
  conclusionAngle: z.string(),
});

export type Outline = z.infer<typeof OutlineSchema>;
