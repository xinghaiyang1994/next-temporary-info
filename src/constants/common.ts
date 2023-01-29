export interface IPage {
  current: number;
  total: number;
}

export interface IList<T = any> {
  total: number;
  list: T[];
}
