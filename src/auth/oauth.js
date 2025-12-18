/**
 * OAuth2 Social Login Module
 * SCRUM-8: Add OAuth2 social login
 */

const OAUTH_PROVIDERS = {
  google: {
    authUrl: 'https://accounts.google.com/o/oauth2/v2/auth',
    scope: 'openid email profile'
  },
  github: {
    authUrl: 'https://github.com/login/oauth/authorize',
    scope: 'read:user user:email'
  }
};

export function initiateOAuth(provider, clientId, redirectUri) {
  const config = OAUTH_PROVIDERS[provider];
  if (!config) {
    throw new Error(`Unknown OAuth provider: ${provider}`);
  }
  
  const state = generateState();
  sessionStorage.setItem('oauth_state', state);
  
  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    scope: config.scope,
    state,
    response_type: 'code'
  });
  
  window.location.href = `${config.authUrl}?${params}`;
}

export async function handleOAuthCallback(code, state) {
  const savedState = sessionStorage.getItem('oauth_state');
  if (state !== savedState) {
    throw new Error('Invalid OAuth state');
  }
  
  sessionStorage.removeItem('oauth_state');
  
  const response = await fetch('/api/auth/oauth/callback', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ code })
  });
  
  return response.json();
}

function generateState() {
  return Math.random().toString(36).substring(2, 15);
}
