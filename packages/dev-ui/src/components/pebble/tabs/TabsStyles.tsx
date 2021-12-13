import styled from 'styled-components';
import { pebbleTheme } from 'styles/pebbleTheme';

export const Tab = styled.span<{ activeTab: boolean }>`
  font-size: ${pebbleTheme.fonts.sizes.content};
  color: ${props =>
    props.activeTab ? pebbleTheme.baseColors.blue8 : pebbleTheme.baseColors.gray3};
  border-style: solid;
  border-color: ${pebbleTheme.baseColors.gray11};
  border-bottom-width: ${props => (props.activeTab ? '2px' : '0px')};
  padding-bottom: 12px;

  &:hover {
    cursor: pointer;
    color: ${pebbleTheme.baseColors.blue8};
  }
`;

export const Tabs = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;
