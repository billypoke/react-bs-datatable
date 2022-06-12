import { getColumnSizes, getColumnSizesPerRow } from './header-groups';
import { TableColumn } from './types';

interface Values {
  name: string;
  q1: number;
  q2: number;
  q3: number;
  q4: number;
}

const TABLE_HEADERS_WITHOUT_CHILDREN: TableColumn<Values>[] = [
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
const TABLE_HEADERS_2_LEVELS: TableColumn<Values>[] = [
  {
    prop: 'name',
    title: 'Name'
  },
  {
    type: 'group',
    title: 'First Semester',
    headerChildren: [
      {
        prop: 'q1',
        title: 'Quarter 1'
      },
      {
        prop: 'q2',
        title: 'Quarter 2'
      }
    ]
  },
  {
    type: 'group',
    title: 'Second Semester',
    headerChildren: [
      {
        prop: 'q3',
        title: 'Quarter 3'
      },
      {
        prop: 'q4',
        title: 'Quarter 4'
      }
    ]
  }
];
const TABLE_HEADERS_3_LEVELS_ASYMMETRIC: TableColumn<Values>[] = [
  {
    prop: 'name',
    title: 'Name'
  },
  {
    type: 'group',
    title: '2021',
    headerChildren: [
      {
        type: 'group',
        title: 'First Semester',
        headerChildren: [
          {
            prop: 'q1',
            title: 'Quarter 1'
          },
          {
            prop: 'q2',
            title: 'Quarter 2'
          }
        ]
      },
      {
        type: 'group',
        title: 'Second Semester',
        headerChildren: [
          {
            prop: 'q3',
            title: 'Quarter 3'
          },
          {
            prop: 'q4',
            title: 'Quarter 4'
          }
        ]
      }
    ]
  },
  {
    type: 'group',
    title: '2022',
    headerChildren: [
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
    ]
  }
];

describe('getColumnSizesPerRow', () => {
  test('1 level', () => {
    expect(getColumnSizesPerRow(TABLE_HEADERS_WITHOUT_CHILDREN)).toEqual({
      numberOfColumns: 5,
      numberOfRows: 1
    });
  });

  test('2 level', () => {
    expect(getColumnSizesPerRow(TABLE_HEADERS_2_LEVELS)).toEqual({
      numberOfColumns: 5,
      numberOfRows: 2
    });
  });

  test('3 level, asymmetric', () => {
    expect(getColumnSizesPerRow(TABLE_HEADERS_3_LEVELS_ASYMMETRIC)).toEqual({
      numberOfColumns: 9,
      numberOfRows: 3
    });
  });
});

describe('getColumnSizes', () => {
  // test('1 level', () => {
  //   const sizes = getColumnSizesPerRow(TABLE_HEADERS_WITHOUT_CHILDREN);
  //   expect(getColumnSizes(TABLE_HEADERS_WITHOUT_CHILDREN, sizes)).toEqual([
  //     [1],
  //     [1],
  //     [1],
  //     [1],
  //     [1]
  //   ]);
  // });

  test('2 level', () => {
    const sizes = getColumnSizesPerRow(TABLE_HEADERS_2_LEVELS);
    expect(getColumnSizes(TABLE_HEADERS_2_LEVELS, sizes)).toEqual([
      [1],
      [1],
      [1],
      [1],
      [1]
    ]);
  });
});
