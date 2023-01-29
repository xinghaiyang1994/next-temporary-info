import { DatePickerProps } from 'antd';
/** 单条信息 */
export interface IInfo {
  id: number;
  /** 标题 */
  title: string;
  /** 内容 */
  content: string;
  /** 创建时间 */
  createTime: number;
  /** 过期时间 */
  expirationTime: number;
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

export const PAGE_SIZE = 10;

/** 永久不过期的过期时间 */
export const EXPIRATION_TIME_PERMANENT = 9999999999999;

/** 验证码的 cookie 名, 后面需要改成 session */
export const VERIFY_CODE_COOKIE_NAME = 'VERIFY_CODE_COOKIE_NAME';
