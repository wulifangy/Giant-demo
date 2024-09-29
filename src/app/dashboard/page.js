"use client";

import { useState, useEffect } from "react";
import { Layout, Menu, Card, Statistic, Row, Col } from "antd";
import {
  UserOutlined,
  DashboardOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/navigation";

const { Header, Content, Sider } = Layout;

export default function Dashboard() {
  const router = useRouter();
  const [username, setUsername] = useState("");

  useEffect(() => {
    // 这里应该从后端API获取用户信息
    // 为了演示，我们使用模拟数据
    setUsername("管理员");
  }, []);

  const handleMenuClick = (key) => {
    if (key === "logout") {
      // 处理登出逻辑
      router.push("/login");
    }
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header className="flex items-center justify-between">
        <div className="text-white text-2xl">仪表盘</div>
        <div className="text-white">欢迎，{username}</div>
      </Header>
      <Layout>
        <Sider width={200} className="site-layout-background">
          <Menu
            mode="inline"
            defaultSelectedKeys={["1"]}
            style={{ height: "100%", borderRight: 0 }}
          >
            <Menu.Item key="1" icon={<DashboardOutlined />}>
              仪表盘
            </Menu.Item>
            <Menu.Item key="2" icon={<UserOutlined />}>
              用户管理
            </Menu.Item>
            <Menu.Item key="3" icon={<SettingOutlined />}>
              设置
            </Menu.Item>
            <Menu.Item key="logout" onClick={() => handleMenuClick("logout")}>
              登出
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout style={{ padding: "24px" }}>
          <Content className="site-layout-background">
            <Row gutter={16}>
              <Col xs={24} sm={24} md={8}>
                <Card>
                  <Statistic title="活跃用户" value={112893} />
                </Card>
              </Col>
              <Col xs={24} sm={24} md={8}>
                <Card>
                  <Statistic title="新注册" value={8846} />
                </Card>
              </Col>
              <Col xs={24} sm={24} md={8}>
                <Card>
                  <Statistic title="总收入" value={9280} prefix="¥" />
                </Card>
              </Col>
            </Row>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
}
