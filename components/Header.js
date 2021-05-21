import React from 'react';
import Router from 'next/router';
import Link from 'next/link';
import styles from './Header.module.css';
import { Row, Col, Input, Dropdown, Menu, Button, Space, Avatar } from 'antd';
import {
  DownOutlined, UserOutlined,
  AppstoreAddOutlined, LockOutlined,
  ShopOutlined, LoginOutlined,
  LogoutOutlined, PlusCircleOutlined,
} from '@ant-design/icons';

import useGlobal from '../hooks/useGlobal';
import { useMediaQuery } from 'react-responsive';

const Header = ({ search = true, mode = 'full', alt = false, content, extras }) => {
  const [state, actions] = useGlobal(['isLoggedIn'])

  const authMenu = (
    <Menu style={{ minWidth: 160 }}>
      <Menu.Item key="login" onClick={() => Router.push('/login')}>
        Login
      </Menu.Item>
      <Menu.Item key="register"  onClick={() => Router.push('/register')}>
        Register
      </Menu.Item>
    </Menu>
  )

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
      <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={actions.logout}>
        Logout
      </Menu.Item>
    </Menu>
  )

  if (alt) {
    return (
      <div className={styles.headerAlt}>
        <div className={mode == 'full' ? styles.innerfull : styles.inner}>
          <Row align="middle">
            <Col xs={12}>
              <Link href="/">
                <div className={styles.logo} style={{ backgroundImage: `url("/logo/assisten-white.svg")` }}/>
              </Link>
            </Col>
            <Col xs={12} align="right">
              <Dropdown placement="bottomRight" overlay={state.isLoggedIn ? userMenu : authMenu}>
                <Button
                  size="large"
                  shape="circle"
                  type="primary"
                  icon={<UserOutlined />}
                  />
              </Dropdown>
            </Col>
          </Row>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.header}>
      <div className={mode == 'full' ? styles.innerfull : styles.inner}>
        <Row align="middle" gutter={10}>
          <Col xs={12}>
            <Link href="/">
              <div className={styles.logo} style={{ backgroundImage: `url("/logo/assisten-colored.svg")` }}/>
            </Link>
          </Col>
          <Col xs={12} align="right">
            <div>
              <Space>
                { extras }
                {
                  search && (
                    <Input.Search
                      size="large"
                      placeholder="Search property, city or ZIP code"
                      onPressEnter={event => Router.push({ pathname: '/listing', query: { search: event.target.value }})}
                      />
                  )
                }
                <Dropdown
                  placement="bottomRight"
                  trigger={['click']}
                  overlay={state.isLoggedIn ? userMenu : authMenu}>
                  <Button
                    size="large"
                    shape="circle"
                    type="primary"
                    style={{ marginRight: `0px !important` }}
                    icon={<UserOutlined />}
                    />
                </Dropdown>
              </Space>
            </div>
          </Col>
        </Row>
        { content }
      </div>
    </div>
  )
}

export default Header
