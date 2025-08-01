// PessoaJuridicaGrid.styles.ts
import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  background: #fff;
  padding: 16px;
  box-sizing: border-box;
  border-radius: 8px;
  box-shadow: 0 0 8px rgba(0,0,0,0.1);
`;

export const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
  align-items: center;
`;

export const Button = styled.button`
  padding: 8px 16px;
  border-radius: 6px;
  background-color: #007bff;
  border: none;
  color: white;
  cursor: pointer;
  font-weight: 600;

  &:hover {
    background-color: #0056b3;
  }
`;

export const FilterButton = styled(Button)`
  background-color: #28a745;

  &:hover {
    background-color: #1e7e34;
  }
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  text-align: left;
`;

export const Th = styled.th`
  padding: 10px;
  border-bottom: 2px solid #ddd;
`;

export const Td = styled.td`
  padding: 10px;
  border-bottom: 1px solid #eee;
`;

export const FilterContainer = styled.div`
  margin-top: 8px;
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

export const InputFilter = styled.input`
  padding: 6px 10px;
  border-radius: 6px;
  border: 1px solid #ccc;
  width: 200px;
`;
