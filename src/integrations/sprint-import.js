/**
 * Sprint Import from Jira
 * SCRUM-17: Import sprints from Jira
 * 
 * Status: In Progress
 */

export async function importSprintsFromJira(jiraSync, boardId, teamId) {
  const sprints = await jiraSync.fetchSprints(boardId);
  const importedSprints = [];
  
  for (const sprint of sprints) {
    const imported = await importSprint(sprint, teamId);
    importedSprints.push(imported);
  }
  
  return importedSprints;
}

async function importSprint(jiraSprint, teamId) {
  const sprintData = {
    name: jiraSprint.name,
    external_sprint_id: jiraSprint.id.toString(),
    board_id: jiraSprint.originBoardId?.toString(),
    source: 'jira',
    status: mapSprintStatus(jiraSprint.state),
    start_date: jiraSprint.startDate,
    end_date: jiraSprint.endDate,
    team_id: teamId
  };
  
  // TODO: Upsert to database
  console.log('Would import sprint:', sprintData);
  return sprintData;
}

function mapSprintStatus(jiraState) {
  const statusMap = {
    'future': 'planned',
    'active': 'active',
    'closed': 'completed'
  };
  return statusMap[jiraState] || 'planned';
}

// TODO: Import sprint issues
// TODO: Handle sprint updates
