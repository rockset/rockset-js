import styled from 'styled-components';
import { pebbleTheme } from 'styles/pebbleTheme';
import { SharedProps } from './PebbleInput';

const baseColors = pebbleTheme.baseColors;
const contextColors = pebbleTheme.contextColors;

export const InputWrapper = styled.div<SharedProps>`
  width: 100%;
  input {
    height: 40px;
    box-sizing: border-box;
  }

  textarea {
    height: 140px;
    max-height: 250px;
  }

  input,
  textarea {
    background-color: ${baseColors.blue19};
    color: ${contextColors.text.primary};
    font-family: ${pebbleTheme.fonts.families.ssp};
    font-size: 14px;
    outline: none;
    padding: 10px 15px;
    width: 100%;
    border-width: 0px 0px 1px 0px;
    border-style: solid;
    border-color: ${baseColors.gray11};
    ::placeholder {
      color: ${baseColors.gray9};
    }
    resize: none;
    :focus {
      border-color: ${baseColors.blue7};
    }
  }

  input:disabled,
  input:read-only,
  textarea:disabled,
  textarea:read-only {
    opacity: 0.5;
  }

  input:-webkit-autofill {
    box-shadow: 0 0 0 50px ${baseColors.blue19} inset;
    -webkit-box-shadow: 0 0 0 50px ${baseColors.blue19} inset;
    -webkit-text-fill-color: ${contextColors.text.primary};
  }

  input:-webkit-autofill:focus {
    box-shadow: 0 0 0 50px ${baseColors.white} inset;
    -webkit-box-shadow: 0 0 0 50px ${baseColors.blue19} inset;
    -webkit-text-fill-color: ${contextColors.text.primary};
  }
`;

export const LabelTextWrapper = styled.label`
  display: inline-flex;
  align-items: center;
  height: 18px;
  margin-bottom: 8px;
  white-space: nowrap;
`;

export const HelperTextWrapper = styled.span<{ invalid?: boolean }>`
  display: inline-block;
  text-align: left;
  font-size: ${pebbleTheme.fonts.sizes.h4};
  line-height: 20px;
  color: ${(props) =>
    props.invalid ? contextColors.status.danger : contextColors.text.label};
  a {
    font-size: ${pebbleTheme.fonts.sizes.h4};
  }
`;

export const RequiredText = styled.span<{ invalid?: boolean }>`
  font-size: ${pebbleTheme.fonts.sizes.h4};
  display: inline;
  margin-right: 5px;
  color: ${(props) =>
    props.invalid ? contextColors.status.danger : contextColors.status.warning};
`;

export const LabelInvalidText = styled.span`
  font-size: ${pebbleTheme.fonts.sizes.h4};
  font-weight: ${pebbleTheme.fonts.weights.light};
  display: inline-flex;
  align-items: center;
  color: ${contextColors.status.danger};
`;
