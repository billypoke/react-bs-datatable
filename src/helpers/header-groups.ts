import { TableColumn, TableColumnInfo, TableGroup } from './types';

export function getColumnSizesPerRow<TTableColumnInfo>(
  headers: TableColumn<TTableColumnInfo>[],
  currentLevel = 1
): number[][] {
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
      columnSizesPerRow: new Array(headers.length).fill(1),
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

export function getTableHeaderGridStructure(
  headers: TableColumn[],
  numberInfo: {
    numberOfColumns: number;
    numberOfRows: number;
  }
): (TableColumn | null)[][] {
  const grid: (TableColumn | null)[][] = [];

  return grid;
}
