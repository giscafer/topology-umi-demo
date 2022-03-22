import Icon from '@ant-design/icons';
import type { FormInstance } from 'antd';
import { Button, Col, Form, Input, Select, Tooltip } from 'antd';
import { noop } from 'lodash';
import React, { useRef } from 'react';
import { canvas } from '../../../index';

let id = 0;

const Page = ({ data, onUpdateHttpProps = noop }: any) => {
  const formRef = useRef<FormInstance>(null);
  id = data.paramsArr ? data.paramsArr.length : 0;
  const renderForm = () => {
    // getFieldDecorator('keys', { initialValue: data.paramsArr || [] });
    formRef.current?.setFieldsValue({
      keys: data.paramsArr || [],
    });
    const keys = formRef.current?.getFieldsValue() || [];
    return keys.map((item: { key: any; value: any }, idx: number) => (
      <div key={idx}>
        <Col span={24}>
          <Form.Item
            name={`paramsKey[${idx}]`}
            initialValue={item.key}
            label={`${idx + 1}参数名key`}
          >
            <Input style={{ width: 180 }} placeholder="请填写key" />
          </Form.Item>
        </Col>

        <Col span={24}>
          <Form.Item
            name={`paramsValue[${idx}]`}
            initialValue={item.value}
            label={`${idx + 1}参数value`}
          >
            <Select style={{ width: 180 }} placeholder="请选择绑定的源数据">
              {canvas.data.pens.map((c: any) => (
                <Select.Option key={c.id} value={`componentValue-${c.id}`}>
                  {c.id}-{c.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
      </div>
    ));
  };

  const onHandleAdd = () => {
    const keys = formRef.current?.getFieldValue('keys');
    const nextKeys = keys.concat(id++);
    formRef.current?.setFieldsValue({
      keys: nextKeys,
    });
  };

  return (
    <Form
      layout="inline"
      ref={formRef}
      onValuesChange={(changedValues, allValues) => {
        onUpdateHttpProps(allValues);
      }}
    >
      <Col span={24}>
        <Form.Item name={'api'} initialValue={data.api} label="后端地址">
          <Input style={{ width: 200 }} placeholder="请填写后端地址" />
        </Form.Item>
      </Col>

      <Col span={24}>
        <Form.Item name="type" initialValue={data.type} label="请求类型">
          <Select style={{ width: 200 }}>
            <Select.Option value="get" key="get">
              get
            </Select.Option>
            <Select.Option value="post" key="post">
              post
            </Select.Option>
          </Select>
        </Form.Item>
      </Col>

      <Col span={24}>
        <Form.Item
          name="handleResult"
          initialValue={data.handleResult}
          label={
            <>
              结果
              <Tooltip title="如果后端api返回的数据是 { list: [], count: 100 },想要把list的数据传入控件, 那么此处填写list即可">
                <Icon
                  style={{ margin: '12px 0 0 13px' }}
                  type="question-circle"
                />
              </Tooltip>
            </>
          }
        >
          <Input style={{ width: 200 }} placeholder="请填写处理的值" />
        </Form.Item>
      </Col>

      {renderForm()}
      <Col span={24}>
        <Form.Item>
          <Button type="primary" icon="plus" onClick={() => onHandleAdd()}>
            新增
          </Button>
        </Form.Item>
      </Col>
    </Form>
  );
};

export default Page;
