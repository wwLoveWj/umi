import type { MenuProps } from "antd";
import { Layout, Menu } from "antd";
import _ from "lodash"; // 引入JS工具库
import { useState, useEffect } from "react";
import { Link } from "umi";
import { UserOutlined } from "@ant-design/icons";

const { Sider } = Layout;
const { SubMenu } = Menu; // 子菜单

interface RouterItem {
  title?: string;
  key?: string;
  path?: string;
  routes?: RouterItem[];
  component?: any;
  exact?: boolean;
  redirect?: string;
}
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

// 左侧菜单的menu结构数据
function sideBarRender({
  menus,
  colorBgContainer,
  getBreadcrumbItems,
}: {
  menus: RouterItem[];
  colorBgContainer: string;
  getBreadcrumbItems: (params: any[]) => void;
}) {
  const [saveKeyPath, setSaveKeyPath] = useState<string[]>([]); //存储选中的菜单路径集合
  const [stateOpenKeys, setStateOpenKeys] = useState([
    "good-quantity",
    "good-manage",
  ]);

  const onOpenChange: MenuProps["onOpenChange"] = (openKeys) => {
    setStateOpenKeys(openKeys);
  };
  const onSelectMenu = ({ keyPath }: { keyPath: string[] }) => {
    setSaveKeyPath(keyPath);
  };

  /**
   * 获取面包屑的配置数据
   */
  const keyPathMenu = (currentKeyPath: string[]) => {
    let arr: any = [];
    let brr: any = [];
    const getAllMenu = (result: RouterItem[]) => {
      (result || [])?.map((val) => {
        if (val.routes && val.routes?.length > 0) {
          getAllMenu(val.routes);
        }
        // 遍历routes配置，并且得到扁平化数组
        brr.push(val);
      });
    };
    getAllMenu(menus);
    // 拿到当前选中项的path路径进行组装面包屑配置
    currentKeyPath.map((item: any, index: number) => {
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

    getBreadcrumbItems(arr);
  };

  useEffect(() => {
    let result = location.hash.split("/");
    result.shift();
    setSaveKeyPath(result);
    keyPathMenu(result);
  }, [location.hash]);
  return (
    <Sider
      width={180}
      style={{ height: "calc(100vh - 48px)", background: colorBgContainer }}
    >
      <Menu
        mode="inline"
        theme="dark"
        selectedKeys={saveKeyPath}
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

export default sideBarRender;
