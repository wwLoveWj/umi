// import dayjs from "@/utils/dayjs";
import "./global.less";
// 这里空一行，避免 prettier 自动格式化打乱引入顺序

import { ConfigProvider } from "antd";
import Package from "../package.json";
// import "dayjs/locale/zh-cn";
import React from "react";
// // import serviceRoutes from '@/routes/index';
// import * as iconfont from "../public/iconfont.js";
// import * as Sentry from "@sentry/react";
// import { BrowserTracing } from "@sentry/tracing";

// // dayjs.locale("zh-cn");

// export async function getInitialState() {
//   const data = {
//     xxx: "初始数据",
//   };
//   return data;
// }
// /**
//  *
//  * @param routes 路由信息对象
//  * @description 重定向，转换不同的redirect
//  */
// export function patchRoutes({ routes }: { routes: any[] }) {
//   const loginInfo = JSON.parse(localStorage.getItem("login-info") as any) || {
//     userType: [],
//   };
//   const userType = loginInfo?.userType || [];
//   const pagesRoutes = routes[2].routes;
//   // 修改重定向配置
//   if (pagesRoutes && pagesRoutes[0]) {
//     pagesRoutes[0] = {
//       ...pagesRoutes[0],
//       path: "/",
//       redirect: userType.includes(3) ? "/home" : "/users",
//       // 变更为：1：普通管理员账号；2：超级管理员账号；3：普通用户账号；
//     };
//   }
//   routes[2].routes = pagesRoutes;
// }

export function rootContainer(container: React.ReactNode) {
  ConfigProvider.config({
    prefixCls: Package.name + "-ant",
  });
  return (
    <ConfigProvider prefixCls={Package.name + "-ant"}>
      {container}
    </ConfigProvider>
  );
}

// export function render(doRender: () => void) {
//   doRender();
// }

// const initSentry = () => {
//   // dns为各应用生产环境的dns,可在sentry系统查询，
//   const localHref = window.location.href;
//   const packageInfo = require("../package.json");
//   let dsn ="xxx";//区分环境

//   Sentry.init({
//     dsn: dsn,
//     integrations: [new BrowserTracing()],
//     tracesSampleRate: 0.1,
//     release: packageInfo.version || "v1.0.0",
//   });
// };
// // 并在初始化时运行该方法
// // initSentry();

// export function onRouteChange({ routes, matchedRoutes, location, action }) {
//   console.log(
//     "onRouteChange: routes, matchedRoutes, location, action",
//     routes,
//     matchedRoutes,
//     location,
//     action
//   );
//   if (matchedRoutes.length) {
//     document.title =
//       matchedRoutes[matchedRoutes.length - 1].route.title || "标题修改中";
//   }
// }
