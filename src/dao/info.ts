import path from 'path';
import fs from 'fs';
import {
  IInfo,
  PAGE_SIZE,
  IPostAddInfoReq,
  EXPIRATION_TIME_PERMANENT,
} from '@/constants/info';

/** 获取信息的列表(翻页) */
export const selectInfoPage = async (current: number) => {
  const infoAll = await fs.readFileSync(path.join(process.cwd(), './info.txt'));
  const infoAllString = infoAll.toString();
  const list = JSON.parse(infoAllString) as IInfo[];
  const now = Date.now();
  const beginIndex = (current - 1) * PAGE_SIZE;
  const endIndex = current * PAGE_SIZE;
  return list
    .filter((el) => el.expirationTime > now)
    .slice(beginIndex, endIndex);
};

/** 获取所有信息的数量 */
export const selectInfoAllLength = async () => {
  const infoAll = fs.readFileSync(path.join(process.cwd(), './info.txt'));
  const infoAllString = infoAll.toString();
  const list = JSON.parse(infoAllString) as IInfo[];
  const now = Date.now();
  return list.filter((el) => el.expirationTime > now).length;
};

/** 新增一条信息 */
export const insertInfo = async (data: IPostAddInfoReq) => {
  const infoAll = fs.readFileSync(path.join(process.cwd(), './info.txt'));
  const infoAllString = infoAll.toString();
  const list = JSON.parse(infoAllString) as IInfo[];

  const newInfo: IInfo = {
    id: list[0] ? list[0].id + 1 : 1,
    title: data.title,
    content: data.content,
    createTime: Date.now(),
    expirationTime: data.expirationTime
      ? data.expirationTime
      : EXPIRATION_TIME_PERMANENT,
  };

  list.unshift(newInfo);

  const listString = JSON.stringify(list);

  fs.writeFileSync(
    path.join(process.cwd(), './info.txt'),
    Buffer.from(listString)
  );
  return newInfo;
};
