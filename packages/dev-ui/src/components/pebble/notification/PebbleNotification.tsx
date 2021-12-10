import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { pebbleTheme } from 'styles/pebbleTheme';
import {
  Notification,
  InlineHeading,
  Subtitle,
  Content,
  NotificationBody,
  Close,
} from './NotificationStyles';
import {
  faCheckCircle,
  faExclamationTriangle,
  faExclamationCircle,
} from '@fortawesome/pro-solid-svg-icons';
import { CSSProperties } from 'styled-components';
import { faInfoCircle } from '@fortawesome/pro-light-svg-icons';

enum Kind {
  info = 'info',
  success = 'success',
  warning = 'warning',
  danger = 'danger',
}

export const Colors = {
  [Kind.info]: pebbleTheme.contextColors.status.info,
  [Kind.success]: pebbleTheme.contextColors.status.success,
  [Kind.warning]: pebbleTheme.contextColors.status.warning,
  [Kind.danger]: pebbleTheme.contextColors.status.danger,
};

const Icons = {
  [Kind.info]: faInfoCircle,
  [Kind.success]: faCheckCircle,
  [Kind.warning]: faExclamationTriangle,
  [Kind.danger]: faExclamationCircle,
};

interface Props {
  title: string;
  subtitle: string | JSX.Element;
  // React resolves enums strangely as Props. Linter complains when -> kind: Kind
  kind: 'info' | 'success' | 'warning' | 'danger';
  show?: boolean;
  onClose?: (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void;
  closeable?: boolean;
  contentDirection?: 'vertical' | 'horizontal';
  children?: any;
  style?: CSSProperties;
}

export const PebbleNotification = ({
  title,
  subtitle,
  kind,
  contentDirection = 'horizontal',
  closeable = true,
  show = true,
  onClose,
  children,
  style,
}: Props) => {
  const [close, setClose] = React.useState(false);
  return (
    show &&
    !close && (
      <Notification kind={kind} style={style}>
        <FontAwesomeIcon
          icon={Icons[kind] as any}
          style={{ display: 'flex', alignItems: 'center', marginRight: 16 }}
          color={Colors[kind]}
        />
        <NotificationBody contentDirection={contentDirection}>
          <InlineHeading>{title}</InlineHeading>
          <Subtitle>{subtitle}</Subtitle>
        </NotificationBody>
        <Content>{children}</Content>
        {closeable && (
          <Close onClick={onClose ? onClose : () => setClose(true)}>
            &times;
          </Close>
        )}
      </Notification>
    )
  );
};
