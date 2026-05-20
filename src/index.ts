import OpenAI from "openai";
import dotenv from "dotenv";
import { zodResponseFormat } from "openai/helpers/zod";
import { ArticleIdeasResponseSchema } from "./schemas/articleIdeasSchema.js";

dotenv.config();

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function main() {
  const response = await client.chat.completions.parse({
    model: "gpt-4.1-mini",
    messages: [
      {
        role: "system",
        content:
          "You are an AI agent that generates SEO-rich blog article ideas for CodingCtrl.",
      },
      {
        role: "user",
        content:
          "I am building a Next.js CMS with Supabase authentication and Tailwind CSS.",
      },
    ],
    response_format: zodResponseFormat(
      ArticleIdeasResponseSchema,
      "article_ideas",
    ),
  });

  if (response.choices[0] === undefined) {
    return;
  }

  console.log(response.choices[0].message.parsed);
}

main();
