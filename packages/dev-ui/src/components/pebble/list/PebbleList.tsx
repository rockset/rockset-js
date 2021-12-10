import * as React from 'react';
import {
  StyledPebbleOrderedList,
  StyledPebbleUnorderedList,
} from './ListStyles';
import { CSSProperties } from 'styled-components';

interface Props {
  type: 'ordered' | 'unordered';
  style?: CSSProperties;
}

interface ControlledProps extends Props {
  children: any[];
}

export const PebbleListControlled = ({
  type,
  children,
  style,
}: ControlledProps) => {
  switch (type) {
    case 'ordered':
      return (
        <StyledPebbleOrderedList style={style}>
          {children}
        </StyledPebbleOrderedList>
      );
    case 'unordered':
      return (
        <StyledPebbleUnorderedList style={style}>
          {children}
        </StyledPebbleUnorderedList>
      );
    default:
      return <></>;
  }
};

interface UncontrolledProps extends Props {
  listItems: any[];
  onClick?: (event: React.MouseEvent<HTMLLIElement, MouseEvent>) => void;
}

export const PebbleListUncontrolled = ({
  type,
  listItems,
  onClick,
  style,
}: UncontrolledProps) => {
  const mappedListItems = listItems.map((listItem, index) => (
    <li onClick={onClick} key={index.toString()} value={++index}>
      {listItem}
    </li>
  ));

  return (
    <PebbleListControlled type={type} style={style}>
      {mappedListItems}
    </PebbleListControlled>
  );
};
