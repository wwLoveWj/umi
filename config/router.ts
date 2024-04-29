export const routes = [
  {
    path: "/login",
    component: "@/pages/login", // 加载login登录页面
  },
  {
    path: "/",
    component: "@/layouts/index", // 主页加载layout公共组件
    layout: false,
    routes: [
      {
        path: "/",
        exact: true,
        redirect: "/good-manage/good-quantity",
      },
      // 菜单的配置项，用于动态渲染 key:	唯一标志 title: 菜单项值 path：用于路由跳转
      { key: "user-manage", title: "用户管理", path: "/user-manage" },
      {
        key: "good-manage",
        title: "商品管理",
        path: "/good-manage",
        routes: [
          {
            key: "good-quantity",
            title: "商品数量",
            path: "/good-manage/good-quantity",
            component: "docs",
          },
          {
            key: "good-quality",
            title: "商品质量",
            path: "/good-manage/good-quality",
            component: "index",
          },
        ],
      },
      {
        key: "address-manage",
        title: "地址管理",
        routes: [
          {
            key: "my-address",
            title: "我的地址",
            path: "/address-manage/my-address",
          },
        ],
      },
      { key: "collect-manage", title: "收藏管理", path: "/collect-manage" },
    ],
  },
  {
    path: "*",
    component: "404",
    layout: false,
  },
];
