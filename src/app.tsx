import RightContent from '@/components/RightContent';
import RhApi from '@/rh/apis';
// import Footer from '@/components/Footer';
// import { currentUser as queryCurrentUser } from './services/ant-design-pro/api';
import { BookOutlined, LinkOutlined } from '@ant-design/icons';
import type { Settings as LayoutSettings } from '@ant-design/pro-layout';
import { PageLoading } from '@ant-design/pro-layout';
import { notification } from 'antd';
import type { RequestConfig, RunTimeLayoutConfig } from 'umi';
import { history, Link } from 'umi';
import menuData from '../config/menus';
import SideBar from './layouts/SideBar';
import type { UserResp } from './rh/apis/Base/data-contracts';

/* ConfigProvider.config({
  maskClosable: false,
}); */

const isDev = process.env.NODE_ENV === 'development';
const loginPath = '/user/login';

/** 获取用户信息比较慢的时候会展示一个 loading */
export const initialStateConfig = {
  loading: <PageLoading />,
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function gotoLogin() {
  history.push(loginPath); // TODO: 对接登陆后放开这里。测试账号：13666666666/Admin123
}

/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
export async function getInitialState(): Promise<{
  settings?: Partial<LayoutSettings>;
  currentUser?: UserResp;
  fetchUserInfo?: () => Promise<UserResp | undefined>;
}> {
  const fetchUserInfo = async () => {
    try {
      const currentUser = (await RhApi.Base.userGetUserInfo()) as UserResp;

      return currentUser;
    } catch (error) {
      console.log(error);
      // 绕过登陆
      // gotoLogin();
    }
    return Promise.resolve({
      nickName: '超级管理员',
      username: 'admin',
      mobile: '13666666666',
    });
    // return undefined;
  };
  // 如果是登录页面，不执行
  if (history.location.pathname !== loginPath) {
    const currentUser = await fetchUserInfo();

    return {
      fetchUserInfo,
      currentUser,
      settings: {},
    };
  }
  return {
    fetchUserInfo,
    settings: {},
  };
}

/**
 * 异常处理程序
    200: '服务器成功返回请求的数据。',
    201: '新建或修改数据成功。',
    202: '一个请求已经进入后台排队（异步任务）。',
    204: '删除数据成功。',
    400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
    401: '用户没有权限（令牌、用户名、密码错误）。',
    403: '用户得到授权，但是访问是被禁止的。',
    404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
    405: '请求方法不被允许。',
    406: '请求的格式不可得。',
    410: '请求的资源被永久删除，且不会再得到的。',
    422: '当创建一个对象时，发生一个验证错误。',
    500: '服务器发生错误，请检查服务器。',
    502: '网关错误。',
    503: '服务不可用，服务器暂时过载或维护。',
    504: '网关超时。',
 //-----English
    200: The server successfully returned the requested data. ',
    201: New or modified data is successful. ',
    202: A request has entered the background queue (asynchronous task). ',
    204: Data deleted successfully. ',
    400: 'There was an error in the request sent, and the server did not create or modify data. ',
    401: The user does not have permission (token, username, password error). ',
    403: The user is authorized, but access is forbidden. ',
    404: The request sent was for a record that did not exist. ',
    405: The request method is not allowed. ',
    406: The requested format is not available. ',
    410':
        'The requested resource is permanently deleted and will no longer be available. ',
    422: When creating an object, a validation error occurred. ',
    500: An error occurred on the server, please check the server. ',
    502: Gateway error. ',
    503: The service is unavailable. ',
    504: The gateway timed out. ',
 * @see https://beta-pro.ant.design/docs/request-cn
 */
export const request: RequestConfig = {
  errorHandler: (error: any) => {
    const { response } = error;

    if (!response) {
      notification.error({
        description: '您的网络发生异常，无法连接服务器',
        message: '网络异常',
      });
    }
    throw error;
  },
};

// ProLayout 支持的api https://procomponents.ant.design/components/layout
export const layout: RunTimeLayoutConfig = ({ initialState }: any) => {
  return {
    rightContentRender: () => <RightContent />,
    disableContentMargin: false,
    /*  waterMarkProps: {
      content: initialState?.currentUser?.name,
    }, */
    menuRender: (menuProps: any) => {
      const { location } = menuProps;
      const { pathname } = location;
      return (
        <SideBar collapsible={false} menuData={menuData} pathName={pathname} />
      );
    },
    links: isDev
      ? [
          <Link key="comp" to="/~docs" target="_blank">
            <BookOutlined />
            <span>业务组件文档</span>
          </Link>,
          <a
            key="github"
            href="https://github.com/RootLinkFE/rh-template-react-umi"
            target="_blank"
            rel="noreferrer"
          >
            <LinkOutlined />
            <span>Github</span>
          </a>,
        ]
      : [],
    menuHeaderRender: undefined,
    // 自定义 403 页面
    // unAccessible: <div>unAccessible</div>,
    ...initialState?.settings,
  };
};
