// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

import { INextApiData } from '@/constants/api';
import { insertInfo } from '@/dao/info';
import { IPostAddInfoReq, VERIFY_CODE_COOKIE_NAME } from '@/constants/info';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<INextApiData>
) {
  const data = req.body as unknown as IPostAddInfoReq;
  const verifyCode = req.cookies[VERIFY_CODE_COOKIE_NAME];
  if (verifyCode !== data.verifyCode) {
    res.status(200).json({ code: -1, message: '验证码错误', data: {} });
    return;
  }
  const newInfo = await insertInfo(data);
  res.status(200).json({ code: 0, message: '', data: newInfo });
}
