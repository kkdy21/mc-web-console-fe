import { computed, reactive } from 'vue';
import {
  DynamicField,
  DynamicLayout,
  DynamicLayoutEventListener,
} from '@/shared/hooks/dynamic/dynamic-layout/types.ts';

const useDynamicLayoutModel = () => {
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

  const tableState = reactive({
    schema: null as null | DynamicLayout, // options
    items: [], //data
    selectedItems: computed((): any =>
      typeOptionState.selectIndex.map(d => tableState.items[d]),
    ),

    tableHeight: 400,

    visibleCustomFieldModal: false,
    dynamicTableFields: computed<DynamicField[]>((): any => {
      if (!tableState.schema) return [];
      return tableState.schema.options?.fields ?? [];
    }),
    defaultSearchQuery: [],
  });

  const handleSelect: DynamicLayoutEventListener['select'] = selectIndex => {
    typeOptionState.selectIndex = selectIndex;
  };

  const getTableSchema = async (): Promise<null | DynamicLayout> => {
    try {
      const params: Record<string, any> = {
        schema: 'table',
      };
      if (props.isServerPage) {
        params.resource_type = 'inventory.Server';
        params.options = {
          include_workspace_info: appContextGetters.isAdminMode,
          // is_default: false,
        };
      } else {
        params.resource_type = 'inventory.CloudService';
        params.options = {
          provider: props.provider,
          cloud_service_group: props.group,
          cloud_service_type: props.name,
          include_workspace_info: appContextGetters.isAdminMode,
          // is_default: false,
        };
      }
      const response =
        await SpaceConnector.client.addOns.pageSchema.get(params);
      /*
       * NOTE: The storage for schema config is the same for both user and admin modes, making it difficult to distinguish data on the entry level.
       * Therefore, it is segmented as follows:
       * */
      const workspaceIndex = response.options.fields.findIndex(
        field => field.name === 'Workspace',
      );

      const nameIndex = response.options.fields.findIndex(
        field => field.name === 'Name',
      );
      if (props.isSecurityPage) {
        response.options.fields[nameIndex] = {
          ...response.options.fields[nameIndex],
          options: {
            width: '28rem',
          },
        };
      }
      return response;
    } catch (e) {
      ErrorHandler.handleError(e);
      return null;
    }
  };

  const resetSort = (schemaOptions: DynamicLayoutOptions) => {
    const defaultSort = schemaOptions.default_sort;
    if (defaultSort) {
      fetchOptionState.sortBy = defaultSort.key;
      fetchOptionState.sortDesc = defaultSort.desc ?? false;
    } else {
      fetchOptionState.sortBy = 'created_at';
      fetchOptionState.sortDesc = true;
    }
  };
  const handleClickLinkButton = async (
    type: string,
    workspaceId: string,
    id: string,
  ) => {
    if (type === 'workspace') {
      try {
        const response =
          await SpaceConnector.clientV2.inventory.cloudService.get<
            CloudServiceGetParameters,
            CloudServiceModel
          >({
            cloud_service_id: id,
          });
        window.open(
          router.resolve({
            name: props.isSecurityPage
              ? ASSET_INVENTORY_ROUTE.SECURITY.DETAIL._NAME
              : ASSET_INVENTORY_ROUTE.CLOUD_SERVICE.DETAIL._NAME,
            params: {
              provider: response.provider,
              group: response.cloud_service_group,
              name: response.cloud_service_type,
              workspaceId,
            },
          }).href,
          '_blank',
        );
      } catch (e: any) {
        ErrorHandler.handleRequestError(e, e.message);
      }
    } else {
      window.open(
        router.resolve({
          name: PROJECT_ROUTE.DETAIL._NAME,
          params: { id, workspaceId },
        }).href,
        '_blank',
      );
    }
  };

  const apiQuery = new ApiQueryHelper();
  const getQuery = (schema?) => {
    apiQuery
      .setSort(fetchOptionState.sortBy, fetchOptionState.sortDesc)
      .setPage(fetchOptionState.pageStart, fetchOptionState.pageLimit)
      .setFilters(hiddenFilters.value)
      .addFilter(...searchFilters.value);

    if (props.isSecurityPage) {
      apiQuery.addFilter(
        { k: 'provider', v: props.provider, o: '=' },
        { k: 'cloud_service_type', v: props.name, o: '=' },
      );
    }

    const fields =
      schema?.options?.fields || tableState.schema?.options?.fields;
    if (fields) {
      apiQuery.setOnly(
        ...fields.map(d => d.key).filter(d => !d.startsWith('tags.')),
        'reference.resource_id',
        'reference.external_link',
        'cloud_service_id',
        'tags',
        'provider',
      );
    }
    return apiQuery.data;
  };

  const listCloudServiceTableData = async (
    schema?,
  ): Promise<{ items: any[]; totalCount: number }> => {
    typeOptionState.loading = true;
    try {
      const query = cloneDeep(getQuery(schema));
      query.filter = query.filter
        ? query.filter.concat(tableState.defaultSearchQuery)
        : tableState.defaultSearchQuery;

      const res = await SpaceConnector.clientV2.inventory.cloudService.list<
        CloudServiceListParameters,
        ListResponse<CloudServiceModel>
      >({
        query,
      });

      // filtering select index
      typeOptionState.selectIndex = typeOptionState.selectIndex.filter(
        d => !!(res.results ?? [])[d],
      );

      return { items: res.results ?? [], totalCount: res.total_count ?? 0 };
    } catch (e) {
      ErrorHandler.handleError(e);
      return { items: [], totalCount: 0 };
    } finally {
      typeOptionState.loading = false;
    }
  };

  const fetchTableData = async (changed: DynamicLayoutFetchOptions = {}) => {
    if (changed.sortBy !== undefined) {
      fetchOptionState.sortBy = changed.sortBy;
      fetchOptionState.sortDesc = !!changed.sortDesc;
    }
    if (changed.pageLimit !== undefined) {
      fetchOptionState.pageLimit = changed.pageLimit;
      assetInventorySettingsStore.setCloudServiceTablePageLimit(
        changed.pageLimit,
      );
    }
    if (changed.pageStart !== undefined) {
      fetchOptionState.pageStart = changed.pageStart;
    }
    if (changed.queryTags !== undefined) {
      queryTagsHelper.setQueryTags(changed.queryTags);
    }

    const { items, totalCount } = await listCloudServiceTableData();
    tableState.items = items;
    typeOptionState.totalCount = totalCount;
    typeOptionState.selectIndex = [];
  };

  watch(urlQueryStringFilters, queryStringFilters => {
    const routeQueryString = route.query.filters ?? '';
    if (
      JSON.stringify(queryStringFilters) !== JSON.stringify(routeQueryString)
    ) {
      replaceUrlQuery('filters', queryStringFilters);
    }
  });

  // excel
  const excelState = reactive({
    visible: false,
  });
  const excelQuery = new ApiQueryHelper().setMultiSortV2([
    { key: 'created_at', desc: true },
  ]);
  const exportCloudServiceData = async () => {
    if (!props.isServerPage) excelState.visible = true;
    else {
      const excelExportFetcher = () => {
        hiddenFilters.value.forEach(filter => excelQuery.addFilter(filter));
        const cloudServiceExcelExportParams: ExportParameter = {
          options: [
            {
              name: 'Main Table',
              query_type: QueryType.SEARCH,
              search_query: {
                ...excelQuery.data,
                fields: dynamicFieldsToExcelDataFields(
                  tableState.dynamicTableFields,
                ),
              },
            },
          ],
        };
        return SpaceConnector.clientV2.inventory.cloudService.export(
          cloudServiceExcelExportParams,
        );
      };
      await downloadExcelByExportFetcher(excelExportFetcher);
    }
  };

  const fieldHandler: DynamicLayoutFieldHandler<
    Record<'reference', Reference>
  > = field => {
    if (field.extraData?.reference) {
      return referenceFieldFormatter(
        {
          ...field.extraData.reference,
          workspace_id: userWorkspaceStore.getters.currentWorkspaceId,
        },
        field.data,
      );
    }
    return {};
  };

  const reloadTable = async () => {
    tableState.schema = await getTableSchema();
    resetSort(tableState.schema.options);
    await fetchTableData();
  };

  const handleClickSettings = () => {
    tableState.visibleCustomFieldModal = true;
  };
};
