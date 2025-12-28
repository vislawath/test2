/**
 * GitHub Commit Sync
 * SCRUM-14: Sync GitHub commits
 */

export class GitHubSync {
  constructor(accessToken, repos) {
    this.accessToken = accessToken;
    this.repos = repos;
  }

  async syncCommits(since, until) {
    const allCommits = [];
    
    for (const repo of this.repos) {
      const commits = await this.fetchRepoCommits(repo, since, until);
      allCommits.push(...commits.map(c => ({
        ...c,
        repo: repo.full_name
      })));
    }
    
    return allCommits.sort((a, b) => 
      new Date(b.commit.author.date) - new Date(a.commit.author.date)
    );
  }

  async fetchRepoCommits(repo, since, until) {
    const params = new URLSearchParams({ since, until, per_page: '100' });
    
    const response = await fetch(
      `https://api.github.com/repos/${repo.full_name}/commits?${params}`,
      {
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
          Accept: 'application/vnd.github.v3+json'
        }
      }
    );
    
    if (!response.ok) return [];
    return response.json();
  }

  transformToActivityLog(commit, repo) {
    return {
      type: 'commit',
      source: 'github',
      externalId: commit.sha,
      title: commit.commit.message.split('\n')[0],
      description: commit.commit.message,
      author: commit.author?.login || commit.commit.author.name,
      timestamp: commit.commit.author.date,
      metadata: {
        repo,
        sha: commit.sha,
        url: commit.html_url
      }
    };
  }
}
