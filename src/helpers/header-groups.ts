import { TableColumn, TableColumnInfo, TableGroup } from './types';

interface GridInfo {
  numberOfColumns: number;
  numberOfRows: number;
}

export function getColumnSizesPerRow<TTableColumnInfo>(
  headers: TableColumn<TTableColumnInfo>[],
  currentLevel = 1
): GridInfo {
  // Check if it's header group.
  const headerWithGroupings: TableGroup[] = [];
  const headerColumns: TableColumnInfo[] = [];

  for (const header of headers) {
    if (header.type === 'group') {
      headerWithGroupings.push(header);
    } else {
      headerColumns.push(header);
    }
  }

  if (headerWithGroupings.length === 0) {
    return {
      numberOfColumns: headers.length,
      numberOfRows: currentLevel
    };
  }

  const childrenInfo = headerWithGroupings.map((header) =>
    getColumnSizesPerRow(header.headerChildren || [], currentLevel + 1)
  );
  let totalNumberOfChildColumns = headerColumns.length;
  let maxNumberOfRows = 0;

  for (const child of childrenInfo) {
    totalNumberOfChildColumns += child.numberOfColumns;
    maxNumberOfRows = Math.max(maxNumberOfRows, child.numberOfRows);
  }

  return {
    numberOfColumns: totalNumberOfChildColumns,
    numberOfRows: maxNumberOfRows
  };
}

/**
 * @internal
 *
 * This table:
 *
 * | Number | ID |    Name                 |
 * |        |    |  First name | Last name |
 * | ------ | -- | ----------------------- |
 *
 * is represented by:
 *
 * [1, 1, 2]
 * [null, null, 1, 1]
 */
export function getColumnSizes(
  headers: TableColumn<any>[],
  gridInfo: GridInfo
): (number | null)[][] {
  const result = headers.map((header) =>
    getColumnSize(header, gridInfo.numberOfRows)
  );
  return result;
}

// Helper functions.
// The array is the column size for a prop. For example, `[1, null, null]` means
// the column size is 1 and it has `rowSpan={3}`.
interface SpanInfo {
  rowSpan: number;
  colSpan: number;
}

function getColumnSize(
  header: TableColumn<any>,
  gridInfo: GridInfo,
  currentRow = 0
): SpanInfo[] {
  const result: SpanInfo[] = [];

  if (header.type === 'group') {
    for (const child of header.headerChildren) {
      const columnSizes = getColumnSize(child, numberOfRows, currentRow + 1);
      const totalSpan: SpanInfo = { colSpan: 0, rowSpan: 0 };
    }
  } else {
    result[0] = {
      colSpan: 1,
      rowSpan: numberOfRows - currentRow
    };
  }

  return result;
}
