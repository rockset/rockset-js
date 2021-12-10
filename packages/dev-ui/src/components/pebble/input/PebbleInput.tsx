import * as React from 'react';
import {
  InputWrapper,
  LabelTextWrapper,
  HelperTextWrapper,
  RequiredText,
  LabelInvalidText,
} from './InputStyles';
import { PebbleH4, PebbleDocsLink, PebbleTooltip } from 'components';
import { CSSProperties } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/pro-light-svg-icons';
import { faExclamationCircle } from '@fortawesome/pro-solid-svg-icons';
import { pebbleTheme } from 'styles/pebbleTheme';

export interface SharedProps {
  helperText?: string;
  labelText?: string;
  customLabel?: JSX.Element;
  tooltipText?: string;
  docsLink?: string;
  required?: boolean;
  invalid?: boolean;
  invalidText?: string;
  style?: CSSProperties;
}

interface TextInputProps
  extends SharedProps,
    React.DetailedHTMLProps<
      React.InputHTMLAttributes<HTMLInputElement>,
      HTMLInputElement
    > {
  id?: string;
  type?: string; // e.g. 'text' | 'email' | 'password' -> read HTML docs for more types
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  children?: any;
}

export const PebbleTextInput = ({
  id,
  helperText,
  labelText,
  customLabel,
  tooltipText,
  docsLink,
  invalid,
  invalidText,
  required,
  children,
  style,
  ...rest
}: TextInputProps) => {
  const inputId = id;
  return (
    <InputWrapper style={style}>
      {customLabel ? (
        <div style={{ marginBottom: 8 }}>{customLabel}</div>
      ) : (
        labelText && (
          <LabelText
            text={labelText}
            id={inputId}
            invalid={invalid}
            invalidText={invalidText}
            tooltipText={tooltipText}
          />
        )
      )}
      <input id={inputId} {...rest} />
      {helperText && (
        <HelperText
          text={helperText}
          required={required}
          invalid={invalid}
          docsLink={docsLink}
        />
      )}
      {children}
    </InputWrapper>
  );
};

interface TextAreaProps
  extends SharedProps,
    React.DetailedHTMLProps<
      React.TextareaHTMLAttributes<HTMLTextAreaElement>,
      HTMLTextAreaElement
    > {
  id?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  children?: any;
}

export const PebbleTextArea = ({
  id,
  helperText,
  labelText,
  tooltipText,
  docsLink,
  invalid,
  invalidText,
  required,
  children,
  style,
  ...rest
}: TextAreaProps) => {
  const inputId = id;
  return (
    <InputWrapper style={style}>
      {labelText && (
        <LabelText
          text={labelText}
          id={inputId}
          invalid={invalid}
          invalidText={invalidText}
          tooltipText={tooltipText}
        />
      )}
      <textarea id={inputId} {...rest} />
      {helperText && (
        <HelperText
          text={helperText}
          required={required}
          invalid={invalid}
          docsLink={docsLink}
        />
      )}
      {children}
    </InputWrapper>
  );
};

export const LabelText = ({
  text,
  id,
  invalid,
  invalidText,
  tooltipText,
}: {
  text: string;
  id: string;
  invalid?: boolean;
  invalidText?: string;
  tooltipText?: string;
}) =>
  text && (
    <LabelTextWrapper htmlFor={id}>
      <PebbleH4 style={{ display: 'inline' }}>{text}</PebbleH4>
      {tooltipText && (
        <>
          <FontAwesomeIcon
            icon={faInfoCircle as any}
            data-tip={tooltipText}
            color={pebbleTheme.baseColors.blue1}
            style={{ marginLeft: 6 }}
          />
          <PebbleTooltip effect="solid" />
        </>
      )}
      {invalid && (
        <LabelInvalidText>
          <FontAwesomeIcon
            icon={faExclamationCircle}
            color={pebbleTheme.contextColors.status.danger}
            style={{ marginLeft: 6, marginRight: 4 }}
          />
          {invalidText ?? 'Invalid Input'}
        </LabelInvalidText>
      )}
    </LabelTextWrapper>
  );

export const HelperText = ({
  text,
  required,
  invalid,
  docsLink,
  style = {},
}: {
  text: string;
  required?: boolean;
  invalid?: boolean;
  docsLink?: string;
  style?: any;
}) => (
  <HelperTextWrapper style={style} invalid={invalid}>
    {required && <RequiredText invalid={invalid}>{'Required:'}</RequiredText>}
    {text}
    {docsLink && (
      <PebbleDocsLink href={docsLink} text={'Docs'} style={{ marginLeft: 4 }} />
    )}
  </HelperTextWrapper>
);
