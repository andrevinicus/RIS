import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  background-color: #ffffff;
  padding: 24px;
  box-sizing: border-box;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
  transition: box-shadow 0.3s ease;
`;

export const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 20px;
`;

export const Button = styled.button`
  padding: 10px 18px;
  border-radius: 8px;
  background-color: #007bff;
  border: none;
  color: #ffffff;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.2s ease, transform 0.1s ease;
  line-height: 1.2;

  &:hover {
    background-color: #0056b3;
  }

  &:focus-visible {
    outline: 3px solid rgba(0, 123, 255, 0.4);
  }

  &:disabled {
    background-color: #adb5bd;
    cursor: not-allowed;
  }

  &:active {
    transform: scale(0.98);
  }
`;

export const FilterButton = styled(Button)`
  background-color: #28a745;

  &:hover {
    background-color: #218838;
  }

  &:focus-visible {
    outline: 3px solid rgba(40, 167, 69, 0.4);
  }
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  border-radius: 8px;
  overflow: hidden;

  thead {
    background-color: #f8f9fa;
    /* position: sticky; top: 0; z-index: 1; */ /* opcional: fixar header */
  }

  tbody tr:hover {
    background-color: rgba(0, 123, 255, 0.05);
    cursor: pointer;
  }

  tbody tr.selected {
    background-color: rgba(0, 123, 255, 0.15);
  }
`;

export const Th = styled.th`
  padding: 14px 18px;
  border-bottom: 2px solid #dee2e6;
  text-align: left;
  color: #495057;
  font-weight: 600;
  font-size: 14px;
  letter-spacing: 0.3px;
  background-color: inherit;
`;

export const Td = styled.td`
  padding: 14px 18px;
  border-bottom: 1px solid #f1f1f1;
  color: #343a40;
  font-size: 14px;
  vertical-align: middle;
  line-height: 1.4;
`;

export const FilterContainer = styled.div`
  margin-top: 12px;
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
`;

export const InputFilter = styled.input`
  padding: 10px 14px;
  border-radius: 6px;
  border: 1px solid #ced4da;
  width: clamp(180px, 25vw, 280px);
  font-size: 14px;
  transition: border 0.2s ease, box-shadow 0.2s ease;

  &:focus {
    outline: none;
    border-color: #80bdff;
    box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.2);
  }
`;
