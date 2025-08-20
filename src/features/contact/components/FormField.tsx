"use client";

import React from 'react';
import { AlertCircle, Check, X, Loader2 } from 'lucide-react';
import { ValidationStatus } from '../utils/validation';

interface BaseFormFieldProps {
  name: string;
  label: string;
  value: string;
  error?: string;
  isRequired?: boolean;
  validationStatus?: ValidationStatus;
  isTyping?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

interface TextInputProps extends BaseFormFieldProps {
  type: 'text' | 'email';
  placeholder: string;
  suggestions?: string[];
  showSuggestions?: boolean;
  onSelectSuggestion?: (suggestion: string) => void;
}

interface SelectProps extends BaseFormFieldProps {
  type: 'select';
  options: Array<{ value: string; label: string }>;
}

interface TextareaProps extends BaseFormFieldProps {
  type: 'textarea';
  placeholder: string;
  rows?: number;
  maxLength?: number;
  showCharacterCount?: boolean;
}

type FormFieldProps = TextInputProps | SelectProps | TextareaProps;

export const FormField: React.FC<FormFieldProps> = (props) => {
  const {
    name,
    label,
    value,
    error,
    isRequired = false,
    validationStatus = 'idle',
    isTyping = false,
    onChange,
    onBlur,
    type,
  } = props;

  const getFieldClassName = () => {
    const baseClasses = "w-full px-4 py-3 bg-gray-800/50 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-300 hover:bg-gray-800/70 focus:scale-[1.02]";
    
    if (validationStatus === 'valid') {
      return `${baseClasses} border-green-500/50 focus:ring-green-500/30`;
    }
    
    if (error) {
      return `${baseClasses} border-red-500 focus:ring-red-500 animate-pulse`;
    }
    
    return `${baseClasses} border-gray-600 focus:ring-purple-500 hover:border-purple-400`;
  };

  const renderValidationIcon = () => {
    if (validationStatus === 'validating') {
      return <Loader2 className="w-3 h-3 animate-spin text-purple-400" />;
    }
    if (validationStatus === 'valid') {
      return <Check className="w-3 h-3 text-green-400 animate-in zoom-in duration-200" />;
    }
    if (validationStatus === 'invalid') {
      return <X className="w-3 h-3 text-red-400 animate-in zoom-in duration-200" />;
    }
    return null;
  };

  const renderTypingIndicator = () => {
    if (!isTyping) return null;
    
    return (
      <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
        <div className="flex space-x-1">
          <div className="w-1 h-1 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
          <div className="w-1 h-1 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
          <div className="w-1 h-1 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
        </div>
      </div>
    );
  };

  const renderInput = () => {
    if (type === 'text' || type === 'email') {
      const textProps = props as TextInputProps;
      return (
        <div className="relative">
          <input
            type={type}
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            required={isRequired}
            aria-describedby={error ? `${name}-error` : undefined}
            className={getFieldClassName()}
            placeholder={textProps.placeholder}
          />
          {renderTypingIndicator()}
          
          {/* Email Suggestions */}
          {type === 'email' && textProps.showSuggestions && textProps.suggestions && textProps.suggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 z-10 mt-1 bg-gray-800 border border-gray-600 rounded-lg shadow-lg animate-in fade-in slide-in-from-top duration-200 overflow-hidden">
              {textProps.suggestions.map((suggestion) => (
                <button
                  key={suggestion}
                  type="button"
                  className="w-full px-4 py-2 text-left text-gray-300 hover:bg-gray-700 hover:text-white transition-colors first:rounded-t-lg last:rounded-b-lg truncate text-sm"
                  onClick={() => textProps.onSelectSuggestion?.(suggestion)}
                >
                  {suggestion}
                </button>
              ))}
            </div>
          )}
        </div>
      );
    }

    if (type === 'select') {
      const selectProps = props as SelectProps;
      return (
        <select
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          required={isRequired}
          aria-describedby={error ? `${name}-error` : undefined}
          className={getFieldClassName()}
        >
          {selectProps.options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      );
    }

    if (type === 'textarea') {
      const textareaProps = props as TextareaProps;
      return (
        <>
          <textarea
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            required={isRequired}
            rows={textareaProps.rows || 6}
            aria-describedby={error ? `${name}-error` : undefined}
            className={`${getFieldClassName()} resize-none`}
            placeholder={textareaProps.placeholder}
          />
          {textareaProps.showCharacterCount && textareaProps.maxLength && (
            <div className={`mt-1 text-xs text-right transition-colors duration-200 ${
              value.length > (textareaProps.maxLength * 0.9) 
                ? 'text-red-400' 
                : value.length > (textareaProps.maxLength * 0.8)
                  ? 'text-yellow-400' 
                  : 'text-gray-400'
            }`}>
              {value.length}/{textareaProps.maxLength}
              {value.length > (textareaProps.maxLength * 0.9) && (
                <span className="ml-2 text-xs animate-pulse">Almost at limit</span>
              )}
            </div>
          )}
        </>
      );
    }

    return null;
  };

  return (
    <div className="relative">
      <label htmlFor={name} className="flex items-center justify-between text-sm font-medium text-gray-300 mb-2">
        <span>
          {label} {isRequired && '*'}
        </span>
        <div className="flex items-center space-x-1">
          {renderValidationIcon()}
        </div>
      </label>
      
      {renderInput()}
      
      {error && (
        <div id={`${name}-error`} className="mt-1 flex items-center text-red-400 text-sm animate-in slide-in-from-left duration-300">
          <AlertCircle className="w-4 h-4 mr-1" />
          {error}
        </div>
      )}
    </div>
  );
};