import styled from 'styled-components';
import { pebbleTheme } from 'styles/pebbleTheme';

const contextColors = pebbleTheme.contextColors;
const baseColors = pebbleTheme.baseColors;
const fonts = pebbleTheme.fonts;

export const SelectWrapper = styled.div<{
  loading?: boolean;
  contrastBackground?: boolean;
}>`
  font-family: ${fonts.families.ssp};
  &:focus {
    outline: none;
  }
  display: inline-block;
  width: 100%;
  height: ${(props) => (props.loading ? '91px' : 'auto')};
  .pebble__control {
    height: 40px;
    border-radius: 0px;
    background: ${(props) =>
      props.contrastBackground ? baseColors.white : baseColors.blue19};
    border-width: ${(props) =>
      props.contrastBackground ? '1px' : '0px 0px 1px 0px'};
    border-style: solid;
    border-color: ${baseColors.gray11};
    font-size: ${fonts.sizes.content};
    color: ${contextColors.text.primary};
    box-shadow: none;
    cursor: pointer;
    :hover {
      border-color: ${baseColors.gray11};
    }
  }

  .pebble__control--is-focused {
    border-bottom-color: ${baseColors.blue7} !important;
  }
  .pebble__control--is-disabled {
    opacity: 0.5;
  }
  .pebble__indicator-separator {
    display: none;
  }

  .pebble__single-value {
    line-height: 16px;
  }

  .pebble__single-value--is-disabled {
    color: ${contextColors.text.primary};
  }

  .pebble__menu {
    z-index: 9999;
    margin-top: 0px;
    border-radius: 0px;
    max-height: 300px;
    min-width: 200px;
  }

  .pebble__menu-list {
    z-index: 9999;
    padding: 0px;
    max-height: 300px;
    min-width: 200px;
  }

  .pebble__option {
    z-index: 9999;
    display: inline-flex;
    align-items: center;
    font-size: ${fonts.sizes.content};
    height: 36px;
    padding: 0 15px;
    user-select: none;
    background: ${pebbleTheme.baseColors.white};

    :active {
      background: #edf6fa;
    }

    :hover {
      cursor: pointer;
      background: ${baseColors.blue17};
    }
  }
  .pebble__placeholder {
    color: ${baseColors.gray9};
    font-family: ${fonts.families.ssp};
  }

  input {
    font-family: ${fonts.families.ssp};
  }
`;

export const OptionWrapper = styled.div`
  color: ${contextColors.text.primary};
  font-size: ${fonts.sizes.content};
  align-items: center;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
  line-height: 32px;
  vertical-align: center;
  white-space: nowrap;
  cursor: pointer;
  user-select: none;
  :hover {
    cursor: pointer;
    background: ${baseColors.blue17};
  }
`;
