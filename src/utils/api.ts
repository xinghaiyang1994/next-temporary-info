import { ECode, ApiRes } from '@/constants/api';
import type { AxiosInstance, AxiosRequestConfig } from 'axios';

/** 正确业务状态码判断 */
export const isSuccessResponse = <T>(response: ApiRes<T>) => {
  return response?.data?.code === ECode.Success;
};

/**
 * request工厂函数,传递 axios 的实例和请求处理函数
 */
export function requestFactory<IRequestConfig extends AxiosRequestConfig>(
  axios: AxiosInstance,
  handleRequest: <T>(
    fn: Promise<ApiRes<T>>,
    config?: IRequestConfig
  ) => Promise<T>
) {
  return {
    get: <T>(url: string, config?: IRequestConfig): Promise<T> =>
      handleRequest<T>(axios.get(url, config), config),
    post: <T>(url: string, data?: any, config?: IRequestConfig): Promise<T> =>
      handleRequest<T>(axios.post(url, data, config), config),
    delete: <T>(url: string, config?: IRequestConfig): Promise<T> =>
      handleRequest<T>(axios.delete(url, config), config),
  };
}
