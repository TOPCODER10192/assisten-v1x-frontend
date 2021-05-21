import React, { useState } from 'react';
import { Form, Row, Col, Input, Button, DatePicker, Divider, Spin, message } from 'antd';

import styles from './TourForm.module.css';
import useGlobal from '../../hooks/useGlobal';

const TourForm = ({ property, disabled = false }) => {
  const [state, actions] = useGlobal(['isLoggedIn'])
  const [loading, setLoading] = useState(false)
  const [form] = Form.useForm()

  const handleSubmit = async (tour) => {
    if (disabled === false) {
      setLoading(true)
      tour.schedule = tour.schedule.format('YYYY-MM-DD')
      const reply = await actions.createTour(property._id, tour)
      if (reply.status) {
        message.success('Your request was successfully submitted')
        form.resetFields()
      }
      setLoading(false)
    } else {

    }
  }

  return (
    <div className={styles.tour}>
      <Spin spinning={loading}>
        <Row justify="middle">
          <Col xs={16} >
            <h3>{property.name}</h3>
          </Col>
          <Col xs={8} align="end">
            <span>Starting at</span>
            <h3 className={styles.cost}>${parseFloat(property.cost)}</h3>
          </Col>
        </Row>
        <Row align="center" justify="middle" style={{ marginTop: 20 }}>
          <Col xs={8} style={{ textAlign: 'center' }}>
            <div className={styles.agent} style={{ backgroundImage: `url("/photos/agent.jpeg")` }} />
          </Col>
          <Col xs={16}>
            <div className={styles.call}>
              <h3 className={styles.phoneTitle}>Give Us A Call!</h3>
              <a href={`tel:${property.phone}`}>
                <h4 className={styles.phone}>{property.phone}</h4>
              </a>
            </div>
          </Col>
        </Row>
        <Divider />

        <h3 className={styles.schedTitle}>Request a Tour Today!</h3>

        <Form
          form={form}
          size="large"
          className={styles.contactForm}
          onFinish={handleSubmit}>
          <Row gutter={20} style={{ marginTop: 30 }}>
            <Col xs={24} md={12}>
              <Form.Item
                name="firstname"
                className={styles.formItem}
                rules={[{ required: true, message: 'Required' }]}
              >
                <Input placeholder="First Name" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                name="lastname"
                className={styles.formItem}
                rules={[{ required: true, message: 'Required' }]}
              >
                <Input placeholder="Last Name" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                name="email"
                className={styles.formItem}
                rules={[{ required: true, message: 'Required' }]}
              >
                <Input placeholder="Email Address" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                name="phone"
                className={styles.formItem}
                rules={[{ required: true, message: 'Required' }]}
              >
                <Input placeholder="Phone Number" maxLength={12} />
              </Form.Item>
            </Col>
            <Col xs={24} md={24}>
              <Form.Item
                name="schedule"
                className={styles.formItem}
                rules={[{ required: true, message: 'Required' }]}
              >
                <DatePicker placeholder="Preferred Date" style={{ width: '100%', paddingLeft: 0 }} />
              </Form.Item>
            </Col>
            <Col style={{ textAlign: 'right' }} xs={24}>
              <Button
                type="primary"
                htmlType="submit"
                className={styles.tourButton}>
                Request Tour
              </Button>
            </Col>
          </Row>
        </Form>

      </Spin>
    </div>
  )
}

export default TourForm
