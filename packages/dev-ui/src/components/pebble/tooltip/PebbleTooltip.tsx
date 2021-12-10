/* Basic wrapper. See https://www.npmjs.com/package/react-tooltip for
 * usage */

import * as React from 'react';
import styled from 'styled-components';
const ReactTooltip = require('react-tooltip');

const Tooltip = styled.div`
  .__react_component_tooltip {
    z-index: 99999;
    max-width: 500px;
    max-height: 300px;
    line-height: 16px;
  }
`;

// place = 'top' | 'right' | 'bottom' | 'left';
// 3rd party default place = top
// type = 'dark' | 'success' | 'warning' | 'error' | 'info' | 'light';
// 3rd party default type = dark

export const PebbleTooltip = ({ ...props }) => {
  return (
    <Tooltip>
      <ReactTooltip {...props} />
    </Tooltip>
  );
};
