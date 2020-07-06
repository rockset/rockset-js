import styled from 'styled-components';
import { pebbleTheme } from 'styles/pebbleTheme';

const baseColors = pebbleTheme.baseColors;

export const CheckboxWrapper = styled.div<{ disabled?: boolean }>`
  display: flex;
  align-items: center;
  cursor: ${(props) => (props.disabled ? 'default' : 'pointer')};
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
  width: auto;
  user-select: none;
  white-space: nowrap;

  label {
    cursor: ${(props) => (props.disabled ? 'default' : 'pointer')};
    flex-shrink: 0;
    padding: 2px 4px;
    color: ${baseColors.gray3};
    white-space: nowrap;
  }

  input {
    cursor: ${(props) => (props.disabled ? 'default' : 'pointer')};
    outline: none;
    position: relative;
    flex-shrink: 0;
    width: 18px;
    height: 18px;
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    border: 2px solid ${baseColors.blue1};
    background-color: ${baseColors.white};

    &:checked {
      background-color: ${baseColors.blue1};

      &::before {
        box-sizing: border-box;
        content: '';
        position: absolute;
        top: 0px;
        right: 0px;
        bottom: 0px;
        left: 0px;
        left: 0;
      }
      &::after {
        box-sizing: border-box;
        content: '';
        position: absolute;
        background: none;
        width: 9px;
        outline: none;
        height: 6px;
        border-left: 1px solid ${pebbleTheme.baseColors.white};
        border-bottom: 1px solid ${pebbleTheme.baseColors.white};
        left: 2px;
        top: 50%;
        margin-top: -4px;
        opacity: 1;
        transform: scale(1) rotate(-45deg);
      }
    }

    &::before {
      content: ' ';
      position: absolute;
      top: 50%;
      right: 50%;
      bottom: 50%;
      left: 50%;
      background-color: ${baseColors.blue1};
    }
  }
`;
