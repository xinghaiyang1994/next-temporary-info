// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import svgCaptcha from 'svg-captcha';

import { VERIFY_CODE_COOKIE_NAME } from '@/constants/info';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const captcha = svgCaptcha.create({
    ignoreChars: '0o1il',
  });
  const captchaText = captcha.text.toLowerCase();
  res.setHeader('Set-Cookie', [`${VERIFY_CODE_COOKIE_NAME}=${captchaText}`]);
  res.setHeader('Content-Type', 'image/svg+xml');
  res.status(200).send(String(captcha.data));
}
