import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Avatar, Layout, Menu } from "antd";
import {
  SolutionOutlined,
  InfoCircleOutlined,
  SnippetsOutlined,
  PieChartOutlined,
} from "@ant-design/icons";
import classes from "./PrivateLayout.module.css";
import jwt from 'jwt-decode';
import AuthStore from '../../stores/AuthStore';
import userApi from '../../api/UserApi';

const { Content, Sider } = Layout;
const { SubMenu } = Menu;

const PrivateLayout = ({ children }: any) => {
  const [collapsed, setCollapsed] = useState(true);

  const onCollapse = (collValue: boolean) => {
    setCollapsed(collValue);
  };

  const [imageBase64, setImageBase64] = useState<string>();
  const fetchData = async () => {
    const token = AuthStore.getToken() as string;
    if (token == null) {
      history.push("/signin");
    }
    else {
      const user: any = jwt(token);
      await userApi.getById(user.nameid).then(async response => {
        await userApi.getImage(response.data.user.imagePath).then((response: { data: any; }) => {
          setImageBase64(response.data);
        })
      })
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  const history = useHistory();
  return (
    <Layout style={{ minHeight: "calc(100vh-64px-82px)" }}>
      <Sider collapsible
        collapsed={collapsed}
        onCollapse={onCollapse}
        className={classes.sidebar}
        breakpoint="xxl"
        collapsedWidth="0">
        <div className={classes.profilePhoto}>
          <Avatar
            size={64}
            src={imageBase64}
            alt="User"
            style={{ marginRight: "10px" }}
          />
        </div>
        <Menu theme="dark" mode="inline" className={classes.leftMenu}>
          <Menu.Item
            key="1"
            icon={<SolutionOutlined />}
            onClick={() => history.push("/decisions")}
            style={{ color: "white" }}
          >
            Рішення
          </Menu.Item>
          <SubMenu key="sub1" icon={<InfoCircleOutlined />} title="Інформація">

            <Menu.Item key="2">Таблиця користувачів</Menu.Item>
            <Menu.Item onClick={() => history.push("/cities")} key="3">
              Станиці
            </Menu.Item>
            <Menu.Item key="4">Округи</Menu.Item>
            <Menu.Item onClick={() => history.push('/events/types')} key="5">
              Події
            </Menu.Item>
            <Menu.Item onClick={() => history.push('/clubs')} key="6">Курені</Menu.Item>
            <Menu.Item key="7">Відзначення</Menu.Item>
            <Menu.Item key="8">Кадра виховників</Menu.Item>
          </SubMenu>
          <SubMenu key="sub2" icon={<SnippetsOutlined />} title="Документи">
            <SubMenu key="sub2.1" title="Звіти">
              <Menu.Item onClick={() => history.push('/annualreport/create/5')} key="9">Подати річний звіт станиці</Menu.Item>
              <Menu.Item key="10">Річні звіти</Menu.Item>
              <Menu.Item key="11">Статистичні звіти</Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub2.2"
              icon={<PieChartOutlined />}
              title="Статистика"
            >
              <Menu.Item key="12">Геостатистика</Menu.Item>
              <Menu.Item key="13">Статистика по роках</Menu.Item>
              <Menu.Item key="14">Статистика(періоди)</Menu.Item>
            </SubMenu>
            <SubMenu key="sub2.3" title="Осередки">
              <Menu.Item key="15">Осередки та адміни</Menu.Item>
              <Menu.Item key="16">Порівняти осередки</Menu.Item>
            </SubMenu>
          </SubMenu>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Content style={{ margin: "0 16px" }}>
          <div
            className="site-layout-background"
            style={{ padding: 24, minHeight: 360 }}
          >
            {children}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default PrivateLayout;