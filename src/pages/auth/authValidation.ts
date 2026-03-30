export function validateEmail(email: string): string {
  const t = email.trim();
  if (!t) return "Email is required";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(t)) return "Enter a valid email address";
  return "";
}

export function validatePassword(password: string, min = 8): string {
  if (!password) return "Password is required";
  if (password.length < min) return `Password must be at least ${min} characters`;
  return "";
}

export function validateRequired(value: string, fieldName: string): string {
  if (!value.trim()) return `${fieldName} is required`;
  return "";
}
