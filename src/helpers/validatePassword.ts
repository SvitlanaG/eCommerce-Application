const validatePassword = {
  hasUpperCase: (value: string) =>
    /[A-Z]/.test(value) ||
    'Password must contain at least one uppercase letter',
  hasLowerCase: (value: string) =>
    /[a-z]/.test(value) ||
    'Password must contain at least one lowercase letter',
  hasDigit: (value: string) =>
    /\d/.test(value) || 'Password must contain at least one digit',
  hasNoWhitespace: (value: string) =>
    /^\S*$/.test(value) ||
    'Password must not contain leading or trailing whitespace',
  hasSpecialChar: (value: string) =>
    /[!@#$%^&*]/.test(value) ||
    'Password must contain at least one special character',
};

export default validatePassword;
