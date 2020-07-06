import styled from 'styled-components';
import { pebbleTheme } from 'styles/pebbleTheme';

const baseColors = pebbleTheme.baseColors;
const contextColors = pebbleTheme.contextColors;

export const RadioButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  width: auto;
  box-sizing: border-box;

  label {
    flex-shrink: 0;
    color: ${contextColors.text.primary};
    cursor: pointer;
  }

  input {
    border-radius: 50%;
    margin: 0;
    position: relative;
    flex-shrink: 0;
    width: 18px;
    height: 18px;
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    outline: none;
    background: ${baseColors.white};
    cursor: pointer;
    border: 2px solid ${baseColors.blue1};

    &:checked {
      &::before {
        top: 3px;
        right: 3px;
        bottom: 3px;
        left: 3px;
      }
    }

    &::before {
      content: ' ';
      border-radius: 50%;
      position: absolute;
      top: 50%;
      right: 50%;
      bottom: 50%;
      left: 50%;
      background: ${baseColors.blue1};
    }

    &:disabled {
      border-color: ${baseColors.gray11};
      cursor: default;

      background: ${baseColors.blue15};
      &::before {
        background-color: ${baseColors.blue15};
      }

      + label {
        color: ${baseColors.blue15};
      }
    }
  }
`;

export const LabelText = styled.label`
  box-sizing: border-box;
  padding: 6px;
  vertical-align: middle;
`;
