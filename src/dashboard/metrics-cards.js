/**
 * Metrics Cards Component
 * SCRUM-11: Implement metrics cards
 */

export const METRIC_TYPES = {
  COMMITS: 'commits',
  PRS: 'pull_requests',
  REVIEWS: 'reviews',
  VELOCITY: 'velocity'
};

export function createMetricCard(type, value, change) {
  const config = getMetricConfig(type);
  
  return {
    type,
    title: config.title,
    value: formatValue(value, config.format),
    change: {
      value: change,
      direction: change >= 0 ? 'up' : 'down',
      formatted: `${change >= 0 ? '+' : ''}${change}%`
    },
    icon: config.icon,
    color: config.color
  };
}

function getMetricConfig(type) {
  const configs = {
    [METRIC_TYPES.COMMITS]: {
      title: 'Commits',
      format: 'number',
      icon: 'git-commit',
      color: 'blue'
    },
    [METRIC_TYPES.PRS]: {
      title: 'Pull Requests',
      format: 'number',
      icon: 'git-pull-request',
      color: 'green'
    },
    [METRIC_TYPES.REVIEWS]: {
      title: 'Code Reviews',
      format: 'number',
      icon: 'eye',
      color: 'purple'
    },
    [METRIC_TYPES.VELOCITY]: {
      title: 'Velocity',
      format: 'points',
      icon: 'trending-up',
      color: 'orange'
    }
  };
  
  return configs[type] || configs[METRIC_TYPES.COMMITS];
}

function formatValue(value, format) {
  switch (format) {
    case 'points':
      return `${value} pts`;
    case 'percentage':
      return `${value}%`;
    default:
      return value.toLocaleString();
  }
}
