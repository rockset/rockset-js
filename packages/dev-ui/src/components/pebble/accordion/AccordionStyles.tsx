import styled from 'styled-components';
import { pebbleTheme } from 'styles/pebbleTheme';

export const Accordion = styled.ul`
  border-color: ${pebbleTheme.baseColors.gray11};
  border-top-width: 1px;
  border-style: solid;
  &:hover {
    cursor: pointer;
  }
`;

export const AccordionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  min-height: 32px;
`;

export const AccordionItem = styled.li<{ open?: boolean }>`
  border-color: ${pebbleTheme.baseColors.gray11};
  border-bottom-width: 1px;
  border-style: solid;
  display: flex;
  flex-wrap: wrap;
  user-select: none;
  font-size: ${pebbleTheme.fonts.sizes.content};
  padding: 0px 5px;
  min-height: 32px;
  &:hover {
    background-color: ${pebbleTheme.baseColors.gray15};
  }
`;

export const AccordionItemContent = styled.div`
  padding: 5px;
`;
