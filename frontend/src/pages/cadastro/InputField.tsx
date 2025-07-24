import React from 'react';

interface InputTextProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<any>) => void;
  type?: string;
  disabled?: boolean;
  textarea?: boolean;
  rows?: number;
  style?: React.CSSProperties;
  maxLength?: number; // ✅ Aqui está a nova prop
  placeholder?: string;
}

const InputText: React.FC<InputTextProps> = ({
  label,
  name,
  value,
  onChange,
  type = 'text',
  disabled = false,
  textarea = false,
  rows = 3,
  style = {},
  maxLength, // ✅ Aqui também
}) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
      <label
        htmlFor={name}
        style={{
          marginBottom: 4,
          color: 'rgba(0,0,0,0.6)',
          fontSize: 14,
        }}
      >
        {label}
      </label>
      {textarea ? (
        <textarea
          id={name}
          name={name}
          rows={rows}
          value={value}
          onChange={onChange}
          disabled={disabled}
          maxLength={maxLength} // ✅ Suporte para maxLength
          style={{
            width: '100%',
            padding: '8px 12px',
            borderRadius: 8,
            border: '1px solid rgba(0, 0, 0, 0.2)',
            backgroundColor: disabled ? '#f9f9f9' : '#fff',
            resize: 'vertical',
            ...style,
          }}
        />
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          disabled={disabled}
          maxLength={maxLength} // ✅ Aqui também
          style={{
            width: '100%',
            padding: '8px 12px',
            borderRadius: 8,
            border: '1px solid rgba(0, 0, 0, 0.2)',
            backgroundColor: disabled ? '#f9f9f9' : '#fff',
            ...style,
          }}
        />
      )}
    </div>
  );
};

export default InputText;
