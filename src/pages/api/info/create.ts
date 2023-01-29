// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

import { INextApiData } from '@/constants/api';
import { insertInfo } from '@/dao/info';
import { IPostAddInfoReq } from '@/constants/info';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<INextApiData>
) {
  const data = req.body as unknown as IPostAddInfoReq;
  const newInfo = await insertInfo(data);
  res.status(200).json({ code: 0, message: '', data: newInfo });
}
