import * as React from 'react';
import { PebbleSearch, PebbleH4, PebbleButton } from 'components';
import { ButtonProps } from 'components/pebble/button/PebbleButton';
import {
  filterRows,
  sortRows,
  processCells,
  processColumns,
} from './TableUtils';
import {
  Table,
  TabledHeaderRow,
  TableHeader,
  TableRow,
  TableCell,
  TrashCan,
} from './TableStyles';
import { faCaretDown, faCaretUp } from '@fortawesome/pro-solid-svg-icons';
import { faTrashAlt } from '@fortawesome/pro-regular-svg-icons';
import { faPlusCircle } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CSSProperties } from 'styled-components';
import { uuid, componentId } from 'lib/utils/general';

export interface Cell {
  key: string;
  value: string | number | string[] | number[];
}

export interface Column {
  header: string;
  key: string;
  onClick?: (row: Row, cell: Cell) => void;
  render?: (row: Row, cell: Cell) => any;
  minWidth?: string;
  cannotSort?: boolean;
}

export interface Row {
  cells: Cell[];
  notDeletable?: boolean;
  onClick?: (row: Row) => void;
}

export interface Options {
  addButton?: ButtonProps;
  canFilter?: boolean;
}

interface Props {
  rows: Row[];
  orderedColumns: Set<Column>;
  onDelete?: (row: Row) => void;
  options?: Options;
  activeRow?: number;
  activeRowStyles?: CSSProperties;
  style?: CSSProperties;
}

export const PebbleTable = ({
  rows,
  orderedColumns,
  onDelete,
  options,
  activeRow,
  activeRowStyles,
  style,
}: Props) => {
  const [columnSelectedId, setColumnSelectedId] = React.useState<string>();
  const [reverseRows, setReverseRows] = React.useState(false);
  const [processedRows, setProcessedRows] = React.useState<Row[]>(rows);
  React.useEffect(() => setProcessedRows(rows), [setProcessedRows, rows]);

  const columns = processColumns(orderedColumns, processedRows);

  const tableRows = processedRows.map((row, index) => {
    return (
      <PebbleTableRow
        row={row}
        orderedColumns={columns}
        onDelete={onDelete}
        key={uuid('row')}
        style={activeRow === index ? activeRowStyles : {}}
      />
    );
  });

  const headerRow = columns.map((column) => (
    <TableHeader
      id={column.key}
      key={uuid(`header-${column.header}`)}
      canClick={!column.cannotSort}
      onClick={(event) => {
        if (!column.cannotSort) {
          const sameColumn = event.currentTarget.id === columnSelectedId;
          const reverse = columnSelectedId ? sameColumn && !reverseRows : false;
          setColumnSelectedId(event.currentTarget.id);
          setColumnSelectedId(event.currentTarget.id);
          setProcessedRows(sortRows(column.key, processedRows, reverse));
          setReverseRows(reverse);
        }
      }}
      style={{ width: column.minWidth }}
    >
      <PebbleH4>{column.header}</PebbleH4>
      {column.key === columnSelectedId && (
        <FontAwesomeIcon
          icon={reverseRows ? faCaretUp : faCaretDown}
          style={{ marginLeft: 6 }}
        />
      )}
    </TableHeader>
  ));

  return (
    <>
      {(options?.canFilter || options?.addButton) && (
        <div
          style={{
            display: 'flex',
            justifyContent: options?.canFilter ? 'space-between' : 'flex-end',
            marginBottom: 16,
          }}
        >
          {options?.canFilter && (
            <PebbleSearch
              id={componentId('search')}
              placeholder="Search"
              onChange={(event) => {
                setProcessedRows(
                  sortRows(
                    columnSelectedId,
                    filterRows(event.target.value, rows),
                    reverseRows
                  )
                );
              }}
              style={{ width: 250 }}
            />
          )}
          {options?.addButton && (
            <PebbleButton icon={faPlusCircle} {...options?.addButton} />
          )}
        </div>
      )}
      <div style={{ overflow: 'auto' }}>
        <Table style={style}>
          <tbody>
            <TabledHeaderRow>{headerRow}</TabledHeaderRow>
            {tableRows.length > 0 ? (
              tableRows
            ) : (
              <TableRow>
                <TableCell>No rows.</TableCell>
              </TableRow>
            )}
          </tbody>
        </Table>
      </div>
    </>
  );
};

export const PebbleTableRow = ({
  row,
  orderedColumns,
  onDelete,
  style,
}: {
  row: Row;
  orderedColumns: Column[];
  onDelete: (row: Row) => void;
  style?: CSSProperties;
}) => (
  <TableRow
    onClick={() => row.onClick && row.onClick(row)}
    canClick={Boolean(row.onClick)}
    style={style}
  >
    {processCells(row, orderedColumns)}
    <TableCell style={{ flexGrow: 0, width: 30 }}>
      {onDelete && !row.notDeletable && (
        <TrashCan
          icon={faTrashAlt}
          onClick={(event) => (onDelete(row), event.stopPropagation())}
        />
      )}
    </TableCell>
  </TableRow>
);
