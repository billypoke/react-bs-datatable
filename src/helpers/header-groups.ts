import { TableColumnType } from './types';

// TODO(imballinst): for v4, we need to refactor the table and make this mandatory,
// Default the type to `any` so it's not mandatory.
// so that the grouped table headers have stronger typings.
export interface TableHeaderGroup<
  TTableColumnType extends Record<string, any> = any
> {
  title: string;
  children: (keyof TTableColumnType | TableHeaderGroup<TTableColumnType>)[];
}

export function processHeaderGroups<TTableColumnType>(
  headers: TableColumnType<TTableColumnType>[],
  headerGroups?: TableHeaderGroup<TTableColumnType>[]
):
  | {
      result: Record<string, string[]>;
      deepestLevel: number;
    }
  | undefined {
  if (!headerGroups) {
    return undefined;
  }

  const headerToHeaderGroupMap: Record<string, string[]> = {};
  const headerRowArray = getHeaderRowTitles(headerGroups);
  let deepestLevel = 0;

  for (const subArray of headerRowArray) {
    const prop = subArray.pop()!;
    headerToHeaderGroupMap[prop] = [
      ...subArray,
      headers.find((header) => header.prop === prop)?.title!
    ];

    if (headerToHeaderGroupMap[prop].length > deepestLevel) {
      deepestLevel = headerToHeaderGroupMap[prop].length;
    }
  }

  return { result: headerToHeaderGroupMap, deepestLevel };
}

// Helper functions.
function getHeaderRowTitles(
  headerGroups: TableHeaderGroup<any>[],
  parentHeaders: string[] = []
): string[][] {
  const array: string[][] = [];
  const parent = [...parentHeaders];

  for (const headerGroup of headerGroups) {
    parent.push(headerGroup.title);

    if (isChildrenHeaderGroup(headerGroup.children)) {
      // Nested header.
      const subArray = getHeaderRowTitles(headerGroup.children);
      array.push(...subArray);
    } else {
      for (const prop of headerGroup.children) {
        array.push([...parent, String(prop)]);
      }
    }
  }

  return array;
}

function isChildrenHeaderGroup(
  children: TableHeaderGroup<any>['children']
): children is TableHeaderGroup<any>[] {
  return typeof children[0] === 'object';
}
