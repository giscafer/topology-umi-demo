import { Button, Col, Form, Input, Select } from 'antd';
import React from 'react';
let id = 0;

const Table = ({ data, formRef }: any) => {
  formRef.current?.setFieldsValue({
    keys: [],
  });
  const renderForm = () => {
    formRef.current?.setFieldsValue({
      keys: data.columns,
    });
    const keys = formRef.current?.getFieldValue('keys');
    return keys.map(
      (item: { title: any; key: any }, idx: React.Key | null | undefined) => (
        <div key={idx}>
          <Col span={12}>
            <Form.Item name={`title[${idx}]`} initialValue={item.title}>
              <Input placeholder="请填写title" />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item name={`key[${idx}]`} initialValue={item.key}>
              <Input placeholder="请填写key" />
            </Form.Item>
          </Col>
        </div>
      )
    );
  };

  const onHandleAdd = () => {
    const keys = formRef.current?.getFieldValue('keys');
    const nextKeys = keys.concat(id++);
    formRef.current?.setFieldsValue({
      keys: nextKeys,
    });
  };

  return (
    <>
      <Col span={24}>
        <Form.Item
          name="size"
          initialValue={data.size || 'default'}
          label="表格大小"
        >
          <Select style={{ width: 200 }}>
            <Select.Option value="middle" key="middle">
              middle
            </Select.Option>
            <Select.Option value="default" key="default">
              default
            </Select.Option>
            <Select.Option value="small" key="small">
              small
            </Select.Option>
          </Select>
        </Form.Item>
      </Col>
      <Col span={24}>
        <Form.Item label="表头数据:" />
      </Col>
      {renderForm()}
      <Col span={24}>
        <Form.Item>
          <Button
            type="primary"
            size="small"
            icon="plus"
            style={{ marginLeft: 20, width: 250 }}
            onClick={() => onHandleAdd()}
          >
            新增
          </Button>
        </Form.Item>
      </Col>
    </>
  );
};

export default Table;
