export type FormData = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export type ValidationStatus = 'idle' | 'validating' | 'valid' | 'invalid';

export const validateField = (name: string, value: string): string => {
  switch (name) {
    case 'name':
      if (!value.trim()) return 'Name is required';
      if (value.trim().length < 2) return 'Name must be at least 2 characters';
      return '';
    case 'email':
      if (!value.trim()) return 'Email is required';
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) return 'Please enter a valid email address';
      return '';
    case 'subject':
      if (!value) return 'Please select a subject';
      return '';
    case 'message':
      if (!value.trim()) return 'Message is required';
      if (value.trim().length < 10) return 'Message must be at least 10 characters';
      if (value.trim().length > 5000) return 'Message must be less than 5000 characters';
      return '';
    default:
      return '';
  }
};

export const validateAllFields = (formData: FormData): Record<string, string> => {
  const errors: Record<string, string> = {};
  
  Object.keys(formData).forEach(key => {
    const error = validateField(key, formData[key as keyof FormData]);
    if (error) errors[key] = error;
  });
  
  return errors;
};

export const generateEmailSuggestions = (email: string, commonDomains: string[]): string[] => {
  if (!email.includes('@')) return [];
  
  const [username] = email.split('@');
  
  return commonDomains
    .map(domain => `${username}@${domain}`)
    .filter(suggestion => suggestion !== email);
};