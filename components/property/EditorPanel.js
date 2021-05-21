import React, { useState, useEffect } from 'react';

import {
  Spin, Collapse, Typography, Input, Form,
  InputNumber, Button, Checkbox, Row, Col,
  Select, Space, notification
} from 'antd';

import {
  DownOutlined, UserOutlined,
  AppstoreAddOutlined, LockOutlined,
  ShopOutlined, LoginOutlined,
  LogoutOutlined, PlusCircleOutlined,
  FontSizeOutlined,
  LineHeightOutlined, BoldOutlined,
  DollarOutlined, FileImageOutlined,
  UnorderedListOutlined, CommentOutlined
} from '@ant-design/icons';

import {
  CaresEditor, RoomsEditor, AmenitiesEditor,
  TestimonialsEditor, PhotosEditor, Checklist,
} from './EditSections';

import useGlobal from '../../hooks/useGlobal';

const { Panel } = Collapse;

export default function EditorPanel({ children, onFinish, onChanged, property, setProperty }) {
  const [state, actions] = useGlobal(['isLoggedIn', 'extras'])
  const [form] = Form.useForm()

  const handleFeatPhotoUpload = async (feat, name) => {
    const reply = await actions.uploadPropertyPhoto(feat, name)
    if (reply.status) {
      setProperty({ ...property, featPhoto: reply.photo })
    }
  }

  const handlePhotoUpload = async (photo, name) => {
    const reply = await actions.uploadPropertyPhoto(photo, name)
    if (reply.status) {
      let photos = property.photos || []
      photos.push(reply.photo)
      setProperty({ ...property, photos })
    }
  }

  const handleBlur = () => {
    console.log("BLUR PROPERTY", property)
    form.submit()
  }

  return (
    <div style={{ marginTop: 50, paddingTop: 20, paddingBottom: 100 }}>
      <Form
        form={form}
        onBlur={handleBlur}
        initialValues={property}
        onFinish={onFinish}
        onValuesChange={onChanged}
        layout="vertical"
        size="large">
        {children}
        <Collapse ghost expandIconPosition="right" className="editor">
          <Panel header={<Space><FontSizeOutlined />Heading</Space>}>
            <Form.Item name="heading" label="Title">
              <Input.TextArea />
            </Form.Item>
          </Panel>
          <Panel header={<Space><BoldOutlined />Business Information</Space>}>
            <Form.Item name="name" label="Business Name">
              <Input />
            </Form.Item>
            <Form.Item name="location" label="Location">
              <Input />
            </Form.Item>
            <Form.Item name="phone" label="Phone Number">
              <Input maxLength={12} htmlType="tel" />
            </Form.Item>
            <Form.Item name="email" label="Email">
              <Input htmlType="email" />
            </Form.Item>
            <Form.Item name="description" label="Description">
              <Input.TextArea />
            </Form.Item>
          </Panel>
          <Panel header={<Space><DollarOutlined />Pricing</Space>}>
            <Row gutter={10}>
              <Col xs={12}>
                <Form.Item name="cost" label="Starting at">
                  <InputNumber
                    block
                    style={{ width: '100%' }}
                  />
                </Form.Item>
              </Col>
              <Col xs={12}>
                <Form.Item name="recur" label="per">
                  <Select>
                    <Select.Option value="monthly">Monthly</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
          </Panel>
          <Panel header={<Space><FileImageOutlined />Images</Space>}>
            <PhotosEditor
              featPhoto={property.featPhoto || ''}
              photos={property.photos || []}
              onFeatComplete={handleFeatPhotoUpload}
              onPhotoComplete={handlePhotoUpload}
            />
          </Panel>
          <Panel header={<Space><UnorderedListOutlined />Community Types</Space>}>
            <Checklist
              options={state.extras.careTypes}
              selected={property.typesOfCare}
              onComplete={typesOfCare => setProperty({ ...property, typesOfCare })}
            />
          </Panel>
          <Panel header={<Space><UnorderedListOutlined />Bed Types</Space>}>
            <Checklist
              options={state.extras.roomTypes}
              selected={property.roomTypes}
              onComplete={roomTypes => setProperty({ ...property, roomTypes })}
            />
          </Panel>
          <Panel header={<Space><UnorderedListOutlined />Amenities</Space>}>
            <Checklist
              options={state.extras.amenities}
              selected={property.amenities}
              onComplete={amenities => setProperty({ ...property, amenities })}
            />
          </Panel>
          <Panel header={<Space><UnorderedListOutlined />Care Capabilities</Space>}>
            <Checklist
              options={state.extras.careCapables}
              selected={property.careCapables}
              onComplete={careCapables => setProperty({ ...property, careCapables })}
            />
          </Panel>
          <Panel header={<Space><CommentOutlined />Testimonials</Space>}>
            <TestimonialsEditor
              data={property.testimonials || []}
              onComplete={testimonials => setProperty({ ...property, testimonials })}
            />
          </Panel>
        </Collapse>
      </Form>
    </div>
  )
}

// formatter={value => `$ ${parseFloat(value).toFixed(2)}`}
