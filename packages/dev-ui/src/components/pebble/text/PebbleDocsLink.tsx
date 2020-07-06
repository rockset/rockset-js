import * as React from 'react';
import { PebbleLink } from './PebbleText';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLink } from '@fortawesome/pro-light-svg-icons';
import styled, { CSSProperties } from 'styled-components';
import { pebbleTheme } from 'styles/pebbleTheme';
import * as path from 'path';

interface ShortProps {
  children: string;
  route: string;
  style?: CSSProperties;
}

export const PebbleDocsShortLink = ({
  children,
  route,
  ...rest
}: ShortProps) => {
  const base = 'https://docs.rockset.com/';
  const href = path.join(base, route);
  return (
    <DocsLink target="_blank" rel="noopener nofeferrer" {...{ ...rest, href }}>
      {children}
    </DocsLink>
  );
};

interface Props {
  text: string;
  href: string;
  style?: CSSProperties;
}
export const PebbleDocsLink = ({ text, ...rest }: Props) => (
  <DocsLink target="_blank" rel="noopener nofeferrer" {...rest}>
    <FontAwesomeIcon
      icon={faExternalLink as any}
      color={pebbleTheme.contextColors.text.link}
      style={{ marginRight: 2, fontSize: 10 }}
    />
    {text}
  </DocsLink>
);

const DocsLink = styled(PebbleLink)`
  display: inline-flex;
  align-items: center;
`;
