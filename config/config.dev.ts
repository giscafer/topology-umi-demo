// https://umijs.org/config/
import { defineConfig } from "umi";

export default defineConfig({
  define: {
    REACT_APP_ENV: "dev",
    // API_URL: 'http://192.168.69.51:8076/protocol-model-server',
  },
  plugins: [
    // https://github.com/zthxxx/react-dev-inspector
    "react-dev-inspector/plugins/umi/react-inspector",
  ],
  // https://github.com/zthxxx/react-dev-inspector#inspector-loader-props
  inspectorConfig: {
    exclude: [],
    babelPlugins: [],
    babelOptions: {},
  },
  // mfsu: {},
  // webpack5: {
  //   // lazyCompilation: {},
  // },
});
