import * as React from 'react';
import { CheckboxWrapper } from './CheckboxStyles';
import { PebbleContent } from 'components';

interface Props
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  id?: string;
  labelText?: string;
  customLabel?: any;
}

interface CheckboxControlledProps extends Props {
  checked: boolean;
}

export const PebbleCheckboxControlled = ({
  id,
  labelText,
  customLabel,
  disabled,
  style,
  ...rest
}: CheckboxControlledProps) => {
  const checkboxId = id;
  return (
    <CheckboxWrapper disabled={disabled} style={style}>
      <input id={checkboxId} disabled={disabled} {...rest} type={'checkbox'} />
      {customLabel ? (
        <label htmlFor={checkboxId}>{customLabel}</label>
      ) : (
        labelText && (
          <PebbleContent>
            <label htmlFor={checkboxId}>{labelText}</label>
          </PebbleContent>
        )
      )}
    </CheckboxWrapper>
  );
};

export const PebbleCheckboxUncontrolled = ({ onChange, ...rest }: Props) => {
  const [checked, setChecked] = React.useState(false);

  return (
    <PebbleCheckboxControlled
      onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(!checked);
        onChange(event);
      }}
      checked={checked}
      {...rest}
    />
  );
};
