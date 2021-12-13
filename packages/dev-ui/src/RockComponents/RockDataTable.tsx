/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

/* LEGACY CODE copied from console. */

import * as React from 'react';
import * as _ from 'lodash';

import {
  StylesWrapper,
  columnsFromData,
  subComponentWithToggle,
  columnsWithToggle,
  SubComponent,
} from './utils';

import 'react-table/react-table.css';
const ReactTable = require('react-table').default;

export function setPath<Return>(
  state: object,
  path: string,
  data: any
): Return {
  return (_.setWith(_.clone(state), path, data, _.clone) as unknown) as Return;
}

type Column = {
  Header?: string;
  accessor?: string;
  minWidth?: number;
  maxWidth?: number;
  Cell?: JSX.Element;
  expander?: boolean;
  show?: boolean;
};

interface Props {
  data: Record<string, any>[];
  isSubTable?: boolean;
  pageSize?: number;
  sortColumns?: boolean;
  initialColumnLimit?: number;
}

interface State {
  columns: Column[];
  expanded: Record<string, any>;
  prevProps: {};
  columnLimit: number;
}

const defaultNumColumns = 10;
const columnIncrement = 10;

export default class RockDataTable extends React.Component<Props, State> {
  expandFuncs: any;

  constructor(props: Props) {
    super(props);
    this.state = {
      prevProps: {},
      columns: columnsFromData(
        props.data,
        props.sortColumns,
        props.initialColumnLimit || defaultNumColumns,
        () => this.updateColumns()
      ),
      expanded: {},
      columnLimit: props.initialColumnLimit || defaultNumColumns,
    };
    this.toggleRowSubComponent = this.toggleRowSubComponent.bind(this);
    this.getActiveColumn = this.getActiveColumn.bind(this);
    this.expandFuncs = {
      toggleRowSubComponent: this.toggleRowSubComponent,
      getActiveColumn: this.getActiveColumn,
    };
  }

  updateColumns() {
    this.setState({
      columnLimit: this.state.columnLimit + columnIncrement,
    });
  }

  /* If data changes, regenerate columns. */
  componentDidUpdate(prevProps: Props, prevState: State) {
    if (
      (prevProps && !_.isEqual(prevProps, this.props)) ||
      this.state.columnLimit > prevState.columnLimit
    ) {
      this.setState({
        columns: columnsFromData(
          this.props.data,
          this.props.sortColumns,
          this.state.columnLimit,
          () => this.updateColumns()
        ),
      });
    }
  }

  getActiveColumn(nestingPath: string) {
    return _.get(this.state.expanded, [nestingPath, 'column']);
  }

  toggleRowSubComponent(rowInfo: any, e: any, column: any) {
    const expandedCol = _.get(this.state.expanded, [
      rowInfo.nestingPath,
      'column',
    ]);

    /* If the currently expanded cell is clicked, we want to collapse the row,
     * however if a different cell in that row is clicked, we want to simply change
     * the active column. */
    const expanded = setPath(
      this.state.expanded,
      rowInfo.nestingPath,
      expandedCol && expandedCol === column ? false : { column }
    ) as Record<string, string>;

    this.setState({ expanded: expanded });
  }

  render() {
    const { data, isSubTable } = this.props;

    /* Default 20 rows max page size */
    const pageSize = _.get(this.props, 'pageSize', 20);

    if (!data) {
      return <div />;
    }

    /* No need to show empty rows if less than pageSize rows.. */
    const defaultPageSize = data.length > pageSize ? pageSize : data.length;

    /* These wrappers gives columns and SubComponents access to the helper functions
     * defined in this class, namely accessing and toggling active column states. */
    const wrappedColumns = columnsWithToggle(
      this.state.columns,
      this.expandFuncs
    );
    const WrappedSubComponent = subComponentWithToggle(
      SubComponent,
      this.expandFuncs
    );

    return (
      <div className="fs-secret">
        <StylesWrapper isSubTable={isSubTable}>
          <ReactTable
            data={data}
            columns={wrappedColumns}
            defaultPageSize={defaultPageSize}
            className="-highlight"
            showPagination={data.length > pageSize}
            expanded={this.state.expanded}
            SubComponent={WrappedSubComponent}
            minRows={0}
          />
        </StylesWrapper>
      </div>
    );
  }
}
