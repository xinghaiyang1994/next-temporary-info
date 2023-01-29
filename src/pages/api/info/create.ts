// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

import { INextApiData } from '@/constants/api';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<INextApiData>
) {
  console.log('==>', res);
  res.status(200).json({ code: 1, message: '12', data: '' });
}
