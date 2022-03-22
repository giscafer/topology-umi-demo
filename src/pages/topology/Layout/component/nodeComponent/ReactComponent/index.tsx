import React, { useRef } from 'react';
import type { FormInstance } from 'antd';
import { Form } from 'antd';
import ButtonForm from './Button';
import TableForm from './Table';
import { noop } from 'lodash';

const Page = ({ data, onUpdateComponentProps = noop }: any) => {
  const formRef = useRef<FormInstance>(null);

  const renderForm = (form: any) => {
    switch (data.node.name) {
      case 'button':
        return <ButtonForm data={data.node.data} />;
      case 'table':
        return <TableForm data={data.node.data.props} form={form} />;
      default:
        return null;
        break;
    }
  };

  return (
    <Form
      ref={formRef}
      layout="inline"
      onValuesChange={(changedValues, allValues) => {
        if (data.node.name === 'table') {
          allValues.columns = allValues.key.map(
            (item: any, index: string | number) => ({
              title: allValues.title[index] || 'NA',
              key: item || 'NA',
              dataIndex: item || 'NA',
            })
          );
          const { key, keys, title, dataSource, ...other } = allValues;
          onUpdateComponentProps(other);
          return;
        }
        onUpdateComponentProps(allValues);
        console.log(allValues);
      }}
    >
      {renderForm(formRef)}
    </Form>
  );
};

export default Page;
