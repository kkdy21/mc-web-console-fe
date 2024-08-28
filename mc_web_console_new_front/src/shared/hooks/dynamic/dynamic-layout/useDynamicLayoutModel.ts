import { computed, reactive } from 'vue';
import {
  DynamicField,
  DynamicLayout,
  QuerySearchTableOptions,
} from '@/shared/hooks/dynamic/dynamic-layout/types.ts';

export const useDynamicLayoutModel = () => {
  const fetchOptionState = reactive({
    pageStart: 1,
    pageLimit: 15,
    sortDesc: true,
    sortBy: 'created_at',
    queryTags: null,
  });

  const typeOptionState = reactive({
    loading: true,
    totalCount: 0,
    timezone: null,
    selectIndex: [] as number[],
  });

  const tableState: any = reactive({
    schema: null as
      | null
      | DynamicLayout
      | Omit<QuerySearchTableOptions, 'search'>, // options
    items: [], //data
    selectedItems: computed((): any =>
      typeOptionState.selectIndex.map(d => tableState.items[d]),
    ),
    visibleCustomFieldModal: false,
    dynamicTableFields: computed<DynamicField[]>((): any => {
      if (!tableState.schema) return [];
      return tableState.schema.options?.fields ?? [];
    }),
    defaultSearchQuery: [],
    tableHeight: 400,
    type: 'query-search-table',
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

  // const handleSelect: DynamicLayoutEventListener['select'] = selectIndex => {
  //   typeOptionState.selectIndex = selectIndex;
  // };
  //
  // const getTableSchema = async (): Promise<null | DynamicLayout> => {};
  //
  // const resetSort = (schemaOptions: DynamicLayoutOptions) => {
  //   const defaultSort = schemaOptions.default_sort;
  //   if (defaultSort) {
  //     fetchOptionState.sortBy = defaultSort.key;
  //     fetchOptionState.sortDesc = defaultSort.desc ?? false;
  //   } else {
  //     fetchOptionState.sortBy = 'created_at';
  //     fetchOptionState.sortDesc = true;
  //   }
  // };
  // const handleClickLinkButton = async (
  //   type: string,
  //   workspaceId: string,
  //   id: string,
  // ) => {};
  //
  // const fetchTableData = async (changed: DynamicLayoutFetchOptions = {}) => {
  //   // if (changed.sortBy !== undefined) {
  //   //   fetchOptionState.sortBy = changed.sortBy;
  //   //   fetchOptionState.sortDesc = !!changed.sortDesc;
  //   // }
  //   // if (changed.pageLimit !== undefined) {
  //   //   fetchOptionState.pageLimit = changed.pageLimit;
  //   //   assetInventorySettingsStore.setCloudServiceTablePageLimit(
  //   //     changed.pageLimit,
  //   //   );
  //   // }
  //   // if (changed.pageStart !== undefined) {
  //   //   fetchOptionState.pageStart = changed.pageStart;
  //   // }
  //   // if (changed.queryTags !== undefined) {
  //   //   queryTagsHelper.setQueryTags(changed.queryTags);
  //   // }
  //   //
  //   // const { items, totalCount } = await listCloudServiceTableData();
  //   // tableState.items = items;
  //   // typeOptionState.totalCount = totalCount;
  //   // typeOptionState.selectIndex = [];
  // };
  //
  // const reloadTable = async () => {
  //   tableState.schema = await getTableSchema();
  //   resetSort(tableState.schema.options);
  //   await fetchTableData();
  // };
  //
  // const handleClickSettings = () => {
  //   tableState.visibleCustomFieldModal = true;
  // };
  return { fetchOptionState, tableState, typeOptionState, tableSort };
};
