import React from 'react';
import { useRouter } from 'next/router';
import { Button } from 'antd';

import styles from './index.module.less';

interface IProps {
  children?: React.ReactNode;
}

const ErrorUI: React.FC<IProps> = () => {
  const router = useRouter();

  const handlePrevious = () => router.back();

  const handleReload = () => router.reload();

  return (
    <div className={styles['error_boundary']}>
      <div className={styles['eb_tip']}>页面出现未知错误，请稍后再试</div>
      <div className={styles['eb_btn_wrap']}>
        <Button onClick={handlePrevious} className={styles['eb_btn']}>
          返回上一页
        </Button>
        <Button
          type="primary"
          onClick={handleReload}
          className={styles['eb_btn']}
        >
          刷新重试
        </Button>
      </div>
    </div>
  );
};

export default ErrorUI;
