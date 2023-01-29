// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

import { INextApiData } from '@/constants/api';
import { selectInfoPage, selectInfoAllLength } from '@/dao/info';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<INextApiData>
) {
  const { current } = req.query;
  const [infoList, infoAllLength] = await Promise.all([
    selectInfoPage(Number(current)),
    selectInfoAllLength(),
  ]);

  res.status(200).json({
    code: 0,
    message: '',
    data: {
      total: infoAllLength,
      list: infoList,
    },
  });
}
