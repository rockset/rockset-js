import { InlineNotification } from 'carbon-components-react';
import styled from 'styled-components';

export const RockUnclosableInlineNotification = styled(InlineNotification)`
  .bx--inline-notification__close-icon {
    /* display: none; */
  }
`;

export const RockInlineNotification = InlineNotification;
