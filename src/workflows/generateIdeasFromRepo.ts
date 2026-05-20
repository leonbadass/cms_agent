import OpenAI from "openai";
import { zodResponseFormat } from "openai/helpers/zod";
import { ArticleIdeasResponseSchema } from "../schemas/articleIdeasSchema.js";
import { openai } from "../lib/openai.js";

type RepoData = {
  name: string;
  description: string;
  language: string;
  topics: string[];
};

export async function generateIdeasFromRepo(repo: RepoData) {
  const response = await openai.chat.completions.parse({
    model: "gpt-4.1-mini",
    messages: [
      {
        role: "system",
        content: "You are an AI content strategist for CodingCtrl.",
      },
      {
        role: "user",
        content: `
Analyze this GitHub repository and generate SEO-rich article ideas.

Repository Name:
${repo.name}

Description:
${repo.description}

Main Language:
${repo.language}

Topics:
${repo.topics.join(", ")}
        `,
      },
    ],
    response_format: zodResponseFormat(
      ArticleIdeasResponseSchema,
      "article_ideas",
    ),
  });
  if (!response.choices[0]) {
    throw new Error("No response from OpenAI");
  }

  return response.choices[0].message.parsed;
}
