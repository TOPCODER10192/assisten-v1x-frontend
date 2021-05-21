import React, { useState } from 'react';
import { Form, Input, Button, Spin } from 'antd';
import { useRouter } from 'next/router';

import BlankLayout from '../layouts/BlankLayout';
import styles from './Login.module.css';

import useGlobal from '../hooks/useGlobal';

function Login() {
  const [state, actions] = useGlobal(['user', 'isLoggedIn'])
  const [submitting, setSubmitting] = useState(false)
  const router = useRouter()

  const handleSubmit = async(user) => {
    setSubmitting(true)
    const reply = await actions.login(user)
    if (reply.status) {
      router.push('/account')
    }
    setSubmitting(false)
  }

  return (
    <BlankLayout>
      <Spin spinning={submitting}>
        <div className={styles.login}>
          <Form size="large" layout="vertical" onFinish={handleSubmit}>
            <h1>Assisten Login</h1>
            <Form.Item name="email" label="Email address">
              <Input placeholder="account@domain.com" style={{ textTransform: 'lowercase' }} />
            </Form.Item>
            <Form.Item name="password" label="Password">
              <Input.Password placeholder="Your password" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" block><b>Log In</b></Button>
            </Form.Item>
          </Form>
        </div>
      </Spin>
    </BlankLayout>
  )
}

export default Login
