# topology-umi-demo

基于 [rh-template-react-umi](https://github.com/RootLinkFE/rh-template-react-umi) 的工程模板，http://blog.giscafer.com/topology-umi-demo/

![](./demo.png)

## 依赖

- Antd 4.14.x
- Umi 3.5.x
- React 17.0
- bizcharts
- axios
- ……

## 功能特点

- [@roothub/components](http://components.leekhub.com/) 组件
- Antd 样式覆写，满足 UI 风格
  - 如果要去掉，可以注释`styles/reset/index.less`
- Swagger Doc Api TypeScript 接口代码生成
- 主题换色
- Topology

## 使用说明

Install dependencies,

```bash
$ yarn
```

Start the dev server,

```bash
$ yarn start
```

## 开发说明

- 项目引入了百度 amis 的样式库，见`styles/helper.css` ，文档：https://baidu.gitee.io/amis/zh-CN/style/index
- [文件夹结构](https://pro.ant.design/zh-CN/docs/folder)
- 更多开发规范见：[https://pro.ant.design](https://pro.ant.design/zh-CN/docs/introduction)

## @roothub/cli 根据配置文件生成代码（推荐使用）

TypeScript 的 API 生成通过自研 `@roothub/cli` 来生成，生成的文件夹在 `src/rh/**` 之下。

安装工具包 `npm i @roothub/cli -g`

- `http-client.ts` 封装 Axios 请求拦截，建议生成 api 时不要覆盖。

## @roothub/cli 生成 swagger 接口代码

安装工具包 `npm i @roothub/cli -g`

- 修改 `rh-codegen.config.json` swagger 接口文档 url（详细见[rh.js#rh-codegen](https://github.com/RootLinkFE/rh.js#rh-codegen))
- `rh codegen update` 生成 api，并询问是否再生成 mock
- `http-client.ts` 封装 Axios 请求拦截，建议生成 api 时不要覆盖。

- 更多操作 `rh codegen -h`

## 其他

拓扑图\统计图表

- Topology : http://topology.le5le.com/
- bizcharts ： https://www.bizcharts.net/

## License

MIT
