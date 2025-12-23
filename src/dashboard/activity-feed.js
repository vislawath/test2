/**
 * Activity Feed Widget
 * SCRUM-10: Build activity feed widget
 */

export class ActivityFeed {
  constructor(container, options = {}) {
    this.container = container;
    this.limit = options.limit || 20;
    this.activities = [];
  }

  async fetchActivities(teamId, dateRange) {
    const response = await fetch(`/api/activities?team=${teamId}&from=${dateRange.from}&to=${dateRange.to}`);
    this.activities = await response.json();
    return this.activities;
  }

  render() {
    const html = this.activities.map(activity => `
      <div class="activity-item" data-type="${activity.type}">
        <div class="activity-avatar">
          <img src="${activity.user.avatar}" alt="${activity.user.name}" />
        </div>
        <div class="activity-content">
          <span class="activity-user">${activity.user.name}</span>
          <span class="activity-action">${activity.action}</span>
          <span class="activity-target">${activity.target}</span>
        </div>
        <time class="activity-time">${this.formatTime(activity.timestamp)}</time>
      </div>
    `).join('');

    this.container.innerHTML = html;
  }

  formatTime(timestamp) {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now - date;
    
    if (diff < 60000) return 'just now';
    if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
    if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
    return date.toLocaleDateString();
  }
}
