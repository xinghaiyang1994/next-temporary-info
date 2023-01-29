import { IPostAddInfoReq } from '@/constants/info';

import api from './index';

/** 新增信息 */
export const postAddInfo = (data: IPostAddInfoReq) =>
  api.post<any>('/info/create', data);
