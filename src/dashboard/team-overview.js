/**
 * Team Overview Section
 * SCRUM-12: Add team overview section
 */

export class TeamOverview {
  constructor(teamId) {
    this.teamId = teamId;
    this.members = [];
    this.stats = {};
  }

  async loadTeamData() {
    const [members, stats] = await Promise.all([
      this.fetchMembers(),
      this.fetchStats()
    ]);
    
    this.members = members;
    this.stats = stats;
    return { members, stats };
  }

  async fetchMembers() {
    const response = await fetch(`/api/teams/${this.teamId}/members`);
    return response.json();
  }

  async fetchStats() {
    const response = await fetch(`/api/teams/${this.teamId}/stats`);
    return response.json();
  }

  getMemberActivity(memberId) {
    const member = this.members.find(m => m.id === memberId);
    if (!member) return null;
    
    return {
      commits: member.stats?.commits || 0,
      prs: member.stats?.pullRequests || 0,
      reviews: member.stats?.reviews || 0,
      lastActive: member.lastActivityAt
    };
  }

  getTeamSummary() {
    return {
      totalMembers: this.members.length,
      activeToday: this.members.filter(m => this.isActiveToday(m)).length,
      totalCommits: this.stats.totalCommits || 0,
      avgVelocity: this.stats.averageVelocity || 0
    };
  }

  isActiveToday(member) {
    if (!member.lastActivityAt) return false;
    const today = new Date().toDateString();
    return new Date(member.lastActivityAt).toDateString() === today;
  }
}
