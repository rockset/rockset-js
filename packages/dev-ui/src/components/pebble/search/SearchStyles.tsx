import styled from 'styled-components';
import { pebbleTheme } from 'styles/pebbleTheme';

const contextColors = pebbleTheme.contextColors;
const baseColors = pebbleTheme.baseColors;

export const SearchWrapper = styled.div<{ width?: string }>`
  display: flex;
  align-items: center;
  padding: 0px 4px;
  height: 32px;
  border: none;
  background-color: ${baseColors.blue19};
  width: ${(props) => (props.width ? props.width : 'inherit')};

  label {
    height: 0px;
    width: 0px;
    overflow: hidden;
  }

  input {
    background-color: ${baseColors.blue19};
    color: ${contextColors.text.primary};
    flex-grow: 1;
    font-family: ${pebbleTheme.fonts.families.ssp};
    font-size: 14px;
    height: 100%;
    padding-right: 5px;
    border: none;
    outline: none;
    ::placeholder {
      color: ${baseColors.gray9};
    }
  }

  input:-webkit-autofill {
    box-shadow: 0 0 0 32px ${baseColors.blue19} inset;
    -webkit-box-shadow: 0 0 0 32px ${baseColors.blue19} inset;
    -webkit-text-fill-color: ${contextColors.text.primary};
  }

  input:-webkit-autofill:focus {
    box-shadow: 0 0 0 32px ${baseColors.blue19} inset;
    -webkit-box-shadow: 0 0 0 32px ${baseColors.blue19} inset;
    -webkit-text-fill-color: ${contextColors.text.primary};
  }
`;
