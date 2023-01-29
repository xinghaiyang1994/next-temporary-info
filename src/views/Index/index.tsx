import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useRequest, useSetState } from 'ahooks';
import { Pagination, Spin, Button, message } from 'antd';
import xss from 'xss';
import ClipboardJS from 'clipboard';

import { ERoute } from '@/constants/routes';
import { IPage } from '@/constants/common';
import { IInfo, IGetInfoListReq } from '@/constants/info';
import { getInfoList } from '@/requests/info';

import styles from './index.module.less';

interface IPageInfo extends IPage {
  list: IInfo[];
}

const DEFAULT_PAGE_INFO: IPageInfo = {
  current: 1,
  total: 0,
  list: [],
};

const copyClassName = styles['index_list_item_header_copy'];

const Index: React.FC = () => {
  const router = useRouter();

  const [pageInfo, setPageInfo] = useSetState(DEFAULT_PAGE_INFO);

  useEffect(() => {
    const clipboard = new ClipboardJS(`.${copyClassName}`, {
      target: function (trigger) {
        return trigger;
      },
      text: function (trigger) {
        return trigger.getAttribute('data-content') || '';
      },
    });
    clipboard.on('success', function (e) {
      message.success('复制成功');
      e.clearSelection();
    });
  }, []);

  const { loading, run } = useRequest(getInfoList, {
    defaultParams: [
      {
        current: pageInfo.current,
      },
    ],
    onSuccess: (data) => {
      setPageInfo({
        total: data?.total || 0,
        list: data?.list || [],
      });
    },
  });

  const fetchList = (data: Partial<IGetInfoListReq>) =>
    run({
      current: pageInfo.current,
      ...data,
    });

  const handlePageChange = (page: number) => {
    setPageInfo({
      current: page,
    });

    fetchList({
      current: page,
    });
  };

  const renderList = () => (
    <div>
      <Spin spinning={loading}>
        <div>
          {pageInfo.list?.map((el) => {
            return (
              <div
                data-id={el.id}
                className={styles['index_list_item']}
                key={el.id}
              >
                <div className={styles['index_list_item_header']}>
                  <div className={styles['index_list_item_header_title']}>
                    {el.title}
                  </div>
                  <Button
                    data-content={el.content}
                    className={copyClassName}
                    size="small"
                    type="primary"
                  >
                    复制
                  </Button>
                </div>
                <div
                  className={styles['index_list_item_content']}
                  dangerouslySetInnerHTML={{
                    __html: xss(el.content || ''),
                  }}
                />
              </div>
            );
          })}
        </div>
      </Spin>
    </div>
  );

  const renderPage = () => (
    <div className={styles['index_page']}>
      <Pagination
        showQuickJumper
        current={pageInfo.current}
        total={pageInfo.total}
        showSizeChanger={false}
        onChange={handlePageChange}
      />
    </div>
  );

  return (
    <div className={styles['index']}>
      <div className={styles['index_header']}>
        <h2>信息列表</h2>
        <Button type="primary" onClick={() => router.push(ERoute.Create)}>
          新建信息
        </Button>
      </div>
      {renderPage()}
      {renderList()}
    </div>
  );
};

export default Index;
