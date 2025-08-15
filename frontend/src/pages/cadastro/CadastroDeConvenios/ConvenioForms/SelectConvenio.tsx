// SelectConvenio.tsx
import React from 'react';
import styled from 'styled-components';

interface Option {
  value: string;
  label: string;
}

interface SelectConvenioProps {
  label: string;
  name: string;
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  disabled?: boolean;
  options: Option[];
  error?: string;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Label = styled.label`
  margin-bottom: 4px;
  font-size: 14px;
  color: rgba(0,0,0,0.6);
`;

const StyledSelect = styled.select<{ hasError?: boolean }>`
  width: 100%;
  padding: 8px 12px;
  border-radius: 8px;
  border: 1px solid ${({ hasError }) => (hasError ? '#dc3545' : 'rgba(0,0,0,0.2)')};
  background-color: ${({ disabled }) => (disabled ? '#f9f9f9' : '#fff')};
  font-size: 14px;
  font-family: inherit;
  box-sizing: border-box;
  transition: border-color 0.2s, box-shadow 0.2s;
  appearance: none; /* Remove estilo padrão do select */
  background-image: url("data:image/svg+xml;charset=US-ASCII,%3Csvg width='10' height='6' viewBox='0 0 10 6' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill='%23333' d='M0 0l5 6 5-6z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 12px center;
  background-size: 10px 6px;

  &:focus {
    border-color: #023e809a;
    box-shadow: 0 0 0 2px rgba(0,123,255,0.2);
    outline: none;
  }

  &:disabled {
    cursor: not-allowed;
    color: rgba(0,0,0,0.6);
  }
`;

const ErrorText = styled.span`
  color: #dc3545;
  font-size: 12px;
  margin-top: 4px;
`;

const SelectConvenio: React.FC<SelectConvenioProps> = ({
  label,
  name,
  value,
  onChange,
  disabled = false,
  options,
  error,
}) => (
  <Container>
    <Label>{label}</Label>
    <StyledSelect
      name={name}
      value={value}
      onChange={onChange}
      disabled={disabled}
      hasError={!!error}
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </StyledSelect>
    {error && <ErrorText>{error}</ErrorText>}
  </Container>
);

export default SelectConvenio;
