import styled from 'styled-components';
import { pebbleTheme } from 'styles/pebbleTheme';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const baseColors = pebbleTheme.baseColors;

export const Table = styled.table`
  width: 100%;
  tr {
    display: flex;
    align-items: center;
    border: 1px solid ${baseColors.gray11};
    border-top-width: 0px;
    padding-left: 20px;
    &:hover svg {
      visibility: visible;
    }
  }

  td,
  th {
    display: inline-flex;
    align-items: center;
    font-size: ${pebbleTheme.fonts.sizes.content};
  }
`;

export const TableRow = styled.tr<{ canClick?: boolean }>`
  cursor: ${props => props.canClick && 'pointer'};
  min-height: 32px;
  height: fit-content;
  &:hover {
    background-color: ${pebbleTheme.baseColors.blue17};
  }
`;

export const TableCell = styled.td`
  max-width: 400px;
  flex-grow: 1;
  padding-right: 15px;
`;

export const TableHeader = styled.th<{ canClick?: boolean }>`
  cursor: ${props => props.canClick && 'pointer'};
  max-width: 400px;
  flex-grow: 1;
  user-select: none;
`;

export const TabledHeaderRow = styled.tr`
  display: flex;
  width: 100%;
  justify-content: space-between;
  background-color: ${pebbleTheme.baseColors.blue21};
  border-top: 1px solid ${baseColors.gray11} !important;
  padding-right: 34px;
  height: 48px;
`;

export const TrashCan = styled(FontAwesomeIcon)`
  color: ${pebbleTheme.contextColors.status.danger};
  margin-right: 20px;
  visibility: hidden;
  cursor: pointer;
`;
