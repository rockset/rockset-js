import * as React from 'react';
import { LabelText } from 'components/pebble/input/PebbleInput';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/pro-light-svg-icons';
import { SearchWrapper } from './SearchStyles';

export interface Props
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  id?: string;
  a11yText?: string;
  labelText?: string;
  tooltipText?: string;
  width?: string;
}

export const PebbleSearch = ({
  id,
  a11yText,
  labelText,
  tooltipText,
  style,
  ...rest
}: Props) => {
  const searchId = id;
  return (
    <SearchWrapper style={style}>
      <FontAwesomeIcon
        icon={faSearch as any}
        size="sm"
        style={{ marginRight: 8, marginLeft: 8 }}
      />
      {a11yText && !labelText && <label htmlFor={searchId}>{a11yText}</label>}
      {labelText && (
        <LabelText text={labelText} id={searchId} tooltipText={tooltipText} />
      )}
      <input id={searchId} type={'search'} {...rest} />
    </SearchWrapper>
  );
};
