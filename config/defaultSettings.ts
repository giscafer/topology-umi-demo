import { Settings as LayoutSettings } from '@ant-design/pro-layout';
import { logoBase64Str } from './logo';

const Settings: LayoutSettings & {
  pwa?: boolean;
  logo?: string;
} = {
  navTheme: 'light',
  layout: 'mix',
  contentWidth: 'Fluid',
  fixedHeader: false,
  fixSiderbar: true,
  colorWeak: false,
  title: 'RootHub Scaffold',
  pwa: false,
  logo: logoBase64Str,
  iconfontUrl: '//at.alicdn.com/t/font_2875265_do1yqdvsyam.js',
};

export default Settings;
