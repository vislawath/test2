/**
 * Jira Sprint Sync
 * SCRUM-16: Jira sprint sync
 * 
 * Status: In Progress
 */

export class JiraSync {
  constructor(baseUrl, accessToken) {
    this.baseUrl = baseUrl;
    this.accessToken = accessToken;
  }

  async fetchBoards() {
    const response = await this.apiRequest('/rest/agile/1.0/board');
    return response.values || [];
  }

  async fetchSprints(boardId) {
    const response = await this.apiRequest(`/rest/agile/1.0/board/${boardId}/sprint`);
    return response.values || [];
  }

  async fetchSprintIssues(sprintId) {
    const response = await this.apiRequest(`/rest/agile/1.0/sprint/${sprintId}/issue`);
    return response.issues || [];
  }

  async apiRequest(endpoint) {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
        Accept: 'application/json'
      }
    });
    
    if (!response.ok) {
      throw new Error(`Jira API error: ${response.status}`);
    }
    
    return response.json();
  }

  // TODO: Implement sprint sync to database
  // TODO: Add issue status mapping
}
