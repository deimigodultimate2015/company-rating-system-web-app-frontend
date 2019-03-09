export class SearchData {
  search: string;
  sort: string;
  page: number;
  size: number;

  SearchData(search: string, sort: string, page: number, size: number) {
    this.search = search;
    this.sort = sort;
    this.page = page;
    this.size = size;
  }
}
