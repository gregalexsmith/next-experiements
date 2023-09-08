'use client';

import 'react-data-grid/lib/styles.css';
import DataGrid, { Column, SortColumn } from 'react-data-grid';
import { FileWithMetrics } from './types';
import { useMemo, useState } from 'react';
import './some.css';

type Row = Pick<
  FileWithMetrics,
  | 'displayPath'
  | 'lineCount'
  | 'characterCount'
  | 'numberOfCommits'
  | 'numberOfDependentFiles'
>;

const columns: Column<Row>[] = [
  {
    key: 'displayPath',
    name: 'File Path',
  },
  { key: 'lineCount', name: '# Lines' },
  { key: 'characterCount', name: '# Characters' },
  { key: 'numberOfCommits', name: '# Commits' },
  { key: 'numberOfDependentFiles', name: '# Dependent Files' },
];

type GridProps = {
  rows: Row[];
};

export function Grid({ rows }: GridProps) {
  const [sortColumns, setSortColumns] = useState<readonly SortColumn[]>([
    {
      columnKey: 'lineCount',
      direction: 'DESC',
    },
  ]);

  const sortedRows = useMemo((): readonly Row[] => {
    if (sortColumns.length === 0) return rows;

    return [...rows].sort((a, b) => {
      for (const sort of sortColumns) {
        const comparator = (a: any, b: any) => {
          const aVal = parseFloat(a[sort.columnKey]);
          const bVal = parseFloat(b[sort.columnKey]);
          return aVal - bVal;
        };
        const compResult = comparator(a, b);
        if (compResult !== 0) {
          return sort.direction === 'ASC' ? compResult : -compResult;
        }
      }
      return 0;
    });
  }, [rows, sortColumns]);

  return (
    <DataGrid
      columns={columns}
      className="h-full"
      rows={sortedRows}
      rowHeight={26}
      sortColumns={sortColumns}
      onSortColumnsChange={setSortColumns}
      defaultColumnOptions={{
        sortable: true,
      }}
    />
  );
}
