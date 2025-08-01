import React from 'react';

interface InputTextProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  disabled?: boolean;
  type?: string; // text, password, email, tel, etc.
  textarea?: boolean;
  rows?: number;
  maxLength?: number;
}

const InputText: React.FC<InputTextProps> = ({
  label,
  name,
  value,
  onChange,
  disabled = false,
  type = 'text',
  textarea = false,
  rows = 3,
  maxLength,
}) => {
  return (
    <label style={{ display: 'flex', flexDirection: 'column', fontWeight: '600', marginBottom: 8 }}>
      {label}
      {textarea ? (
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          disabled={disabled}
          rows={rows}
          maxLength={maxLength}
          style={{
            padding: 8,
            fontSize: 16,
            borderRadius: 4,
            border: '1px solid #ccc',
            resize: 'vertical',
            marginTop: 4,
            fontFamily: 'inherit',
          }}
        />
      ) : (
        <input
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          disabled={disabled}
          maxLength={maxLength}
          style={{
            padding: 8,
            fontSize: 16,
            borderRadius: 4,
            border: '1px solid #ccc',
            marginTop: 4,
            fontFamily: 'inherit',
          }}
        />
      )}
    </label>
  );
};

export default InputText;
