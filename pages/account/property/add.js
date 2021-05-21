import React, { useState, useEffect } from 'react';
import {
  Spin, Collapse, Typography, Input, Form,
  InputNumber, Button, Checkbox, Row, Col, Alert,
  Space, notification
} from 'antd';
import { useRouter } from 'next/router';
import { LeftOutlined } from '@ant-design/icons'

import PrivateLayout from '../../../layouts/PrivateLayout';
import PropertyPreview from '../../../components/PropertyPreview';
import EditorPanel from '../../../components/property/EditorPanel';
import useGlobal from '../../../hooks/useGlobal';

const { Panel } = Collapse;
const { Title, Text } = Typography;

const propertyState = {
  name: 'Courtyard Care Facility',
  heading: 'Comfty Place, Loving Place',
  description: 'Please edit the text',
  cost: 1,
  recur: 'monthly',
  phone: '555-555-5555',
  typesOfCare: ['independent'],
  roomTypes: ['studio', 'private', 'shared'],
  amenities: ['wifi', 'cabletv'],
  careCapables: ['activities', 'medication-management', 'dressing']
}

function AccountPropertyCreate() {
  const router = useRouter()
  const [appState, actions] = useGlobal(['isLoggedIn', 'extras'])
  const [property, setProperty] = useState(propertyState)
  const [changed, setChanged] = useState({})
  const [loading, setLoading] = useState(false)
  const [rooms, setRooms] = useState([])

  useEffect(() => {
    actions.getExtras()
  }, [])

  const handleFinish = (values) => {
    setProperty({ ...property, ...values })
  }

  const handleChanged = (values) => {
    setChanged(values)
  }

  if (!property) {
    return (<div style={{ width: `100%`, height: `100vh`, justifyContent: 'center', alignItems: 'center', display: 'flex' }}><Spin /></div>)
  }

  const handleFeatPhotoUpload = async(feat, name) => {
    const reply = await actions.uploadPropertyPhoto(feat, name)
    if (reply.status) {
      setProperty({ ...property, featPhoto: reply.photo })
    }
    console.log("UPLOADED", reply)
  }

  const handlePhotoUpload = async(photo, name) => {
    const reply = await actions.uploadPropertyPhoto(photo, name)
    if (reply.status) {
      let photos = property.photos || []
      photos.push(reply.photo)
      setProperty({ ...property, photos })
    }
    console.log("UPLOADED", reply)
  }

  const handleCreate = async() => {
    setLoading(true)
    console.log("PROPERTY CREATION", property)
    const reply = await actions.createProperty({ ...property, quick: true })
    if (reply.status) {
      router.push('/account')
      notification.success({
        message: `Property Added`,
        description: 'You have successfully added a new property'
      })
    } else {
      notification.error({
        message: `Error when adding property`,
        description: reply.message
      })
    }
    console.log("REPLY", reply)
    setLoading(false)
  }

  const sider = (
    <EditorPanel
      property={property}
      setProperty={setProperty}
      onFinish={handleFinish}
      onChanged={handleChanged}
      >
      <Button
        type="text"
        icon={<LeftOutlined />}
        onClick={() => router.push(`/account`)}
        style={{ display: 'flex', alignItems: 'center', fontSize: 16, height: 50 }}
        ghost block>
        Properties<span style={{ flex: 1 }} />
      </Button>
    </EditorPanel>
  )

  const extra = (
    <Col>
      <Button type="primary" style={{ marginRight: 10 }} onClick={handleCreate}>Save</Button>
      <Button type="primary" style={{ marginRight: 20 }}>Preview</Button>
    </Col>
  )

  return (
    <PrivateLayout
      title="customize your property page"
      sider={sider}
      extra={extra}
      contentStyle={{ backgroundColor: 'white' }}
      >
      <Spin spinning={loading}>
        <div style={{ marginBottom: 100 }}>
          <div style={{ marginTop: 20, marginBottom: 10 }}>
            <Button
              type="primary"
              size="large"
              onClick={handleCreate}>
              Create Now
            </Button>
          </div>
          <PropertyPreview
            affix={false}
            property={property}
            changed={changed}
            />
        </div>
      </Spin>
    </PrivateLayout>
  )
}

export default AccountPropertyCreate
