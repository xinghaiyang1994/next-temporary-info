import { IPostAddInfoReq, IGetInfoListReq, IInfo } from '@/constants/info';
import { IList } from '@/constants/common';

import api from './index';

/** 新增信息 */
export const postAddInfo = (data: IPostAddInfoReq) =>
  api.post<any>('/info/create', data);

/** 信息列表 */
export const getInfoList = (data: IGetInfoListReq) =>
  api.get<IList<IInfo>>('/info/list', {
    params: data,
  });

/** 获取验证码的链接 */
export const getVerifyCodeImg = () => `/api/info/verifyCode?t=${Date.now()}`;
