/**
 * @author giscafer
 * @email giscafer@outlook.com
 * @create date 2021-11-25 10:38:08
 * @modify date 2022-02-14 17:47:45
 * @desc 为了保证和平台效果一致，用了自定义渲染菜单方式，配合RhSidebar组件使用
 */

import { cloneDeep } from 'lodash';
import routes from './routes';

export const basePathName = '/welcome';

const MENUS: any = {
  menuHeaderTitle: 'RootHub',
  menuHeaderTitleIcon: 'rh-icon-icon_yingyongguanli',
  subMenuCollapseIcon: 'rh-icon-arrow-up',
  subMenuExpandIcon: 'rh-icon-arrow-down',
  menuItems: [],
};

const cloneRoutes: any[] = cloneDeep(routes);
if (process.env.NODE_ENV === 'development') {
  cloneRoutes.push({
    key: 'demo',
    path: '/demo',
    icon: 'rh-icon-ruanjiankaifabao',
    name: 'Demo页（dev）',
  });
  cloneRoutes.push({
    key: 'components',
    path: '//localhost/~docs',
    icon: 'rh-icon-ruanjiankaifabao',
    name: '组件文档（dev）',
    isExternal: true,
  });
}
MENUS.menuItems = cloneRoutes;

export default MENUS;
