import { PageHeaderWrapper } from "@ant-design/pro-layout";
import { Alert, Card } from "antd";
import React from "react";
import { useIntl } from "umi";

export default (): React.ReactNode => {
  const intl = useIntl();
  return (
    <PageHeaderWrapper
      content={intl.formatMessage({
        id: "pages.admin.subPage.title",
        defaultMessage: " 这个页面只有 admin 权限才能查看",
      })}
    >
      <Card>
        <Alert
          message={intl.formatMessage({
            id: "pages.welcome.alertMessage",
            defaultMessage: "更快更强的重型组件，已经发布。",
          })}
          type="success"
          showIcon
          banner
          style={{
            margin: -12,
            marginBottom: 48,
          }}
        />
      </Card>
    </PageHeaderWrapper>
  );
};
