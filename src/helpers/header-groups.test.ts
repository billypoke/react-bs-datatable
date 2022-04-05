import { processHeaderGroups, getHeaderIdxMap } from './header-groups';
import { TableColumnType } from './types';

interface Values {
  name: string;
  q1: number;
  q2: number;
  q3: number;
  q4: number;
}

const TABLE_HEADERS: TableColumnType<Values>[] = [
  {
    prop: 'name',
    title: 'Name'
  },
  {
    prop: 'q1',
    title: 'Quarter 1'
  },
  {
    prop: 'q2',
    title: 'Quarter 2'
  },
  {
    prop: 'q3',
    title: 'Quarter 3'
  },
  {
    prop: 'q4',
    title: 'Quarter 4'
  }
];

test('getHeaderIdxMap', () => {
  const headerPropIdxMap = getHeaderIdxMap(TABLE_HEADERS);
  expect(headerPropIdxMap).toEqual({
    name: 0,
    q1: 1,
    q2: 2,
    q3: 3,
    q4: 4
  });
});

describe('processHeaderGroups', () => {
  const headerPropIdxMap = getHeaderIdxMap(TABLE_HEADERS);

  test('one fold', () => {
    expect(
      processHeaderGroups(TABLE_HEADERS, [
        {
          title: 'First Semester',
          children: ['q1', 'q2']
        },
        {
          title: 'Second Semester',
          children: ['q3', 'q4']
        }
      ])
    );
  });
});
