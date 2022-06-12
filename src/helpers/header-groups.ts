import { TableColumn, TableColumnInfo, TableGroup } from './types';

export function getColumnSizesPerRow<TTableColumnInfo>(
  headers: TableColumn<TTableColumnInfo>[],
  currentLevel = 1
): {
  numberOfColumns: number;
  numberOfRows: number;
} {
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
  gridInfo: {
    numberOfColumns: number;
    numberOfRows: number;
  }
): (number | null)[][] {
  const result = headers.map((header) =>
    getColumnSize(header, gridInfo.numberOfRows)
  );
  return result;
}

// Helper functions.
// The array is the column size for a prop. For example, `[1, null, null]` means
// the column size is 1 and it has `rowSpan={3}`.
function getColumnSize(
  header: TableColumn<any>,
  maxNumberOfRows: number,
  currentRow = 1
): (number | null)[] {
  const result: (number | null)[] = [];

  if (header.type === 'group') {
    for (const child of header.headerChildren) {
      const columnSizes = getColumnSize(child, maxNumberOfRows, currentRow + 1);

      for (let i = 0; i < columnSizes.length; i += 1) {
        if (columnSizes[i] === null) {
          result[i] = null;
        } else {
          result[i] = (result[i] || 0) + (columnSizes[i] as number);
        }
      }
    }
  } else {
    result[0] = 1;

    const diff = maxNumberOfRows - currentRow;
    for (let i = 1; i <= diff; i += 1) {
      result[i] = null;
    }
  }

  return result;
}
