import styled from 'styled-components';
import { PebbleLink } from 'components/pebble/text/PebbleText';
import { pebbleTheme } from 'styles/pebbleTheme';

export const Breadcrumbs = styled.div<{ noTrailingSlash: boolean }>`
  a:last-child:after {
    margin-right: 0;
    content: '${(props) => (props.noTrailingSlash ? '' : '/')}';
  }
`;

export const Breadcrumb = styled(PebbleLink)`
  border-style: solid;
  border-color: ${pebbleTheme.baseColors.gray11};

  span:hover {
    cursor: pointer;
    color: ${pebbleTheme.baseColors.blue8};
    border-style: solid;
    border-color: ${pebbleTheme.baseColors.gray11};
    border-bottom-width: 1px;
  }

  &:after {
    content: '/';
    margin-left: 1rem;
    margin-right: 1rem;
  }
`;
