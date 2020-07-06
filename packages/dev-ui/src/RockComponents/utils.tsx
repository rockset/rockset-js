/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

/* This code is copied from console, and throws a TON of errors with the above lint rules :P */

import * as React from 'react';
import _ from 'lodash';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronRight,
  faChevronDown,
} from '@fortawesome/pro-regular-svg-icons';
import RockDataTable from './RockDataTable';

export const StylesWrapper = styled.div<{ isSubTable?: boolean }>`
  margin-left: ${(props) => (props.isSubTable ? '5px' : '0px')};
  .ReactTable {
    border-left: ${(props) =>
      props.isSubTable ? '2px solid #175d8d' : '0px solid transparent'};
    border-bottom: ${(props) =>
      props.isSubTable
        ? '0px solid transparent'
        : '1px solid rgba(0, 0, 0, 0.1)'};
    border-right: ${(props) =>
      props.isSubTable
        ? '0px solid transparent'
        : '1px solid rgba(0, 0, 0, 0.1)'};

    .__react_component_tooltip {
      white-space: pre-wrap;
    }

    .rt-tbody .rt-tr:hover {
      background: transparent !important;
    }

    .rt-thead.-header {
      box-shadow: none;
      border-bottom: 1px solid rgba(232, 232, 232) !important;
    }

    .rt-resizable-header:last-child {
      border-right: 1px solid rgba(232, 232, 232) !important;
    }

    .rt-td:last-child {
      border-right: 1px solid rgba(232, 232, 232) !important;
    }

    .rt-tr {
      text-align: left !important;
    }

    .rt-th {
      background-color: #f2f2f2;
      font-size: 12px;
      font-weight: 600;
      color: #1b2834;
      padding: 7px 12px !important;
      border-right: 1px solid transparent !important;
    }

    .rt-td {
      font-size: 14px;
      padding: 0px 0px;
      border-color: rgba(232, 232, 232) !important;
      border-right: 1px solid transparent !important;
    }

    .-pagination {
      font-size: 14px;
      padding: 0px;
      .-btn {
        padding: 0px;
        border-radius: 0px;
      }

      .-pageJump input {
        padding: 2px 7px;
      }
    }
  }
`;

const Cell = styled.div<{ expandable?: boolean; isExpanded?: boolean }>`
  cursor: ${(props) => (props.expandable ? 'pointer' : 'auto')};
  padding: 4px 4px 4px 8px;
  overflow: hidden;
  text-overflow: ellipsis;
  background-color: ${(props) =>
    props.isExpanded ? 'rgba(85, 150, 230, 0.1)' : 'transparent'};
  border: 1px solid transparent !important;
  :hover {
    background-color: rgba(85, 150, 230, 0.1);
    border: 1px solid #047cc0 !important;
    svg {
      color: #175d8d;
    }
  }
`;

const IconWrapper = styled.span<{ expandable?: boolean; isExpanded?: boolean }>`
  font-size: 10px;
  display: ${(props) => (props.expandable ? 'inline-block' : 'none')};
  margin-right: 7px;
  color: ${(props) => (props.isExpanded ? '#175d8d' : '#dadfe2')};
`;

// Computes the max char length of [all data, header]
const maxColumnChars = (data: any, key: any) =>
  _.min([
    _.reduce(
      data,
      (max: any, elem: any) => {
        if (elem[key]) {
          return _.max([max, JSON.stringify(elem[key]).length]);
        }
        return max;
      },
      JSON.stringify(key).length
    ),
    40,
  ]);

const parseRichJSONObj = (value: any) => {
  let val: string;
  let color: string;

  if (!value) {
    return ['null', 'darkgray'];
  }
  // we may be parsing a non-typed object,
  // so we just return a default color and value here.
  if (!('__rockset_type' in value)) {
    val = JSON.stringify(value);
    color = '#1b2834';
    return [val, color];
  }
  const rocksetType = value.__rockset_type.toLowerCase();
  switch (rocksetType) {
    case 'int':
    case 'bytes':
    case 'datetime':
    case 'date':
    case 'time':
    case 'timestamp':
      return [value.value, '#000080'];
    // undefined === null
    case 'undefined':
      return ['NULL', '#1b2834'];
    default:
      return [JSON.stringify(value), '#1b2834'];
  }
};

const generateTableCell = (value: unknown) => {
  let val: unknown;
  let color: string;
  switch (typeof value) {
    case 'string':
      val = `'${value.replace(/\n/g, ' ')}'`;
      color = '#d14';
      break;
    case 'boolean':
      val = value.toString();
      color = '#219';
      break;
    case 'number':
      val = value;
      color = '#164';
      break;
    case 'object':
      [val, color] = parseRichJSONObj(value);
      break;
    default:
      val = value;
      color = '#1b2834';
  }

  const tooltip = null;
  const toolTipText = null;
  const id = null;

  // values over length 40 will NOT be rendered by the DataTable and are instead relagated
  // to '...'. By truncating here (37 chars plus '...') we can make sure to render something
  // for all cells
  if (val && val.toString().length > 40) {
    val = _.truncate(val.toString(), { length: 37 });
    // If we are truncating a string type, let's at least show the full value in a tooltip
    // (otherwise user will have no way of ever discovering full value)
    // if (typeof value === 'string') {
    //   toolTipText = value;
    //   id = _.uniqueId();
    //   tooltip = <RockTooltip id={id} effect="solid" place="top" />;
    // }
  }

  return (
    <>
      <pre
        className="bx--snippet"
        style={{ color, fontSize: '12px', display: 'inline-block' }}
      >
        <code data-tip={toolTipText} data-for={id}>
          {val}
          {tooltip}
        </code>
      </pre>
    </>
  );
};

// Given arbitrary json array, compute column names. Only go one level deep in tree.
export const columnsFromData = (
  data: any[],
  sortColumns: any,
  limitColumns: any,
  moreColumnsOnClick: any
) => {
  if (!data || data.length === 0) {
    return [];
  }

  const dataKeys = data.map((d) => (_.isObject(d) ? Object.keys(d) : []));
  const allKeys =
    _.reduce(dataKeys, (keys = [], nextKey) => _.union(keys, nextKey)) ?? [];
  const maxNumKeys = allKeys.length;
  const keys = allKeys.slice(0, limitColumns);
  let columns: any = keys.map((key, index) => {
    const cell = {
      Header: key,
      id: key || 'null key ???',
      accessor: (obj: any) => obj[key],
      minWidth: _.max([maxColumnChars(data, key) * 10, 200]),
      Cell: (props: any) => {
        const {
          // react table props
          column: { Header },
          columnProps: {
            rest: { toggleRowSubComponent, getActiveColumn },
          },
          nestingPath,
        } = props;

        const expandable =
          (_.isObject(props.value) || _.isArray(props.value)) &&
          !_.isEmpty(props.value);
        const isExpanded = expandable && getActiveColumn(nestingPath) === key;

        const value = props.value;
        return (
          <Cell
            expandable={expandable}
            isExpanded={isExpanded}
            onClick={(e: any) =>
              expandable
                ? toggleRowSubComponent({ nestingPath }, e, Header, props.value)
                : null
            }
          >
            <IconWrapper expandable={expandable} isExpanded={isExpanded}>
              <FontAwesomeIcon
                icon={isExpanded ? faChevronDown : faChevronRight}
              />
            </IconWrapper>
            {generateTableCell(value)}
          </Cell>
        );
      },
      ...(index !== keys.length - 1
        ? { maxWidth: _.min([maxColumnChars(data, key) * 10, 300]) }
        : {}),
    };
    return cell;
  });

  if (sortColumns) {
    columns = _(columns)
      .sortBy((c) => c.id.toLowerCase())
      .value();
  }
  if (limitColumns < maxNumKeys) {
    columns.push({
      Header: (
        <div
          style={{
            color: '#175D8D',
            // padding: '5px',
            // border: '1px solid #175D8D',
            textDecoration: 'underline',
            // textAlign: 'center',
            width: '150px',
          }}
          onClick={moreColumnsOnClick}
        >
          Show More...
        </div>
      ),
      id: '__more_columns_internal',
      accessor: () => '',
      maxWidth: 250,
      Cell: () => <></>,
    });
  }

  /* If we create a table with a SubComponent that has no 'expander' columns,
   * an expander column is automatically prepended to the table. By unshifting
   * an 'expander' column with `show: false`, we can circumvent this. */
  columns.unshift({
    expander: true,
    show: false,
  });

  return columns;
};

export const subComponentWithToggle = (SubComponent: any, expandFuncs: any) => (
  props: any
) => <SubComponent {...props} {...expandFuncs} />;

export const columnsWithToggle = (columns: any, expandFuncs: any) =>
  columns.map((column: any) => {
    if (column.columns) {
      return {
        ...column,
        columns: columnsWithToggle(column.columns, expandFuncs),
      };
    }
    return {
      ...column,
      getProps() {
        return {
          ...expandFuncs,
        };
      },
    };
  });

/* Recursive table structure: if object, render new [object] table. If
 * Array, render index => value table. */
export const SubComponent = ({ getActiveColumn, nestingPath, row }: any) => {
  const activeColumn = getActiveColumn(nestingPath);
  let subData = row[activeColumn];
  if (_.isArray(subData)) {
    subData = subData.map((value, index) => ({ index: index + 1, value }));
  } else if (_.isObject(subData)) {
    subData = [subData];
  }
  return <RockDataTable data={subData} isSubTable={true} />;
};
