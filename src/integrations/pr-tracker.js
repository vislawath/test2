/**
 * Pull Request Activity Tracker
 * SCRUM-15: Track PR activity
 */

export class PRTracker {
  constructor(accessToken) {
    this.accessToken = accessToken;
  }

  async fetchPullRequests(repo, state = 'all', since) {
    const params = new URLSearchParams({
      state,
      sort: 'updated',
      direction: 'desc',
      per_page: '100'
    });
    
    const response = await fetch(
      `https://api.github.com/repos/${repo}/pulls?${params}`,
      {
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
          Accept: 'application/vnd.github.v3+json'
        }
      }
    );
    
    const prs = await response.json();
    
    if (since) {
      const sinceDate = new Date(since);
      return prs.filter(pr => new Date(pr.updated_at) >= sinceDate);
    }
    
    return prs;
  }

  async fetchPRReviews(repo, prNumber) {
    const response = await fetch(
      `https://api.github.com/repos/${repo}/pulls/${prNumber}/reviews`,
      {
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
          Accept: 'application/vnd.github.v3+json'
        }
      }
    );
    
    return response.json();
  }

  categorizePRActivity(pr) {
    // TODO: Add review comments tracking
    // TODO: Add timeline events
    return {
      type: 'pull_request',
      action: this.getPRAction(pr),
      pr: {
        number: pr.number,
        title: pr.title,
        state: pr.state,
        merged: pr.merged_at !== null
      }
    };
  }

  getPRAction(pr) {
    if (pr.merged_at) return 'merged';
    if (pr.state === 'closed') return 'closed';
    if (pr.draft) return 'drafted';
    return 'opened';
  }
}
