// FormPessoaFisica.styles.ts
import styled from 'styled-components';

export const FormularioContainer = styled.div`
  width: 100%;
  background: #fff;
  padding: 16px;
  box-sizing: border-box;
  border-radius: 8px;
  box-shadow: 0 0 8px rgba(0,0,0,0.1);
`;

export const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
`;

export const Title = styled.h2`
  margin: 0;
  font-weight: 600;
`;

export const AddButton = styled.button`
  padding: 8px 16px;
  border-radius: 6px;
  background-color: #007bff;
  border: none;
  color: white;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

export const StyledGridContainer = styled.div<{
  $columns: string;
  $gap?: string;
  $marginTop?: string;
}>`
  display: grid;
  grid-template-columns: ${({ $columns }) => $columns};
  gap: ${({ $gap }) => $gap || '16px'};
  margin-top: ${({ $marginTop }) => $marginTop || '16px'};
`;

export const CancelButton = styled.button`
  padding: 8px 16px;
  border-radius: 6px;
  background-color: #dc3545;
  border: none;
  color: white;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    background-color: #b02a37;
  }
`;

export const SaveButton = styled.button`
  padding: 8px 16px;
  border-radius: 6px;
  background-color: #28a745;
  border: none;
  color: white;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    background-color: #1e7e34;
  }
`;

export const ErrorMessage = styled.div`
  color: red;
  margin-top: 16px;
`;

export const Select = styled.select<{ $disabled?: boolean; $hasError?: boolean }>`
  width: 100%;
  padding: 8px 12px;
  border-radius: 8px;
  border: 1px solid ${({ $hasError }) => ($hasError ? 'red' : 'rgba(0,0,0,0.2)')};
  background-color: ${({ $disabled }) => ($disabled ? '#f9f9f9' : '#fff')};
  box-sizing: border-box;
  font-size: 14px;
  cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'auto')};
`;
