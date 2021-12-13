// @ts-nocheck
import * as React from 'react';

import Select, {
  components,
  Props,
  OptionProps,
  IndicatorProps,
} from 'react-select';
import Creatable from 'react-select/creatable';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/pro-solid-svg-icons';
import { LabelText, HelperText } from 'components/pebble/input/PebbleInput';
import { SelectWrapper, OptionWrapper } from './SelectStyles';
import { CSSProperties } from 'styled-components';

interface SharedProps extends Props {
  id?: string;
  creatable?: boolean;
  defaultValue?: any;
  customLabel?: any;
  labelText?: string;
  helperText?: string;
  tooltipText?: string;
  docsLink?: string;
  placeholder?: string;
  invalid?: boolean;
  invalidText?: string;
  required?: boolean;
  contrastBackground?: boolean;
  style?: CSSProperties;
}
interface SelectProps extends SharedProps {
  onChange?: (value: { value: any; label: string }) => void;
}

export const PebbleSelect = ({
  onChange,
  id,
  creatable,
  customLabel,
  labelText,
  helperText,
  tooltipText,
  docsLink,
  invalid,
  invalidText,
  required,
  contrastBackground,
  style,
  ...rest
}: SelectProps) => {
  const selectId = id;
  return (
    <SelectWrapper style={style} contrastBackground={contrastBackground}>
      {customLabel
        ? customLabel
        : labelText && (
            <LabelText
              text={labelText}
              id={selectId}
              invalid={invalid}
              invalidText={invalidText}
              tooltipText={tooltipText}
            />
          )}
      {creatable ? (
        <Creatable
          classNamePrefix="pebble"
          components={{
            DropdownIndicator,
            Option,
            IndicatorSeparator: () => null,
          }}
          inputId={selectId}
          onChange={(value: { value: any; label: string }) => onChange(value)}
          {...rest}
        />
      ) : (
        <Select
          classNamePrefix="pebble"
          components={{
            DropdownIndicator,
            Option,
            IndicatorSeparator: () => null,
          }}
          inputId={selectId}
          onChange={(value: { value: any; label: string }) => onChange(value)}
          {...rest}
        />
      )}
      {helperText && (
        <HelperText
          text={helperText}
          required={required}
          invalid={invalid}
          docsLink={docsLink}
        />
      )}
    </SelectWrapper>
  );
};

interface MultiSelectProps extends SharedProps {
  onChange: (value: { value: any; label: string }[]) => void;
}

export const PebbleMultiSelect = ({
  onChange,
  id,
  creatable,
  customLabel,
  labelText,
  helperText,
  tooltipText,
  docsLink,
  invalid,
  invalidText,
  required,
  style,
  ...rest
}: MultiSelectProps) => {
  const multiSelectId = id;
  return (
    <SelectWrapper style={style}>
      {customLabel
        ? customLabel
        : labelText && (
            <LabelText
              text={labelText}
              id={multiSelectId}
              invalid={invalid}
              invalidText={invalidText}
              tooltipText={tooltipText}
            />
          )}
      {creatable ? (
        <Creatable
          classNamePrefix="pebble"
          components={{
            DropdownIndicator,
            Option,
            IndicatorSeparator: () => null,
          }}
          isMulti={true}
          closeMenuOnSelect={false}
          inputId={multiSelectId}
          onChange={(value: { value: any; label: string }[]) => onChange(value)}
          {...rest}
        />
      ) : (
        <Select
          classNamePrefix="pebble"
          components={{
            DropdownIndicator,
            Option,
            IndicatorSeparator: () => null,
          }}
          isMulti={true}
          closeMenuOnSelect={false}
          inputId={multiSelectId}
          onChange={(value: { value: any; label: string }[]) => onChange(value)}
          {...rest}
        />
      )}
      {helperText && (
        <HelperText
          text={helperText}
          required={required}
          invalid={invalid}
          docsLink={docsLink}
        />
      )}
    </SelectWrapper>
  );
};

interface SelectOptionProps extends OptionProps<any> {
  data: { label: string; customLabel?: any };
}

const Option = ({ data, ...rest }: SelectOptionProps) => {
  return (
    <components.Option data={data} {...rest}>
      <OptionWrapper>{data.customLabel ?? data.label}</OptionWrapper>
    </components.Option>
  );
};

const DropdownIndicator = (props: IndicatorProps<any>) => {
  return (
    components.DropdownIndicator && (
      <components.DropdownIndicator {...props}>
        <FontAwesomeIcon icon={faCaretDown} />
      </components.DropdownIndicator>
    )
  );
};
