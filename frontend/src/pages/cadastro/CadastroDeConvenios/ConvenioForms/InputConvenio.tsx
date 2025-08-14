import React from 'react';

interface InputConvenioProps {
  label: string;
  name: string;
  value: string;
   onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  disabled?: boolean;
  textarea?: boolean;
  rows?: number;
  maxLength?: number;
  placeholder?: string;
  error?: string;
  autoComplete?: string;
  autoFocus?: boolean;
}

const InputConvenio: React.FC<InputConvenioProps> = ({
  label,
  name,
  value,
  onChange,
  disabled = false,
  textarea = false,
  rows = 3,
  maxLength,
  placeholder,
  error,
  autoComplete,
  autoFocus,
}) => {
  const baseStyle: React.CSSProperties = {
    width: '100%',
    padding: '8px 12px',
    borderRadius: 8,
    border: '1px solid rgba(0,0,0,0.2)',
    backgroundColor: disabled ? '#f9f9f9' : '#fff',
    fontSize: 14,
    fontFamily: 'inherit',
    boxSizing: 'border-box',
    transition: 'border-color 0.2s',
  };

  const errorStyle: React.CSSProperties = error ? { borderColor: '#dc3545' } : {};

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
      <label style={{ marginBottom: 4, fontSize: 14, color: 'rgba(0,0,0,0.6)' }}>
        {label}
      </label>

      {textarea ? (
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          disabled={disabled}
          rows={rows}
          maxLength={maxLength}
          placeholder={placeholder}
          autoComplete={autoComplete}
          autoFocus={autoFocus}
          style={{ ...baseStyle, resize: 'vertical', minHeight: rows * 24, ...errorStyle }}
        />
      ) : (
        <input
          name={name}
          value={value}
          onChange={onChange}
          disabled={disabled}
          type="text"
          maxLength={maxLength}
          placeholder={placeholder}
          autoComplete={autoComplete}
          autoFocus={autoFocus}
          style={{ ...baseStyle, ...errorStyle }}
        />
      )}

      {error && <span style={{ color: '#dc3545', fontSize: 12, marginTop: 4 }}>{error}</span>}
    </div>
  );
};

export default InputConvenio;
