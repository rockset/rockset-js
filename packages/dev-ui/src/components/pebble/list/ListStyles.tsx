import styled from 'styled-components';
import { pebbleTheme } from 'styles/pebbleTheme';

const fonts = pebbleTheme.fonts;

export const StyledPebbleOrderedList = styled.ol`
  list-style: decimal;
  font: normal normal ${fonts.weights.medium} ${fonts.sizes.content}
    ${fonts.families.ssp};
`;

export const StyledPebbleUnorderedList = styled.ul`
  list-style: disc;
  font: normal normal ${fonts.weights.medium} ${fonts.sizes.content}
    ${fonts.families.ssp};
`;
