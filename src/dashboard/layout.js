/**
 * Dashboard Layout Module
 * SCRUM-9: Create dashboard layout
 */

export function createDashboardLayout() {
  return {
    header: {
      height: '64px',
      components: ['logo', 'navigation', 'user-menu']
    },
    sidebar: {
      width: '240px',
      collapsed: false,
      items: ['overview', 'activity', 'team', 'settings']
    },
    main: {
      padding: '24px',
      grid: {
        columns: 12,
        gap: '16px'
      }
    }
  };
}

export function getResponsiveBreakpoints() {
  return {
    mobile: 640,
    tablet: 768,
    desktop: 1024,
    wide: 1280
  };
}

export function calculateGridLayout(items, columns = 12) {
  return items.map((item, index) => ({
    ...item,
    column: (index % columns) + 1,
    row: Math.floor(index / columns) + 1
  }));
}
