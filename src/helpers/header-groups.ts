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
  const result: (number | null)[][] = [];

  for (let i = 0; i < headers.length; i++) {
    const header = headers[i];

    if (header.type === 'group') {
    } else {
    }
  }

  return result;
}
