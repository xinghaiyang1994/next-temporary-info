import type { AxiosResponse } from 'axios';

/** code 错误码 */
export enum ECode {
  /** 成功 */
  Success = 0,
}
/**
 * 后端返回格式
 */
export interface ApiResponse<T = any> {
  /** 错误码 */
  code: ECode;
  /** 成功后的信息 */
  data: T;
  /** 错误信息 */
  message: string;
}

export type ApiRes<T> = AxiosResponse<ApiResponse<T>>;

/** next api 路径返回的数据 */
export interface INextApiData<T = any> {
  code: number;
  data: T;
  message: string;
}
