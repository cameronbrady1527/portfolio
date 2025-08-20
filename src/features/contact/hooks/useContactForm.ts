import { useState, useEffect, useRef, useCallback } from 'react';
import { FormData, ValidationStatus, validateField, validateAllFields, generateEmailSuggestions } from '../utils/validation';
import { commonEmailDomains } from '../constants/contactData';

export type SubmitStatus = 'idle' | 'success' | 'error' | 'rate-limited';

export const useContactForm = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [validationStatus, setValidationStatus] = useState<Record<string, ValidationStatus>>({});
  const [isTyping, setIsTyping] = useState<Record<string, boolean>>({});
  const [showParticles, setShowParticles] = useState(false);
  const [emailSuggestions, setEmailSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  
  const debounceTimers = useRef<Record<string, NodeJS.Timeout>>({});

  // Enhanced form state persistence
  useEffect(() => {
    const savedFormData = localStorage.getItem('contactFormData');
    if (savedFormData) {
      try {
        const parsedData = JSON.parse(savedFormData);
        setFormData(parsedData);
      } catch (e) {
        console.error('Failed to parse saved form data:', e);
      }
    }
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      localStorage.setItem('contactFormData', JSON.stringify(formData));
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [formData]);

  // Debounced validation function
  const debouncedValidate = useCallback((name: string, value: string) => {
    // Clear existing timer
    if (debounceTimers.current[name]) {
      clearTimeout(debounceTimers.current[name]);
    }

    // Set validating state
    setValidationStatus(prev => ({ ...prev, [name]: 'validating' }));
    setIsTyping(prev => ({ ...prev, [name]: true }));

    // Generate email suggestions for email field
    if (name === 'email' && value.includes('@') && !value.includes('.')) {
      const suggestions = generateEmailSuggestions(value, commonEmailDomains);
      setEmailSuggestions(suggestions.slice(0, 3));
      setShowSuggestions(suggestions.length > 0);
    } else {
      setShowSuggestions(false);
    }

    // Set new timer
    debounceTimers.current[name] = setTimeout(() => {
      const error = validateField(name, value);
      setErrors(prev => ({ ...prev, [name]: error }));
      setValidationStatus(prev => ({ 
        ...prev, 
        [name]: error ? 'invalid' : (value.trim() ? 'valid' : 'idle')
      }));
      setIsTyping(prev => ({ ...prev, [name]: false }));
    }, 500);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear submit status when user starts typing
    if (submitStatus !== 'idle') {
      setSubmitStatus('idle');
    }

    // Debounced validation for better UX
    debouncedValidate(name, value);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));

    const error = validateField(name, value);
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  const selectEmailSuggestion = (suggestion: string) => {
    setFormData(prev => ({ ...prev, email: suggestion }));
    setShowSuggestions(false);
    debouncedValidate('email', suggestion);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all fields
    const newErrors = validateAllFields(formData);

    // Mark all fields as touched
    setTouched({
      name: true,
      email: true,
      subject: true,
      message: true
    });

    setErrors(newErrors);

    // If there are errors, don't submit
    if (Object.keys(newErrors).length > 0) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setSubmitStatus('success');
        setShowParticles(true);
        
        // Clear localStorage on successful submission
        localStorage.removeItem('contactFormData');
        setFormData({ name: "", email: "", subject: "", message: "" });
        setTouched({});
        setErrors({});
        setValidationStatus({});
        
        // Hide particles after animation
        setTimeout(() => setShowParticles(false), 3000);
      } else if (response.status === 429) {
        setSubmitStatus('rate-limited');
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    // Form data and state
    formData,
    isSubmitting,
    submitStatus,
    errors,
    touched,
    validationStatus,
    isTyping,
    showParticles,
    emailSuggestions,
    showSuggestions,
    
    // Handlers
    handleInputChange,
    handleBlur,
    handleSubmit,
    selectEmailSuggestion,
    
    // Computed values
    hasErrors: Object.keys(errors).some(key => errors[key]),
    isFormValid: Object.keys(validateAllFields(formData)).length === 0,
  };
};