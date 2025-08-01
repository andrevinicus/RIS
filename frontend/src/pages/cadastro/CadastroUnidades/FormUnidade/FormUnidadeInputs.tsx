import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 12px;
`;

const Label = styled.label`
  font-weight: 600;
  margin-bottom: 6px;
  color: #333;
`;

const StyledInput = styled.input<{ disabled?: boolean }>`
  padding: 8px 10px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: ${({ disabled }) => (disabled ? '#f5f5f5' : '#fff')};
  color: ${({ disabled }) => (disabled ? '#888' : '#000')};
  transition: border-color 0.2s;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'text')};

  &:focus {
    outline: none;
    border-color: #4a90e2;
  }
`;

interface InputTextProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
}

const InputText: React.FC<InputTextProps> = ({
  label,
  name,
  value,
  onChange,
  disabled = false,
  type = 'text',
  ...rest
}) => {
  const inputId = `input-${name}`;
  return (
    <Container>
      <Label htmlFor={inputId}>{label}</Label>
      <StyledInput
        id={inputId}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        type={type}
        aria-disabled={disabled}
        autoComplete="off"
        {...rest}
      />
    </Container>
  );
};

export default InputText;
