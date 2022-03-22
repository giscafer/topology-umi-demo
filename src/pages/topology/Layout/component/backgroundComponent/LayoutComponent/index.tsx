import { layout } from '@topology/layout';
import type { FormInstance } from 'antd';
import { Button, Col, Form, InputNumber, Row } from 'antd';
import React, { useRef } from 'react';
import { canvas } from '../../../index';

const formLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 15 },
};

const Layout = () => {
  const formRef = useRef<FormInstance>(null);
  const startLayout = async () => {
    const values = await formRef.current?.validateFields();
    if (canvas) {
      layout(canvas.data.pens, values);
      canvas.updateProps(true, canvas.data.pens);
    }
  };

  return (
    <Form {...formLayout} style={{ margin: '10px 10px' }} ref={formRef}>
      <Row>
        <Col span={24}>
          <Form.Item name="maxWidth" initialValue={1000} label="最大宽度">
            <InputNumber
              style={{ width: '100%' }}
              min={0}
              placeholder="请输入最大宽度"
            />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item name="nodeWidth" initialValue={0} label="节点宽度">
            <InputNumber
              style={{ width: '100%' }}
              min={0}
              placeholder="请输入节点宽度"
            />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item name="nodeHeight" initialValue={0} label="节点高度">
            <InputNumber
              style={{ width: '100%' }}
              min={0}
              placeholder="请输入节点高度"
            />
          </Form.Item>
        </Col>

        <Col span={24}>
          <Form.Item name="maxCount" initialValue={0} label="水平个数">
            <InputNumber
              style={{ width: '100%' }}
              min={0}
              placeholder="请输入水平个数"
            />
          </Form.Item>
        </Col>

        <Col span={24}>
          <Form.Item name="spaceWidth" initialValue={30} label="水平间距">
            <InputNumber
              style={{ width: '100%' }}
              min={0}
              placeholder="请输入水平间距"
            />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item name="spaceHeight" initialValue={30} label="垂直间距">
            <InputNumber
              style={{ width: '100%' }}
              min={0}
              placeholder="请输入垂直间距"
            />
          </Form.Item>
        </Col>

        <Col span={24}>
          <Button
            type="primary"
            style={{ marginLeft: 22, width: 245 }}
            onClick={() => startLayout()}
          >
            开始排版
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default Layout;
