import * as React from 'react';
import { RadioButtonWrapper, LabelText } from './RadioButtonStyles';
import { PebbleContent } from 'components';

const lowerNoSpace = (str: string) =>
  str.toLowerCase().replace(/ /g, '_').replace(/\W/g, '');

export interface RadioButtonProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  id?: string;
  customLabel?: any;
  labelText?: string;
  value: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const PebbleRadioButton = ({
  id,
  customLabel,
  labelText,
  style,
  ...rest
}: RadioButtonProps) => {
  const realId = id ?? lowerNoSpace(rest.value);
  const radioId = `radio_${realId}`;
  return (
    <RadioButtonWrapper style={style}>
      <input id={radioId} {...rest} type={'radio'} />
      {customLabel
        ? customLabel
        : labelText && (
            <LabelText htmlFor={radioId}>
              <PebbleContent>{labelText}</PebbleContent>
            </LabelText>
          )}
    </RadioButtonWrapper>
  );
};
