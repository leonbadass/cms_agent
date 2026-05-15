import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function main() {
  const response = await client.chat.completions.create({
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
  });

  if (response.choices[0] === undefined) {
    return;
  }

  console.log(response.choices[0].message.content);
}

main();
