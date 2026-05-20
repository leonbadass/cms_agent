import { zodResponseFormat } from "openai/helpers/zod";
import { openai } from "../lib/openai.js";
import { OutlineSchema } from "../schemas/outlineSchema.js";

type ArticleIdea = {
  title: string;
  slug: string;
  metaDescription: string;
  keywords: string[];
  difficulty: string;
  reason: string;
};

export async function generateOutline(idea: ArticleIdea) {
  const response = await openai.chat.completions.parse({
    model: "gpt-4.1-mini",
    messages: [
      {
        role: "system",
        content:
          "You are an SEO technical writing strategist for CodingCtrl, a practical developer blog.",
      },
      {
        role: "user",
        content: `
Create a detailed article outline from this article idea.

Article idea:
Title: ${idea.title}
Slug: ${idea.slug}
Meta description: ${idea.metaDescription}
Keywords: ${idea.keywords.join(", ")}
Difficulty: ${idea.difficulty}
Reason: ${idea.reason}

Rules:
- Make the outline practical and beginner-friendly.
- Focus on real project experience, not generic theory.
- Include sections that can later become a full technical blog post.
- Avoid vague headings like "Introduction" or "Conclusion".
        `,
      },
    ],
    response_format: zodResponseFormat(OutlineSchema, "article_outline"),
  });

  const parsed = response.choices[0]?.message.parsed;

  if (!parsed) {
    throw new Error("Failed to generate article outline");
  }

  return parsed;
}
