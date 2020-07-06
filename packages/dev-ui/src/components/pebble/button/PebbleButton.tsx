import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { Button } from './ButtonStyles';
import { CSSProperties } from 'styled-components';

export interface ButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  role?:
    | 'primary'
    | 'secondary'
    | 'tertiary'
    | 'text'
    | 'primary-danger'
    | 'secondary-danger'
    | 'text-danger';
  size?: 'small' | 'large';
  text?: string;
  children?: any;
  icon?: IconProp;
  disabled?: boolean;
  style?: CSSProperties;
  ref?: React.Ref<HTMLButtonElement>;
}

export const PebbleButton = ({
  role = 'primary',
  size = 'small',
  type = 'button',
  text,
  children,
  icon,
  ...rest
}: ButtonProps) => {
  return (
    <Button role={role} size={size} type={type} {...rest}>
      {icon && (
        <FontAwesomeIcon
          icon={icon}
          style={{ marginRight: text || children ? 8 : 0 }}
        />
      )}
      {text}
      {children}
    </Button>
  );
};
