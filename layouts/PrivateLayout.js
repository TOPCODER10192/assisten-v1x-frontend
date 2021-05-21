import React, { useCallback, useState, useMemo } from 'react';
import 'antd/dist/antd.css';
import Link from 'next/link';
import { Layout, Menu, Row, Col, Typography, Dropdown, Button, Space, Avatar } from 'antd';
import {
  UploadOutlined, UserOutlined, VideoCameraOutlined,
  AppstoreAddOutlined, LockOutlined, LogoutOutlined
} from '@ant-design/icons';
import { useMediaQuery } from 'react-responsive';

const { Title, Text } = Typography
const { Header, Content, Footer, Sider } = Layout;

import styles from './PrivateLayout.module.css';
import useGlobal from '../hooks/useGlobal';

export default function PrivateLayout({ sider, extra, title, children, contentStyle, showUser = true }) {
  const [state, actions] = useGlobal(['isLoggedIn', 'user'])
  const isMobile = useMediaQuery({ query: '(max-width: 760px)' })

  const userMenu = (
    <Menu style={{ minWidth: 200 }}>
      <Menu.Item key="user">
        <Space>
          <Avatar src={state.user.photo || 'https://randomuser.me/api/portraits/men/85.jpg'} />
          {state.user.firstname}
        </Space>
      </Menu.Item>
      <Menu.Item key="account" icon={<AppstoreAddOutlined />}>
        <Link href="/account">
          Dashboard
        </Link>
      </Menu.Item>
      <Menu.Item key="profile" icon={<UserOutlined />}>
        <Link href="/account/profile">
          My Profile
        </Link>
      </Menu.Item>
      <Menu.Item key="password" icon={<LockOutlined />}>
        <Link href="/account/password">
          Change Password
        </Link>
      </Menu.Item>
      <Menu.Item key="listing" icon={<AppstoreAddOutlined />}>
        <Link href="/listing">
          View Site
        </Link>
      </Menu.Item>
      <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={actions.logout}>
        Logout
      </Menu.Item>
    </Menu>
  )

  const header = (
    <Row justify="middle" wrap={false}>
      <Col flex={isMobile ? 'auto' : '300px'}>
        <Link href="/account">
          <div className={styles.logo} style={{ backgroundImage: `url("/logo/assisten-colored.svg")` }}/>
        </Link>
      </Col>
      {
        (!isMobile && title) && (
          <Col flex="auto">
            <Title level={3} className={styles.title}>{title}</Title>
          </Col>
        )
      }
      { (!isMobile && extra) && extra }
      <Col flex="0">
        <Dropdown
          trigger={['click']}
          placement="bottomRight"
          overlay={userMenu}>
          <Button
            size="large"
            shape="circle"
            type="primary"
            style={{ marginRight: `0px !important` }}
            icon={<UserOutlined />}
            />
        </Dropdown>
      </Col>
    </Row>
  )

  return (
    <Layout style={{ height: '100vh' }}>
      {
        sider && (
          <Sider
            className={styles.sider}
            theme="light"
            width={isMobile ? '90%' : 300}
            breakpoint="lg"
            collapsedWidth="0"
            onBreakpoint={broken => {
              console.log(broken);
            }}
            onCollapse={(collapsed, type) => {
              console.log(collapsed, type);
            }}
          >
          {sider}
          </Sider>
        )
      }
      <Layout>
        <Header theme="light" className={styles.header}>
          {header}
        </Header>
        <Content className={styles.content} style={contentStyle}>
          {children}
        </Content>
      </Layout>
    </Layout>
  )
}
