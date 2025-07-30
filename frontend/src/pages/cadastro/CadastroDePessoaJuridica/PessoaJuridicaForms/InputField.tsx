import React from 'react';
import styled from 'styled-components';

interface InputTextProps extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  label: string;
  name: string;
  value: string;
  textarea?: boolean;
  rows?: number;
  maxLength?: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  disabled?: boolean;
}

const FieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 12px;
`;

const Label = styled.label`
  margin-bottom: 4px;
  font-size: 14px;
  color: #333;
`;

const StyledInput = styled.input<{ disabled?: boolean }>`
  padding: 8px 12px;
  border-radius: 8px;
  border: 1px solid #ccc;
  background-color: ${({ disabled }) => (disabled ? '#f9f9f9' : 'white')};
  font-size: 14px;
  outline: none;

  &:focus {
    border-color: #007bff;
  }
`;

const StyledTextArea = styled.textarea<{ disabled?: boolean }>`
  padding: 8px 12px;
  border-radius: 8px;
  border: 1px solid #ccc;
  background-color: ${({ disabled }) => (disabled ? '#f9f9f9' : 'white')};
  font-size: 14px;
  resize: vertical;
  outline: none;

  &:focus {
    border-color: #007bff;
  }
`;

const InputTextComponent: React.FC<InputTextProps> = ({
  label,
  name,
  value,
  onChange,
  textarea = false,
  rows = 3,
  maxLength,
  disabled = false,
  ...rest
}) => {
  return (
    <FieldWrapper>
      <Label htmlFor={name}>{label}</Label>
      {textarea ? (
        <StyledTextArea
          name={name}
          id={name}
          value={value}
          onChange={onChange}
          rows={rows}
          maxLength={maxLength}
          disabled={disabled}
          {...rest}
        />
      ) : (
        <StyledInput
          name={name}
          id={name}
          value={value}
          onChange={onChange}
          disabled={disabled}
          {...rest}
        />
      )}
    </FieldWrapper>
  );
};

const InputText = React.memo(InputTextComponent);

export default InputText;
