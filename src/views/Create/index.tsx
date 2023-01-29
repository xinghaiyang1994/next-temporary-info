/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { Button, DatePicker, Form, Input, message } from 'antd';
import { useRequest } from 'ahooks';
import { useRouter } from 'next/router';

import { ICreateForm, IPostAddInfoReq } from '@/constants/info';
import { postAddInfo } from '@/requests/info';
import { ERoute } from '@/constants/routes';

import styles from './index.module.less';

const { TextArea } = Input;

const Create: React.FC = () => {
  const router = useRouter();
  const [form] = Form.useForm<ICreateForm>();

  const { loading, run } = useRequest(postAddInfo, {
    manual: true,
    onSuccess: () => {
      message.success('新建成功');
      router.push(ERoute.Index);
    },
  });

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();

      const reqData: IPostAddInfoReq = {
        title: values.title,
        content: values.content,
        verifyCode: values.verifyCode,
      };

      if (values.expiration) {
        reqData.expirationTime = values.expiration.valueOf();
      }
      run(reqData);
    } catch (error) {
      console.log('==>校验失败', error);
    }
  };

  const renderForm = () => (
    <Form form={form} layout="vertical">
      <Form.Item
        label="标题"
        name="title"
        rules={[
          { required: true, message: '请输入标题' },
          {
            type: 'string',
            max: 100,
            message: '最大长度为 100',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="内容"
        name="content"
        rules={[
          { required: true, message: '请输入内容' },
          {
            type: 'string',
            max: 4000,
            message: '最大长度为 4000',
          },
        ]}
      >
        <TextArea rows={8} />
      </Form.Item>
      <Form.Item
        label="验证码"
        name="verifyCode"
        rules={[
          { required: true, message: '请输入验证码' },
          {
            type: 'string',
            max: 4,
            message: '最大长度为 4',
          },
        ]}
      >
        <div className={styles['create_verify']}>
          <Input className={styles['create_verify_input']} />
          <img
            className={styles['create_verify_img']}
            src="https://aicmarketplace.oss-cn-beijing.aliyuncs.com/public/test_fe/music_bg.jpeg"
            alt=""
          />
        </div>
      </Form.Item>
      <Form.Item label="过期时间" name="expiration">
        <DatePicker showTime />
      </Form.Item>
      <div>
        <Button loading={loading} onClick={handleSubmit} type="primary">
          提交
        </Button>
      </div>
    </Form>
  );

  return (
    <div className={styles['create']}>
      <div className={styles['create_header']}>
        <h2>生成信息</h2>
        <Button type="primary" onClick={() => router.push(ERoute.Index)}>
          返回信息列表页
        </Button>
      </div>
      <div>{renderForm()}</div>
    </div>
  );
};

export default Create;
