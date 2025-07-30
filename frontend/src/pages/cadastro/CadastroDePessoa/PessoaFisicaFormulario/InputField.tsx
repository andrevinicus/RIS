import React from 'react'

interface InputTextProps {
  label: string
  name: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  type?: string
  disabled?: boolean
  textarea?: boolean
  rows?: number
  style?: React.CSSProperties
  maxLength?: number
  placeholder?: string
  error?: string
  autoComplete?: string
  autoFocus?: boolean
}

const baseInputStyle: React.CSSProperties = {
  width: '100%',
  padding: '8px 12px',
  borderRadius: 8,
  border: '1px solid rgba(0, 0, 0, 0.2)',
  backgroundColor: '#fff',
  boxSizing: 'border-box',
  fontSize: 14,
  fontFamily: 'inherit',
  transition: 'border-color 0.2s ease-in-out',
}

const disabledStyle: React.CSSProperties = {
  backgroundColor: '#f9f9f9',
  cursor: 'not-allowed',
}

const errorStyle: React.CSSProperties = {
  borderColor: '#dc3545', // vermelho bootstrap
}

const InputText: React.FC<InputTextProps> = React.memo(({
  label,
  name,
  value,
  onChange,
  type = 'text',
  disabled = false,
  textarea = false,
  rows = 3,
  style = {},
  maxLength,
  placeholder,
  error,
  autoComplete,
  autoFocus,
}) => {
  const combinedStyle = {
    ...baseInputStyle,
    ...(disabled ? disabledStyle : {}),
    ...(error ? errorStyle : {}),
    ...style,
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
      <label
        htmlFor={name}
        style={{
          marginBottom: 4,
          color: 'rgba(0,0,0,0.6)',
          fontSize: 14,
          userSelect: 'none',
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
          aria-disabled={disabled}
          maxLength={maxLength}
          placeholder={placeholder}
          autoComplete={autoComplete}
          autoFocus={autoFocus}
          style={{
            ...combinedStyle,
            resize: 'vertical',
            minHeight: rows * 24,
          }}
          aria-invalid={!!error}
          aria-describedby={error ? `${name}-error` : undefined}
        />
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          disabled={disabled}
          aria-disabled={disabled}
          maxLength={maxLength}
          placeholder={placeholder}
          autoComplete={autoComplete}
          autoFocus={autoFocus}
          style={combinedStyle}
          aria-invalid={!!error}
          aria-describedby={error ? `${name}-error` : undefined}
        />
      )}
      {error && (
        <span
          id={`${name}-error`}
          style={{ color: '#dc3545', fontSize: 12, marginTop: 4 }}
          role="alert"
        >
          {error}
        </span>
      )}
    </div>
  )
})

export default InputText
