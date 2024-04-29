import { defineConfig } from "umi";
import theme from "./theme";
import { menus } from "./router";

export default defineConfig({
  // 配置路由模式为hash模式，type可选 browser、hash 和 memory，默认browser
  history: { type: "hash" }, //可通过history配置哈希路由，注意不要和hash配置混淆
  // hash,//如果配置了hash: true ， 会让dist目录下生成的文件包含 hash 后缀，如下logo.[hash字符].png
  // dynamicImport,//启用按需加载
  // devServer: {
  // 	port: 3000,
  // },
  routes: menus,
  // 配置别名，对引用路径进行映射。
  alias: {
    "@utils": "/src/utils",
    "@assets": "/src/assets",
  },
  theme, //如果想要定制不同主题，可通过theme配置主题样式变量，变量为less变量
  // antd的配置
  //   antd:{
  //     dark:false // 开启暗黑主题
  //   },
  //   希望将 ClassName 类名变成驼峰命名形式，
  // 在具体页面中，className会被解析成驼峰形式
  // <div className={styles.barFoo}>Hello</div>; => <div class="bar-foo___{hash}">Hello</div>
  //   cssLoader: {
  //     localsConvention: 'camelCase',
  //    },
  //    如果你想要修改webpack配置，或使用各种webpack插件，可通过此配置来实现
  // chainWebpack(config, { webpack }) {
  // 	config.plugin('XXPlugin').use(XXPlugin);
  // }
  externals: {
    react: "var window.React",
    "react-dom": "var window.ReactDOM",
    "prop-types": "var window.PropTypes",
    "@alifd/next": "var window.Next",
    "@alilc/lowcode-engine": "var window.AliLowCodeEngine",
    "@alilc/lowcode-editor-core":
      "var window.AliLowCodeEngine.common.editorCabin",
    "@alilc/lowcode-editor-skeleton":
      "var window.AliLowCodeEngine.common.skeletonCabin",
    "@alilc/lowcode-designer":
      "var window.AliLowCodeEngine.common.designerCabin",
    "@alilc/lowcode-engine-ext": "var window.AliLowCodeEngineExt",
    "@ali/lowcode-engine": "var window.AliLowCodeEngine",
    moment: "var window.moment",
    lodash: "var window._",
  },
  styles: [
    "https://alifd.alicdn.com/npm/@alilc/lowcode-engine@latest/dist/css/engine-core.css",
    "https://g.alicdn.com/code/lib/alifd__next/1.23.24/next.min.css",
    "https://alifd.alicdn.com/npm/@alifd/theme-lowcode-light/0.2.0/next.min.css",
    "https://alifd.alicdn.com/npm/@alilc/lowcode-engine-ext@latest/dist/css/engine-ext.css",
  ],
  scripts: [
    {
      src: "https://g.alicdn.com/code/lib/react/18.0.0/umd/react.development.js",
      defer: false,
    },
    {
      src: "https://g.alicdn.com/code/lib/react-dom/18.0.0/umd/react-dom.development.js",
      defer: false,
    },
    {
      src: "https://g.alicdn.com/code/lib/prop-types/15.7.2/prop-types.js",
      defer: false,
    },
    {
      src: "https://g.alicdn.com/platform/c/react15-polyfill/0.0.1/dist/index.js",
      defer: false,
    },
    {
      src: "https://g.alicdn.com/platform/c/lodash/4.6.1/lodash.min.js",
      defer: false,
    },
    {
      src: "https://g.alicdn.com/code/lib/moment.js/2.29.1/moment-with-locales.min.js",
      defer: false,
    },
    {
      src: "https://g.alicdn.com/code/lib/alifd__next/1.23.24/next.min.js",
      defer: false,
    },
    {
      src: "https://alifd.alicdn.com/npm/@alilc/lowcode-engine@latest/dist/js/engine-core.js",
      defer: false,
    },
    {
      src: "https://alifd.alicdn.com/npm/@alilc/lowcode-engine-ext@latest/dist/js/engine-ext.js",
      defer: false,
    },
  ],
  // qiankun: {
  //   master: {
  //     // 注册子应用信息
  //     apps: [
  //       { name: "appA", entry: "http://localhost:8001" },
  //       { name: "appB", entry: "http://localhost:8002" },
  //     ],
  //     // 配置微应用关联路由
  //     router: [
  //       {
  //         path: "/appA",
  //         microApp: "appA",
  //       },
  //       {
  //         path: "/appB",
  //         microApp: "appB",
  //       },
  //     ],
  //   },
  // },
  // 子应用配置
  // qiankun:{
  //   slave:{},
  // },
});
