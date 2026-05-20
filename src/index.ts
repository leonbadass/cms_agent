import dotenv from "dotenv";
import { getRepoInfo } from "./tools/github.js";
import { generateIdeasFromRepo } from "./workflows/generateIdeasFromRepo.js";
import { generateOutline } from "./workflows/generateOutline.js";

dotenv.config();

async function main() {
  const repo = await getRepoInfo("leonbadass", "nextjs-tech-blog-cms");

  const ideas = await generateIdeasFromRepo(repo);

  const firstIdea = ideas.ideas[0];

  if (!firstIdea) {
    throw new Error("No article ideas generated");
  }

  const outline = await generateOutline(firstIdea);

  console.log(JSON.stringify(outline, null, 2));
}

main();
