/**
 * Password Reset Module
 * SCRUM-6: Add password reset functionality
 */

export async function requestPasswordReset(email) {
  const response = await fetch('/api/auth/reset-password', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email })
  });
  
  return response.json();
}

export async function confirmPasswordReset(token, newPassword) {
  const response = await fetch('/api/auth/reset-password/confirm', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token, newPassword })
  });
  
  if (!response.ok) {
    throw new Error('Password reset failed');
  }
  
  return response.json();
}

export function validatePasswordStrength(password) {
  const checks = {
    minLength: password.length >= 8,
    hasUppercase: /[A-Z]/.test(password),
    hasLowercase: /[a-z]/.test(password),
    hasNumber: /[0-9]/.test(password),
    hasSpecial: /[!@#$%^&*]/.test(password)
  };
  
  const score = Object.values(checks).filter(Boolean).length;
  return { checks, score, strong: score >= 4 };
}
