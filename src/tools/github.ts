export async function getRepoInfo(owner: string, repo: string) {
  const response = await fetch(`https://api.github.com/repos/${owner}/${repo}`);

  if (!response.ok) {
    throw new Error("Failed to fetch repository");
  }

  return response.json();
}
