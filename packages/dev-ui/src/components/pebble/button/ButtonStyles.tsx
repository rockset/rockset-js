import styled from 'styled-components';
import { pebbleTheme } from 'styles/pebbleTheme';
import { ButtonProps } from './PebbleButton';

export enum Roles {
  primary = 'primary',
  secondary = 'secondary',
  tertiary = 'tertiary',
  text = 'text',
  primaryDanger = 'primary-danger',
  secondaryDanger = 'secondary-danger',
  textDanger = 'text-danger',
}

export enum Sizes {
  small = 'small',
  large = 'large',
}

const baseColors = pebbleTheme.baseColors;

export const TextColors = {
  [Roles.primary]: baseColors.white,
  [Roles.secondary]: baseColors.blue1,
  [Roles.tertiary]: baseColors.gray3,
  [Roles.text]: baseColors.blue1,
  [Roles.primaryDanger]: baseColors.white,
  [Roles.secondaryDanger]: baseColors.red6,
  [Roles.textDanger]: baseColors.red6,
};

const Borders = {
  [Roles.primary]: 'none',
  [Roles.secondary]: `1px solid ${baseColors.blue1}`,
  [Roles.tertiary]: `1px solid ${baseColors.gray3}`,
  [Roles.text]: 'none',
  [Roles.primaryDanger]: 'none',
  [Roles.secondaryDanger]: `1px solid ${baseColors.red6}`,
  [Roles.textDanger]: 'none',
};

export const BackgroundColors = {
  [Roles.primary]: baseColors.blue7,
  [Roles.secondary]: 'transparent',
  [Roles.tertiary]: 'transparent',
  [Roles.text]: 'transparent',
  [Roles.primaryDanger]: baseColors.red6,
  [Roles.secondaryDanger]: 'transparent',
  [Roles.textDanger]: 'transparent',
};

export const BackgroundHoverColors = {
  [Roles.primary]: baseColors.blue6,
  [Roles.secondary]: baseColors.blue15,
  [Roles.tertiary]: baseColors.gray2,
  [Roles.text]: baseColors.blue15,
  [Roles.primaryDanger]: baseColors.red1,
  [Roles.secondaryDanger]: baseColors.red5,
  [Roles.textDanger]: baseColors.red5,
};

const MaxWidth = {
  [Sizes.small]: '350px',
  [Sizes.large]: '400px',
};

const Height = {
  [Sizes.small]: '32px',
  [Sizes.large]: '40px',
};

export const Button = styled.button<ButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 2px;
  padding: 0px 16px;
  text-align: center;
  white-space: nowrap;

  font-size: ${pebbleTheme.fonts.sizes.content};
  font-weight: ${pebbleTheme.fonts.weights.medium};
  font-family: ${pebbleTheme.fonts.families.ssp};

  max-width: ${(props) => MaxWidth[props.size]};
  height: ${(props) => Height[props.size]};

  color: ${(props) => TextColors[props.role]};
  border: ${(props) => Borders[props.role]};
  background-color: ${(props) => BackgroundColors[props.role]};
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
  transition: background-color 0.2s;

  :hover:not([disabled]) {
    background-color: ${(props) => BackgroundHoverColors[props.role]};
  }

  :disabled .bx--tooltip__trigger {
    cursor: not-allowed;
  }

  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
`;
