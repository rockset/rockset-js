import * as React from 'react';
import styled, { CSSProperties } from 'styled-components';
import { stringToColors } from 'lib/utils/general';
import { pebbleTheme } from 'styles/pebbleTheme';

interface Props {
  tagName: string;
  onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  onDelete?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  style?: CSSProperties;
}

export const PebbleTag = ({ tagName, onClick, onDelete, style }: Props) => (
  <Tag clickable={Boolean(onClick)} style={{ ...stringToColors(tagName), ...style }}>
    <div onClick={onClick}>{tagName}</div>
    {onDelete && <Close onClick={onDelete}>&times;</Close>}
  </Tag>
);

const Tag = styled.div<{ clickable: boolean }>`
  display: inline-flex;
  align-items: center;
  font-size: 12px;
  font-weight: ${pebbleTheme.fonts.weights.semiBold};
  height: 17px;
  padding: 0px 10px;
  border-radius: 10px;
  margin: 4px 4px 4px 0px;
  cursor: ${props => props.clickable && 'pointer'};
`;

export const Close = styled.div`
  display: flex;
  width: 12px;
  height: 12px;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  border-style: solid;
  margin-left: 4px;
  font-weight: ${pebbleTheme.fonts.weights.bold};

  &:hover,
  &:focus {
    border-width: 1px;
    cursor: pointer;
  }
`;

export const TagContainer = styled.div`
  display: inline-flex;
  flex-wrap: wrap;
  overflow: auto;
`;
