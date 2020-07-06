import styled from 'styled-components';
import { pebbleTheme } from 'styles/pebbleTheme';
import { PebbleH4 } from 'components';
import { Colors } from './PebbleNotification';

export const Notification = styled.div<{
  kind: 'info' | 'success' | 'warning' | 'danger';
}>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid ${(props) => Colors[props.kind]};
  border-left-width: 6px;
  padding: 12px 16px;
`;

export const InlineHeading = styled(PebbleH4)`
  display: flex;
  align-items: center;
  margin-right: 6px;
  min-height: 18px;
`;

export const Subtitle = styled.span`
  display: flex;
  align-items: center;
  color: ${pebbleTheme.baseColors.gray5};
  font-size: ${pebbleTheme.fonts.sizes.content};
  margin-right: 6px;
  min-height: 18px;
`;

export const Content = styled.span`
  display: flex;
  align-items: center;
  font-size: ${pebbleTheme.fonts.sizes.content};
`;

export const NotificationBody = styled.div<{
  contentDirection: 'vertical' | 'horizontal';
}>`
  display: flex;
  flex-direction: ${(props) =>
    props.contentDirection === 'horizontal' ? 'row' : 'column'};
  flex-grow: 1;
`;

export const Close = styled.span`
  display: flex;
  align-items: center;
  font-size: 28px;
  font-weight: bold;
  width: 15px;
  height: 15px;
  margin-left: 6px;

  color: ${pebbleTheme.baseColors.gray11};

  &:hover,
  &:focus {
    color: ${pebbleTheme.baseColors.gray3};
    cursor: pointer;
  }
`;
