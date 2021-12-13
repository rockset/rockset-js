import * as React from 'react';
import { Breadcrumbs, Breadcrumb } from './BreadcrumbsStyles';

interface BreadcrumbsProps {
  noTrailingSlash: boolean;
  children: React.ReactElement<BreadcrumbProps>[];
}

export const PebbleBreadcrumbs = ({
  noTrailingSlash,
  children,
}: BreadcrumbsProps) => {
  return (
    <Breadcrumbs noTrailingSlash={noTrailingSlash}>{children}</Breadcrumbs>
  );
};

interface BreadcrumbProps {
  onClick: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
  href: string;
  key: string;
  children: any;
}

export const PebbleBreadcrumb = ({ children, ...rest }: BreadcrumbProps) => {
  return (
    <Breadcrumb style={{ textDecoration: 'none' }} {...rest}>
      <span>{children}</span>
    </Breadcrumb>
  );
};
