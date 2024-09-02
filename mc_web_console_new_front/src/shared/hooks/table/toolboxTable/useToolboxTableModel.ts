import { computed, ComputedRef, reactive } from 'vue';
import {
  ChangeEvent,
  ITableField,
  ITableItems,
} from '@/shared/hooks/table/toolboxTable/types.ts';

type ITableState<T> = {
  loading: boolean;
  fields: ITableField<ITableItems<T>>[];
  items: ITableItems<T>[];
  selectIndex: number[];
  sortedItems: ITableItems<T>[];
  displayItems: ITableItems<T>[];
  currentPage: number;
  startPage: number;
  tableCount: ComputedRef<number>;
};

export const useToolboxTableModel = <T>() => {
  const tableState = reactive(<ITableState<T>>{
    loading: true,
    fields: [],
    items: [],
    selectIndex: [],
    sortedItems: [],
    displayItems: [],
    currentPage: 1,
    startPage: 1,
    tableCount: computed((): number => tableState.sortedItems.length),
  }) as ITableState<T>;

  const tableOptions = reactive({
    sortable: true,
    sortBy: 'name',
    selectable: true,
    multiSelect: true,
    searchType: 'query',
    pageSize: 15,
  });

  const querySearchState = reactive({
    keyItemSet: [],
    valueHandlerMap: {},
    queryTag: [],
  });

  const tableSort = (
    items: any[],
    sortBy: string,
    sortDesc: boolean,
  ): any[] => {
    return [
      ...items.sort((a: any, b: any) => {
        const valA = a[sortBy];
        const valB = b[sortBy];

        let comparison = 0;

        if (typeof valA === 'number' && typeof valB === 'number') {
          comparison = valA - valB;
        } else if (typeof valA === 'string' && typeof valB === 'string') {
          comparison = valA.localeCompare(valB);
        } else if (valA instanceof Date && valB instanceof Date) {
          comparison = valA.getTime() - valB.getTime();
        } else {
          comparison = JSON.stringify(valA).localeCompare(JSON.stringify(valB));
        }

        return sortDesc ? -comparison : comparison;
      }),
    ];
  };

  const updatePagination = (e: ChangeEvent) => {
    if (e?.pageStart) {
      tableState.startPage = e.pageStart;
      tableState.currentPage =
        Math.floor(e.pageStart / tableOptions.pageSize) + 1;
    }
    if (e?.pageLimit) {
      tableOptions.pageSize = e.pageLimit;
    }
  };

  const applyQueryTags = (e: ChangeEvent) => {
    if (e?.queryTags?.length) {
      tableState.sortedItems = tableState.items.filter((row: any) =>
        e.queryTags!.every(queryTag => {
          const regex = new RegExp(queryTag.value.name, 'gi');

          if (queryTag.key === null) {
            return Object.values(row).some(
              value => typeof value === 'string' && regex.test(value),
            );
          }

          const fieldValue = row[queryTag.key.name];
          return typeof fieldValue === 'string' && regex.test(fieldValue);
        }),
      );
    } else if (e?.queryTags?.length === 0) {
      tableState.sortedItems = tableState.items;
    }
  };

  const applySorting = (e: ChangeEvent) => {
    if (!isNullOrUndefined(e?.sortBy) && !isNullOrUndefined(e?.sortDesc)) {
      tableState.sortedItems = tableSort(
        tableState.sortedItems,
        e.sortBy!,
        e.sortDesc!,
      );
    }
  };
  const handleChange = (e: any) => {
    tableState.loading = true;
    updatePagination(e);
    applyQueryTags(e);
    applySorting(e);

    const startIdx = tableOptions.pageSize * (tableState.currentPage - 1);
    const endIdx = tableState.startPage + tableOptions.pageSize - 1;

    tableState.displayItems = tableState.sortedItems.slice(startIdx, endIdx);

    tableState.loading = false;
  };
  const isNullOrUndefined = (value: any) => {
    return value === null || value === undefined;
  };
  return {
    tableOptions,
    tableState,
    querySearchState,
    handleChange,
  };
};
