import { PageContainer } from '@ant-design/pro-layout';
import React from 'react';

function X6() {
  return (
    <PageContainer
      fixedHeader
      affixProps={{ children: null }}
      header={{ breadcrumb: {}, onBack: () => window.history.back() }}
    >
      demo代码：
      <a
        href="https://gitee.com/martsforever-pot/react-x6-editor"
        target="_blank"
        rel="noopener noreferrer"
      >
        react-x6-editor
      </a>
      <iframe
        src="http://martsforever-pot.gitee.io/react-x6-editor/"
        width={window.innerWidth - 300}
        style={{ border: 'none' }}
        height={window.innerHeight - 200}
      />
    </PageContainer>
  );
}

export default X6;
