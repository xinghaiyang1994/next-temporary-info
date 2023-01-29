import type { AxiosRequestConfig } from 'axios';
import axios from 'axios';

import { message } from 'antd';
import { ECode, ApiRes } from '@/constants/api';
import { isSuccessResponse, requestFactory } from '@/utils/api';

interface IRequestConfig extends AxiosRequestConfig {
  /** 控制是否隐藏错误的 message.error */
  isSilence?: boolean;
  isSkipLoginCheck?: boolean;
}

/** 自定义错误类型 */
interface ApiError extends Error {
  code?: ECode;
  url?: string;
  traceId?: string;
}

// 实例化
const api = axios.create({
  /** 请求路径前缀 */
  baseURL: '/api',
  withCredentials: true,
});

/** 生成统一 error 对象 */
const throwError = <T>(response: ApiRes<T>) => {
  const { data, config } = response;
  const { url = '', baseURL = '' } = config;
  const error: ApiError = new Error(data.message);
  error.code = data.code;
  error.url = `${baseURL}${url}`;
  throw error;
};

type THandleRequest = <T>(
  fn: Promise<ApiRes<T>>,
  config?: IRequestConfig
) => Promise<T>;

/**
 * 请求处理函数
 * @param fn 对应service的方法，返回的是一个promise
 * @returns 返回处理后的数据，接口成功的情况下，只返回{code, data, message}中的data，
 * 接口返回非成功状态码的情况下，返回一个error对象，error.data是对应的{code, data, message}中的data，
 */
const baseHandleRequest: THandleRequest = async <T>(
  fn: Promise<ApiRes<T>>,
  config?: IRequestConfig
): Promise<T> => {
  const { isSilence = false } = config ?? {};
  try {
    const response = await Promise.resolve(fn);

    const { data } = response;
    if (isSuccessResponse(response)) {
      return data.data;
    }

    return throwError(response);
  } catch (e) {
    const err = e as ApiError;
    // 报错统一提示
    if (!isSilence) {
      message.error({
        content: err.message || '网络错误,请稍后重试',
      });
    }
    console.log('==>clientApi', err.code, err.message);

    throw err;
  }
};

const request = requestFactory(api, baseHandleRequest);

export default request;
