import { Outlet, history } from "umi";
import "./index.less";
import React from "react";
import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import { routes } from "../../config/router"; // 配置的菜单项
import _ from "lodash"; // 引入JS工具库
import { useState } from "react";
// import { TransitionGroup, CSSTransition } from "react-transition-group";
import LangChgIndex from "./components/LangChgIndex";
import SideBarRender from "./components/menuLeft";

const { Header, Content } = Layout;
// 获取到所有的菜单数据进行处理
const menus =
  routes
    ?.find((route) => route.path === "/")
    ?.routes?.filter((item) => !item.redirect) || [];
// const routerType = {
//   POP: "back",
//   PUSH: "in",
//   REPLACE: "in",
// };

const items1: MenuProps["items"] = ["1", "2", "3"].map((key) => ({
  key,
  label: `nav ${key}`,
}));

const items2: MenuProps["items"] = [
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
].map((icon, index) => {
  const key = String(index + 1);

  return {
    key: `sub${key}`,
    icon: React.createElement(icon),
    label: `subnav ${key}`,

    items: new Array(4).fill(null).map((_, j) => {
      const subKey = index * 4 + j + 1;
      return {
        key: subKey,
        label: `option${subKey}`,
      };
    }),
  };
});

const App: React.FC = (props) => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const [breadcrumbItems, setBreadcrumbItems] = useState<
    { title: string; path: string }[]
  >([]); //面包屑的配置项

  const getBreadcrumbItems = (params: any[]) => {
    setBreadcrumbItems([
      // {
      //   path: "/",
      //   title: <HomeOutlined />,
      // },
      ...params,
    ]);
  };
  return (
    <Layout>
      <Header style={{ display: "flex", alignItems: "center" }}>
        <div className="demo-logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["2"]}
          items={items1}
          style={{ flex: 1, minWidth: 0 }}
        />
        <LangChgIndex />
      </Header>
      <Layout>
        {/* {sideBarRender()} */}
        <SideBarRender
          menus={menus}
          colorBgContainer={colorBgContainer}
          getBreadcrumbItems={getBreadcrumbItems}
        />
        <Layout>
          <Breadcrumb
            style={{ padding: "8px 12px", background: "#fff" }}
            items={breadcrumbItems}
          />
          <Layout style={{ padding: "6px 12px" }}>
            <Content
              style={{
                margin: 0,
                padding: 12,
                minHeight: 280,
                // background: colorBgContainer,
                borderRadius: borderRadiusLG,
                background: "#fff",
                height: "calc(100vh - 102px)",
              }}
            >
              {/* <TransitionGroup
                style={{ height: "100%" }}
                className="transition_wrapper"
                childFactory={(child) =>
                  React.cloneElement(child, {
                    classNames: routerType[history.action],
                  })
                }
              >
                <CSSTransition key={location.hash} appear timeout={3000}>
                
                </CSSTransition>
              </TransitionGroup> */}
              <Outlet />
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default App;
