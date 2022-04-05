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
) {
  const headerPropToIdxMap = getHeaderIdxMap(headers);
}

// Helper functions.
function getHeaderIdxMap(headers: TableColumnType<any>[]) {
  const headerPropToIdxMap: Record<string, number> = {};
  for (let i = 0; i < headers.length; i += 1) {
    headerPropToIdxMap[headers[i].prop as string] = i;
  }

  return headerPropToIdxMap;
}

function getNestedHeaders(
  headerPropToIdxMap: Record<string, number>,
  headerGroups: TableHeaderGroup[],
  deepestLevel = 0
): {
  nestedHeaders: string[];
  deepestLevel: number;
} {
  //
  const nestedHeaders: string[] = [];
  let deepest = deepestLevel;

  for (const headerGroup of headerGroups) {
    for (const child of headerGroup.children) {
      if (typeof child !== 'object') {
        nestedHeaders.push(String(child));
      } else {
        const result = getNestedHeaders(
          headerPropToIdxMap,
          headerGroups,
          deepest
        );
        nestedHeaders.push(...result.nestedHeaders);

        if (result.deepestLevel > deepest) {
          deepest = result.deepestLevel;
        }
      }
    }
  }

  return { nestedHeaders, deepestLevel: deepest };
}
