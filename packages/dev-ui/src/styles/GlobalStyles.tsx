import * as React from 'react';
import { createGlobalStyle } from 'styled-components';

const Body = createGlobalStyle`
  body#rockset-body {
    font-family: 'Source Sans Pro';
  }
`;

export const GlobalStyles: React.SFC<any> = () => {
  return (
    <>
      <Body />
    </>
  );
};

export default GlobalStyles;
