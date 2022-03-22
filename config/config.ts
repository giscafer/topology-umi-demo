// https://umijs.org/config/
import { defineConfig } from 'umi';
import { join } from 'path';

import defaultSettings from './defaultSettings';
import proxy from './proxy';
import routes from './routes';
import theme from './theme';

const { REACT_APP_ENV } = process.env;

const basePath = '/topology-umi-demo/';

export default defineConfig({
  hash: true,
  theme,
  base: basePath,
  publicPath: basePath,
  antd: {},
  dva: {
    hmr: true,
  },
  // mfsu: {},
  layout: {
    // https://umijs.org/zh-CN/plugins/plugin-layout
    // locale: true,
    name: 'RootHub Scaffold',
    siderWidth: 208,
    ...defaultSettings,
  },
  plugins: ['@alitajs/plugin-theme'],
  dynamicTheme: {
    type: 'antd',
    themeVariables: ['@primary-color'],
  },
  // https://umijs.org/zh-CN/plugins/plugin-locale
  locale: {
    default: 'zh-CN', // default zh-CN
    antd: true,
    // default true, when it is true, will use `navigator.language` overwrite default
    baseNavigator: true,
  },
  dynamicImport: {
    loading: '@ant-design/pro-layout/es/PageLoading',
  },
  targets: {
    ie: 11,
  },
  // umi routes: https://umijs.org/docs/routing
  routes,

  // esbuild is father build tools
  // https://umijs.org/plugins/plugin-esbuild
  esbuild: {},
  title: false,
  ignoreMomentLocale: true,
  proxy: proxy[REACT_APP_ENV || 'dev'],
  manifest: {
    basePath: '/',
  },
  // Fast Refresh 热更新
  fastRefresh: {},
  // mfsu: {},
  webpack5: {},
  // https://pro.ant.design/zh-CN/docs/openapi
  openAPI: [
    {
      requestLibPath: "import { request } from 'umi'",
      // 或者使用在线的版本
      // schemaPath: "https://gw.alipayobjects.com/os/antfincdn/M%24jrzTTYJN/oneapi.json"
      schemaPath: join(__dirname, 'oneapi.json'),
      mock: false,
    },
    /*  {
      requestLibPath: "import { request } from 'umi'",
      schemaPath:
        'http://192.168.68.241:8076/protocol-model-server/v2/api-docs?group=protocolApi--%E5%8D%8F%E8%AE%AEAPI',
      projectName: 'protocol',
    }, */
    /* {
      requestLibPath: "import { request } from 'umi'",
      schemaPath: 'https://gw.alipayobjects.com/os/antfincdn/CA1dOm%2631B/openapi.json',
      projectName: 'swagger',
    }, */
  ],
});
