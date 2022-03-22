/**
 * @author sunlight yi
 * @email yshnzs@163.com
 * @created 2022-02-21 16:19:13
 * @modified 2022-02-21 18:42:24
 * @description
 */

import { RhTable } from '@roothub/components';
import { PageContainer } from '@ant-design/pro-layout';
import React from 'react';

const columns: any[] = [
  {
    title: 'name',
    dataIndex: 'name',
    hideInSearch: true,
  },
  {
    title: 'status',
    dataIndex: 'status',
    hideInSearch: true,
  },
];

export default (props: any) => {
  const actionRef = React.useRef<any>();
  return (
    <PageContainer
      fixedHeader
      affixProps={{ children: null }}
      header={{
        title: props.route.name,
        breadcrumb: {},
        extra: [],
      }}
    >
      <RhTable<any>
        rowKey="id"
        columns={columns}
        actionRef={actionRef}
        pagination={{
          pageSize: 10,
        }}
        request={async () => {
          const list: any = await fetch('/pet/findByStatus').then((resp) =>
            resp.json()
          );
          return {
            data: list.data,
            success: true,
          };
        }}
      />
    </PageContainer>
  );
};
