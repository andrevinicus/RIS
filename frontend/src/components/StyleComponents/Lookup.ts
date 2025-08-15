import styled from 'styled-components';

/* Container genérico para qualquer campo tipo lookup */
export const LookupContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 56px;
  justify-content: center;
`;

export const LookupLabel = styled.label`
  font-weight: 300;
  margin-bottom: 4px;
`;

export const LookupWrapper = styled.div`
  display: flex;
  height: 40px;
`;

export const LookupIdInput = styled.input<{ $isEditable: boolean }>`
  width: 120px;
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 3px;
  height: 36px;
  box-sizing: border-box;
  background-color: ${({ $isEditable }) => ($isEditable ? '#fff' : '#f5f5f5')};
`;

export const LookupNameWrapper = styled.div`
  display: flex;
  flex: 1;
  height: 36px;
`;

export const LookupNameInput = styled.input`
  flex: 1;
  padding: 8px 10px;
  border: 1px solid #ccc;
  border-radius: 6px 0 0 6px;
  border-right: none;
  background-color: #f5f5f5;
  height: 36px;
  box-sizing: border-box;
`;

export const LookupSelectButton = styled.button<{ $isEditable: boolean }>`
  width: 40px;
  height: 36px;
  border: 1px solid #ccc;
  border-left: none;
  border-radius: 0 6px 6px 0;
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: ${({ $isEditable }) => ($isEditable ? 'pointer' : 'not-allowed')};
`;
