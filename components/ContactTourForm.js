import React from 'react';
import { Form, Row, Col, Input, Button, DatePicker, Divider } from 'antd';

import styles from './PropertyPreview.module.css';

const ContactTourForm = ({ property, onComplete }) => (
  <Form className={styles.card} onFinish={onComplete}>
    <Row>
      <Col flex="auto">
        <h3>{property.name}</h3>
      </Col>
      <Col>
        <span>Starting at</span>
        <h3>{property.cost}</h3>
      </Col>
    </Row>
    <Row align="center" justify="middle">
      <Col>
        <div className={styles.agent} style={{ backgroundImage: `url("/photos/agent.jpeg")` }}/>
      </Col>
      <Col>
        <div className={styles.call}>
          <h3>Give Us A Call!</h3>
          <h2>{property.phone}</h2>
        </div>
      </Col>
    </Row>
    <Divider />
    <h3 className={styles.schedTitle}>Schedule a tour today</h3>
    <Row gutter={20} style={{ marginTop: 30 }}>
      <Col xs={24} md={12}>
        <Form.Item name="">
          <Input size="large" style={{ marginBottom: 10 }} />
        </Form.Item>
      </Col>
      <Col xs={24} md={12}>
        <Input size="large" style={{ marginBottom: 10 }} />
      </Col>
      <Col xs={24} md={12}>
        <Input size="large" style={{ marginBottom: 10 }} />
      </Col>
      <Col xs={24} md={12}>
        <Input size="large" style={{ marginBottom: 10 }}/>
      </Col>
      <Col xs={24} md={24}>
        <DatePicker size="large" style={{ width: '100%', marginBottom: 10 }} />
      </Col>
      <Col style={{ textAlign: 'right' }} xs={24}>
        <Button type="primary" size="large" className={styles.button}>Schedule A Tour</Button>
      </Col>
    </Row>
  </Form>
)

export default ContactTourForm
