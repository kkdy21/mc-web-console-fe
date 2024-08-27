/** Metadata schema types for Dynamic field */
// eslint-disable-next-line import/no-cycle

export const dataTypes = [
  'string',
  'integer',
  'float',
  'boolean',
  'datetime',
  'object',
] as const;
export type KeyDataType = (typeof dataTypes)[number];
export const dynamicFieldTypes = [
  'text',
  'badge',
  'datetime',
  'state',
  'enum',
  'size',
  'dict',
  'list',
  'more',
];

export type DynamicFieldType = (typeof dynamicFieldTypes)[number];
export const DEFINITION_TABLE_STYLE_TYPE = Object.freeze({
  primary: 'primary',
  white: 'white',
} as const);

export type DEFINITION_TABLE_STYLE_TYPE =
  (typeof DEFINITION_TABLE_STYLE_TYPE)[keyof typeof DEFINITION_TABLE_STYLE_TYPE];

export interface CommonOptions {
  link?: string;
  sortable?: boolean;
  sort_key?: string;
  key_depth?: number;
  width?: string;
  translation_id?: string;
  default?: any;
  delimiter?: string;
  is_optional?: boolean;
  field_description?: string;
  postfix?: string;
  prefix?: string;
  disable_copy?: boolean;
}

export interface BadgeOptions extends CommonOptions {
  outline_color?: string;
  shape?: string;
  background_color?: string;
  text_color?: string;
}

export enum DATETIME_SOURCE_TYPE {
  iso8601 = 'iso8601',
  timestamp = 'timestamp',
}

export interface DatetimeOptions extends CommonOptions {
  source_type: keyof typeof DATETIME_SOURCE_TYPE;
  source_format?: string;
  display_format?: string;
}

export interface ListOptions extends CommonOptions {
  item?: DynamicField;
  sub_key?: string;
  delimiter?: string;
}

export interface StateOptions extends CommonOptions {
  icon?: {
    image?: string;
    color?: string;
  };
  text_color?: string;
}

export interface MoreOptions extends CommonOptions {
  sub_key?: string;
  layout: DynamicLayout;
}

export interface EnumItem {
  name?: string;
  type: DynamicFieldType;
  options?: DynamicFieldOptions;
  default?: any;
}
type EnumValue = EnumItem | string;
export type EnumOptions =
  | {
      [data: string]: EnumValue;
      default?: any;
    }
  | ({
      items?: Record<string, EnumValue>;
      default?: any;
    } & CommonOptions);

export interface SizeOptions extends CommonOptions {
  display_unit?: 'BYTES | KB | MB | GB | TB | PB';
  source_unit?: 'BYTES | KB | MB | GB | TB | PB';
}

export type DictOptions = CommonOptions;

export type TextOptions = CommonOptions;

export type DynamicFieldOptions =
  | BadgeOptions
  | DatetimeOptions
  | DictOptions
  | EnumOptions
  | ListOptions
  | StateOptions
  | TextOptions
  | SizeOptions
  | MoreOptions;

export interface DynamicField {
  key: string;
  name?: string;
  type: DynamicFieldType;
  options?: DynamicFieldOptions;
  reference?: {
    resource_type: string;
    reference_key?: string;
  };
}

export interface SearchEnumItem {
  label: string;
  icon?: {
    image?: string;
    color?: string;
  };
}
export type SearchDataType = KeyDataType;
export type SearchEnums = Record<string, SearchEnumItem | string> | string[];

export type Sort = {
  key: string;
  desc?: boolean;
};

export interface SearchKeyOptions {
  key: string; // Key to retrieve actual data
  name: string; // Name to display in search bar
  enums?: SearchEnums;
  data_type?: SearchDataType;
  icon?: string;
  reference?: string;
}

export interface SearchKeyGroup {
  title: string;
  items: SearchKeyOptions[];
  options?: object;
}

export type SearchSchema = SearchKeyGroup[];

/** Metadata schema types for Dynamic layout */
export const dynamicLayoutTypes = [
  'item',
  'simple-table',
  'table',
  'query-search-table',
  'raw',
  'markdown',
  'list',
  'raw-table',
  'html',
  'popup',
];
export type DynamicLayoutType = (typeof dynamicLayoutTypes)[number];

export interface CommonOptions {
  root_path?: string;
  translation_id?: string;
  unwind?: {
    path?: string;
  };
}

export interface ItemOptions extends CommonOptions {
  fields: DynamicField[];
  styleType?: DEFINITION_TABLE_STYLE_TYPE;
}

export interface SimpleTableOptions extends CommonOptions {
  fields: DynamicField[];
}

export interface RawTableOptions extends CommonOptions {
  disable_search?: boolean;
  headers?: string[];
}

export interface TableOptions extends CommonOptions {
  fields: DynamicField[];
  disable_search?: boolean;
  default_sort?: Sort;
}

export interface QuerySearchTableOptions extends CommonOptions {
  fields: DynamicField[];
  search: SearchSchema;
  disable_search?: boolean;
  default_sort?: Sort;
}

export type RawOptions = CommonOptions;

export type HtmlOptions = CommonOptions;

export interface MarkdownOptions extends CommonOptions {
  markdown:
    | string
    | {
        en: string;
        ko: string;
      };
}

export interface PopupOptions extends CommonOptions {
  layout: DynamicLayout;
}

export interface ListOptions extends CommonOptions {
  layouts: DynamicLayout[];
}

export interface DynamicLayoutOptions
  extends ItemOptions,
    SimpleTableOptions,
    TableOptions,
    QuerySearchTableOptions,
    RawOptions,
    MarkdownOptions,
    RawTableOptions,
    HtmlOptions,
    PopupOptions,
    ListOptions {}

export interface DynamicLayout {
  name: string;
  type: DynamicLayoutType;
  options?: DynamicLayoutOptions;
}
export interface DynamicLayoutFetchOptions {
  sortBy?: string;
  sortDesc?: boolean;
  pageStart?: number;
  pageLimit?: number;
  queryTags?: any;
  searchText?: string;
}
export interface DynamicLayoutEventListener {
  fetch: (
    options: DynamicLayoutFetchOptions,
    layoutName?: string,
    layoutIndex?: number,
  ) => void | Promise<void>;
  select: (
    selectIndex: number[],
    layoutName?: string,
    layoutIndex?: number,
  ) => void | Promise<void>;
  export: (layoutName?: string, layoutIndex?: number) => void | Promise<void>;
  'click-settings': (
    layoutName?: string,
    layoutIndex?: number,
  ) => void | Promise<void>;
  'click-row': (selectIndex: number[]) => void | Promise<void>;
}
