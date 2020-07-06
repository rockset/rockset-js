import styled from 'styled-components';
import { pebbleTheme } from 'styles/pebbleTheme';

const contextColors = pebbleTheme.contextColors;
const fonts = pebbleTheme.fonts;
const fontSizes = fonts.sizes;
const fontWeights = fonts.weights;

export const PebbleH1 = styled.h1`
  font: normal normal ${fontWeights.semiBold} ${fontSizes.h1} ${fonts.families.ssp};
`;

export const PebbleH2 = styled.h2`
  font: normal normal ${fontWeights.semiBold} ${fontSizes.h2} ${fonts.families.ssp};
`;

export const PebbleH3 = styled.h3`
  font: normal normal ${fontWeights.semiBold} ${fontSizes.h3} ${fonts.families.ssp};
`;

export const PebbleH4 = styled.h4`
  font: normal normal ${fontWeights.semiBold} ${fontSizes.h4} ${fonts.families.ssp};
`;

export const PebbleH5 = styled.h5`
  font: normal normal ${fontWeights.semiBold} ${fontSizes.h5} ${fonts.families.ssp};
`;

export const PebbleContent = styled.div`
  font: normal normal ${fontWeights.medium} ${fontSizes.content} ${fonts.families.ssp};
  color: ${contextColors.text.primary};
`;

export const PebbleLink = styled.a`
  font: normal normal ${fontWeights.medium} ${fontSizes.content} ${fonts.families.ssp};
  color: ${contextColors.text.link};
  text-decoration: underline;
  text-decoration-color: ${contextColors.text.link};
  :hover {
    cursor: pointer;
  }
`;
