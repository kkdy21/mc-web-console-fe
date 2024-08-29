import { reactive } from 'vue';

export const useToolboxTableModel = () => {
  const tableState = reactive({
    loading: true,
    fields: [],
    items: [],
    selectIndex: [],
    sortedItems: [],
  });
  const tableOptions = reactive({
    sortable: true,
    sortBy: 'name',
    selectable: true,
    multiSelect: true,
    searchType: 'query',
  });

  const querySearchState = reactive({
    keyItemSet: [],
    valueHandlerMap: {},
    queryTag: [],
  });
  const tableSort = (sortBy: string, sortDesc: boolean) => {
    tableState.items = [
      ...tableState.items.sort((a: any, b: any) => {
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

  const handleFetch = (e: any) => {
    // sortBy, sortDesc, pageStart
    tableState.loading = true;
    if (e?.queryTags) {
      tableState.sortedItems = tableState.items.filter((row: any) => {
        return e.queryTags.every(
          (queryTag: {
            key: { name: string | number } | null;
            value: { name: string };
          }) => {
            if (queryTag.key === null) {
              return Object.values(row).some(value => {
                if (typeof value === 'string') {
                  return value
                    .toUpperCase()
                    .includes(queryTag.value.name.toUpperCase());
                } else return false;
              });
            }

            return row[queryTag.key.name]
              .toUpperCase()
              .includes(queryTag.value.name.toUpperCase());
          },
        );
      });
    } else {
      tableState.sortedItems = tableState.items;
    }

    if (e?.sortBy && e?.sortDesc) {
      tableSort(e.sortBy, e.sortDesc);
    }

    tableState.loading = false;
  };

  return { tableOptions, tableState, querySearchState, tableSort, handleFetch };
};
