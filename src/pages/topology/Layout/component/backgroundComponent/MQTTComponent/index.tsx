import type { FormInstance } from 'antd';
import { Button, Col, Form, Input, Row } from 'antd';
import React, { useRef } from 'react';
import { canvas } from '../../../index';

const formLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 15 },
};

const MQTTForm = (props: any) => {
  console.log(props);

  const formRef = useRef<FormInstance>(null);
  /**
   * 连接mqtt
   */
  const onHandleConnectMQTT = async () => {
    const values = await formRef.current?.validateFields();
    const { mqtt, clientId, username, password } = values;
    canvas.openMqtt(mqtt, {
      clientId,
      username,
      password,
    });
  };

  return (
    <Form {...formLayout}>
      <Row>
        <Col span={24}>
          <Form.Item name="mqtt" initialValue={''} label="URL地址">
            <Input placeholder="请输入URL地址" />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item name="clientId" initialValue={''} label="Client ID">
            <Input placeholder="请输入Client ID（不能重复使用，可为空)" />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item name="username" initialValue={''} label="用户名">
            <Input placeholder="请输入用户名" />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item name="password" initialValue={''} label="密码">
            <Input type="password" placeholder="请输入密码" />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item name="topics" initialValue={''} label="Topics *">
            <Input placeholder="请输入Topics" />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Button
            type="primary"
            style={{ marginLeft: 20, width: 235 }}
            onClick={() => onHandleConnectMQTT()}
          >
            测试连接
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default MQTTForm;
