export type ITableItems<T> = {
  [key in keyof T]: any;
};

export type ITableField<T> = {
  [K in keyof T]: { name: K; label: string };
}[keyof T];

export type QueryTag = {
  key: { name: string | number } | null;
  value: { name: string };
};

export type ChangeEvent = {
  pageStart?: number;
  pageLimit?: number;
  queryTags?: QueryTag[];
  sortBy?: string;
  sortDesc?: boolean;
};
