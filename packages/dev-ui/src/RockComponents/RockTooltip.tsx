/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* LEGACY CODE copied fromconsole */
/* Basic wrapper. See https://www.npmjs.com/package/react-tooltip for
 * usage */

import * as React from 'react';
import styled from 'styled-components';

// Not sure why, but ES6 imports don't work here...
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const ReactTooltip = require('react-tooltip');

const StyleWrapper = styled.div`
  .__react_component_tooltip {
    z-index: 99999;
    max-width: 500px;
    line-height: 16px;
  }
`;

export const RockTooltip: React.SFC<unknown> = ({ ...props }) => (
  <StyleWrapper>
    <ReactTooltip {...props} />
  </StyleWrapper>
);
