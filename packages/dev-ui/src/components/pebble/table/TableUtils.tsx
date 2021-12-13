import * as React from 'react';
import { Row, Column } from './PebbleTable';
import * as Components from './TableStyles';

export const filterRows = (query: string, rows: Row[]) => {
  return rows.filter(row =>
    row.cells.some(cell =>
      cell.value
        ?.toString()
        .toUpperCase()
        .includes(query.toUpperCase()),
    ),
  );
};

export const sortRows = (key: string, rows: Row[], reverse: boolean) => {
  return [...rows].sort((rowX, rowY) => {
    if (
      rowX.cells.find(cell => cell.key === key)?.value <
      rowY.cells.find(cell => cell.key === key)?.value
    ) {
      return reverse ? 1 : -1;
    } else if (
      rowX.cells.find(cell => cell.key === key)?.value ===
      rowY.cells.find(cell => cell.key === key)?.value
    ) {
      return 0;
    } else {
      return reverse ? -1 : 1;
    }
  });
};

export const processCells = (row: Row, orderedColumns: Column[]) => {
  const keyMap = {};
  row.cells.forEach((cell, index) => {
    keyMap[cell.key] = index;
  });
  return orderedColumns.map(column => {
    return (
      <Components.TableCell
        key={column.key}
        onClick={() =>
          column.onClick
            ? column.onClick(row, row.cells[keyMap[column.key]])
            : row.onClick
            ? row.onClick(row)
            : {}
        }
        style={{ width: column.minWidth }}
      >
        {column.render
          ? column.render(row, row.cells[keyMap[column.key]])
          : row.cells[keyMap[column.key]].value}
      </Components.TableCell>
    );
  });
};

export const processColumns = (orderedColumns: Set<Column>, rows: Row[]) => {
  const maxWidths = {};
  rows.forEach(row =>
    row.cells.forEach(cell => {
      maxWidths[cell.key] = Math.max(maxWidths[cell.key] ?? 0, cell.value?.toString().length ?? 0);
    }),
  );
  orderedColumns.forEach(
    column =>
      (maxWidths[column.key] = Math.max(maxWidths[column.key], column.header.toString().length)),
  );
  orderedColumns.forEach(
    column =>
      (column.minWidth = column.minWidth ? column.minWidth : `${maxWidths[column.key] * 9 + 20}px`),
  );
  return Array.from(orderedColumns.values());
};
