import * as React from 'react';
import { RadioButtonProps } from './PebbleRadioButton';
import { CSSProperties } from 'styled-components';

interface Props {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  children:
    | React.ReactElement<RadioButtonProps>[]
    | React.ReactElement<RadioButtonProps>;
  style?: CSSProperties;
}

export const PebbleRadioButtonGroup = ({
  onChange,
  children,
  style,
}: Props) => {
  return (
    <div style={style}>
      {React.Children.map(children, (radioButton) => {
        const { ...props }: RadioButtonProps = radioButton.props;
        return React.cloneElement(radioButton, { onChange, ...props }, null);
      })}
    </div>
  );
};
