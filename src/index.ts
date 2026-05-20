import dotenv from "dotenv";
import { getRepoInfo } from "./tools/github.js";
import { generateIdeasFromRepo } from "./workflows/generateIdeasFromRepo.js";

dotenv.config();

async function main() {
  const repo = await getRepoInfo("leonbadass", "nextjs-tech-blog-cms");

  const ideas = await generateIdeasFromRepo(repo);

  console.log(JSON.stringify(ideas, null, 2));
}

main();
