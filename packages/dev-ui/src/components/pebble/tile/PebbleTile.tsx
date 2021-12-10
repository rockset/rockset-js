import styled from 'styled-components';
import { pebbleTheme } from 'styles/pebbleTheme';

export const PebbleTile = styled.div`
  padding: 26px;
  border-width: 1px;
  border-color: ${pebbleTheme.contextColors.border};
  box-shadow: ${pebbleTheme.baseColors.shade1} 0px 2px 4px 0px;
`;
