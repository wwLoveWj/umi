import { Link, Outlet } from "umi";
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
import { menus } from "../../config/router"; // 配置的菜单项
import _ from "lodash"; // 引入JS工具库
import { useState, useEffect } from "react";

const { Header, Content, Sider } = Layout;
const { SubMenu } = Menu; // 子菜单

interface RouterItem {
  title: string;
  key: string;
  path?: string;
  routes?: RouterItem[];
}
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

/**
 * 获取左侧菜单项
 * @param menuArr 所有的路由配置
 * @returns
 */
function getMenuItem(menuArr: any) {
  // 获取菜单项
  return _.map(menuArr, (route: RouterItem) => {
    if (route.routes) {
      // 有多级菜单时
      return (
        <SubMenu key={route.key} title={route.title}>
          {/*  重复调用函数渲染出子级菜单 */}
          {getMenuItem(route.routes)}
        </SubMenu>
      );
    }
    return (
      <Menu.Item key={route.key}>
        <Link to={route.path || "/"}>{route.title}</Link>
      </Menu.Item>
    );
  });
}

const App: React.FC = (props) => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const [breadcrumbItems, setBreadcrumbItems] = useState<
    { title: string; path: string }[]
  >([]); //面包屑的配置项
  const [saveKeyPath, setSaveKeyPath] = useState<string[]>([
    "good-quantity",
    "good-manage",
  ]); //存储选中的菜单路径集合

  /**
   * 获取面包屑的配置数据
   */
  const keyPathMenu = (currentKeyPath: string[]) => {
    let arr: any = [];
    let brr: any = [];
    const getAllMenu = (result: RouterItem[]) => {
      result.map((val) => {
        if (val.routes && val.routes?.length > 0) {
          getAllMenu(val.routes);
        }
        // 遍历routes配置，并且得到扁平化数组
        brr.push(val);
      });
    };
    getAllMenu(menus);
    // 拿到当前选中项的path路径进行组装面包屑配置
    currentKeyPath.reverse().map((item: any, index: number) => {
      // 找到与当前path匹配的router
      let titleObj: RouterItem = brr.find(
        (val: RouterItem) => val.key === currentKeyPath[index]
      );
      arr[index] = titleObj?.routes
        ? {
            path: currentKeyPath[index],
            title: (
              <>
                <UserOutlined />
                <span>{titleObj?.title}</span>
              </>
            ),
            className: "disabled-breadcrumb-item",
          }
        : {
            path: currentKeyPath[index],
            title: titleObj?.title,
          };
    });
    setBreadcrumbItems(arr);
  };
  // 左侧菜单的menu结构数据
  function sideBarRender() {
    const [stateOpenKeys, setStateOpenKeys] = useState([
      "good-quantity",
      "good-manage",
    ]);
    const onOpenChange: MenuProps["onOpenChange"] = (openKeys) => {
      // history.push("/good-quantity");
      setStateOpenKeys(openKeys);
    };
    const onSelectMenu = ({ keyPath }: { keyPath: string[] }) => {
      setSaveKeyPath(keyPath);
      keyPathMenu(keyPath);
    };
    return (
      <Sider
        width={180}
        style={{ height: "calc(100vh - 48px)", background: colorBgContainer }}
      >
        <Menu
          mode="inline"
          theme="dark"
          defaultSelectedKeys={saveKeyPath}
          openKeys={stateOpenKeys}
          style={{ height: "100%", borderRight: 0 }}
          onOpenChange={onOpenChange}
          onSelect={onSelectMenu}
        >
          {getMenuItem(menus)}
        </Menu>
      </Sider>
    );
  }

  useEffect(() => {
    keyPathMenu(saveKeyPath);
  }, []);
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
      </Header>
      <Layout>
        {sideBarRender()}
        <Layout>
          {/* <Breadcrumb >
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb> */}
          <Breadcrumb
            style={{ padding: "8px 12px", background: "blue" }}
            items={breadcrumbItems}
          />
          <Layout style={{ padding: "0 12px" }}>
            <Content
              style={{
                margin: 0,
                padding: 12,
                minHeight: 280,
                // background: colorBgContainer,
                borderRadius: borderRadiusLG,
                background: "yellow",
                height: "calc(100vh - 102px)",
              }}
            >
              <Outlet />
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default App;
