import { DatePickerProps } from 'antd';
/** 单条信息 */
export interface IInfo {
  id: number;
  /** 标题 */
  title: string;
  /** 内容 */
  content: string;
}

export interface ICreateForm extends Pick<IInfo, 'title' | 'content'> {
  /** 验证码 */
  verifyCode: string;
  /** 过期时间 */
  expiration?: DatePickerProps['value'];
}

export interface IPostAddInfoReq
  extends Pick<ICreateForm, 'title' | 'content' | 'verifyCode'> {
  /** 过期时间(时间戳) */
  expirationTime?: number;
}

export interface IGetInfoListReq {
  current: number;
}
