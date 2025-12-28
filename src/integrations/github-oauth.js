/**
 * GitHub OAuth Integration
 * SCRUM-13: GitHub OAuth integration
 */

const GITHUB_AUTH_URL = 'https://github.com/login/oauth/authorize';
const GITHUB_SCOPES = ['repo', 'read:user', 'user:email'];

export function initiateGitHubAuth(clientId, redirectUri, teamId) {
  const state = btoa(JSON.stringify({ teamId }));
  
  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    scope: GITHUB_SCOPES.join(' '),
    state
  });
  
  return `${GITHUB_AUTH_URL}?${params}`;
}

export async function exchangeCodeForToken(code) {
  const response = await fetch('/api/integrations/github/callback', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ code })
  });
  
  if (!response.ok) {
    throw new Error('Failed to exchange code for token');
  }
  
  return response.json();
}

export async function getGitHubUser(accessToken) {
  const response = await fetch('https://api.github.com/user', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: 'application/vnd.github.v3+json'
    }
  });
  
  return response.json();
}
