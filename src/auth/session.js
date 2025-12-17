/**
 * Session Management Module
 * SCRUM-7: Implement session management
 */

const SESSION_KEY = 'user_session';
const SESSION_EXPIRY = 24 * 60 * 60 * 1000; // 24 hours

export function createSession(user, token) {
  const session = {
    user,
    token,
    createdAt: Date.now(),
    expiresAt: Date.now() + SESSION_EXPIRY
  };
  
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  return session;
}

export function getSession() {
  const data = localStorage.getItem(SESSION_KEY);
  if (!data) return null;
  
  const session = JSON.parse(data);
  if (Date.now() > session.expiresAt) {
    clearSession();
    return null;
  }
  
  return session;
}

export function clearSession() {
  localStorage.removeItem(SESSION_KEY);
}

export function refreshSession() {
  const session = getSession();
  if (!session) return null;
  
  session.expiresAt = Date.now() + SESSION_EXPIRY;
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  return session;
}

export function isAuthenticated() {
  return getSession() !== null;
}
