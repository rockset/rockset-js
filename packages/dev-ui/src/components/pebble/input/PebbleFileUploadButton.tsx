import * as React from 'react';
import { PebbleListUncontrolled, PebbleH4 } from 'components';
import styled, { CSSProperties } from 'styled-components';
import { pebbleTheme } from 'styles/pebbleTheme';

interface Props
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  multiple: boolean;
  labelText: string;
  id?: string;
  style?: CSSProperties;
}

export const PebbleFileUploadButton = ({
  onChange,
  multiple,
  id,
  labelText,
  style,
  ...rest
}: Props) => {
  const [selectedFiles, setSelectedFiles] = React.useState<string[]>();
  const buttonId = id;
  return (
    <InputWrapper multiple={multiple} style={style}>
      <input
        onChange={(event) => {
          setSelectedFiles(
            event.currentTarget.files.length > 0
              ? Array.from(event.currentTarget.files).map((file) => file.name)
              : selectedFiles
          );
          onChange(event);
        }}
        type={'file'}
        multiple={multiple}
        id={buttonId}
        {...rest}
        style={{ visibility: 'hidden', width: 0 }}
      />
      <label htmlFor={buttonId} style={{ cursor: 'pointer' }}>
        <PebbleH4>
          {multiple ? (
            selectedFiles ? (
              <PebbleListUncontrolled
                listItems={selectedFiles}
                type={'ordered'}
              />
            ) : (
              labelText
            )
          ) : (
            selectedFiles ?? labelText
          )}
        </PebbleH4>
      </label>
    </InputWrapper>
  );
};

const InputWrapper = styled.div<{ multiple: boolean }>`
  display: flex;
  align-items: center;
  color: ${pebbleTheme.contextColors.text.link};
  text-decoration: ${(props) => (props.multiple ? 'none' : 'underline')};
  text-decoration-color: ${pebbleTheme.contextColors.text.link};
  cursor: pointer;
`;
