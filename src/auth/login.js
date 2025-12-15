/**
 * User Login Module
 * SCRUM-5: Implement user login flow
 */

export async function authenticateUser(email, password) {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  
  if (!response.ok) {
    throw new Error('Authentication failed');
  }
  
  return response.json();
}

export function validateCredentials(email, password) {
  if (!email || !email.includes('@')) {
    return { valid: false, error: 'Invalid email format' };
  }
  if (!password || password.length < 8) {
    return { valid: false, error: 'Password must be at least 8 characters' };
  }
  return { valid: true };
}
