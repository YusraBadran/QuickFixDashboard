export class Filters {
  page!: number;
  pageSize!: number;
  includes!: string[];
  filters: ItemFilters[] = [];
  sorts!: string[];
}
export class ItemFilters {
  fieldName!: string;
  comparision!: string;
  fieldValue!: any;
}
