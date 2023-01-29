import type { AppProps } from 'next/app';
import { ConfigProvider } from 'antd';

import dayjs from 'dayjs';
import zhCN from 'antd/locale/zh_CN';

import 'dayjs/locale/zh-cn';
import 'antd/dist/reset.css';
import '@/styles/globals.less';

dayjs.locale('zh-cn');

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ConfigProvider locale={zhCN}>
      <Component {...pageProps} />;
    </ConfigProvider>
  );
}
