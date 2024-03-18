export class Paging {
  totalItems!: number;
  pageSize!: number;
  page!: number;
  totalPages!: number;
  currentStartIndex!: number;
  currentEndIndex!: number;
  data: any[] = [];
}
