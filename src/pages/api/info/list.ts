// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

import { INextApiData } from '@/constants/api';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<INextApiData>
) {
  console.log('==>', res);
  setTimeout(() => {
    res.status(200).json({
      code: 0,
      message: '12',
      data: {
        total: 25,
        list: [
          {
            id: 1,
            title:
              '111asdas1533051950000153305195000015330519500001533051950000153305195000015330519500001533051950000',
            content: '11111',
            createTime: '1533051950000',
            expirationTime: '1533051950000',
          },
          {
            id: 2,
            title: '111',
            content: '11111asdsds',
            createTime: '1533051950000',
            expirationTime: '1533051950000',
          },
        ],
      },
    });
  }, 2000);
}
