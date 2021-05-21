import React, { useState, useEffect } from 'react';
import {
  Spin, Collapse, Typography, Input, Form, Space,
  InputNumber, Button, Checkbox, Row, Col, notification
} from 'antd';
import { useRouter } from 'next/router';
import { LeftOutlined } from '@ant-design/icons'

import PrivateLayout from '../../../../layouts/PrivateLayout';
import PropertyPreview from '../../../../components/PropertyPreview';
import EditorPanel from '../../../../components/property/EditorPanel';

import useGlobal from '../../../../hooks/useGlobal';

const { Panel } = Collapse;
const { Title, Text } = Typography;

function AccountPropertyDashboard() {
  const router = useRouter()
  const [appState, actions] = useGlobal(['isLoggedIn', 'extras'])
  const [property, setProperty] = useState(false)
  const [changed, setChanged] = useState({})
  const [loading, setLoading] = useState(false)
  const [rooms, setRooms] = useState([])

  const handleFinish = (values) => {
    setProperty({ ...property, ...values })
  }
  const handleChanged = (values) => {
    setChanged(values)
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
        onClick={() => router.push(`/account/property/${router.query.id}`)}
        style={{ display: 'flex', alignItems: 'center', fontSize: 16, height: 50 }}
        ghost block>
        Property Dashboard<span style={{ flex: 1 }} />
      </Button>
    </EditorPanel>
  )

  useEffect(() => {
    if (router.query.id) {
      getProperty(router.query.id)
    }
  }, [router.query.id])


  const getProperty = async (propertyId) => {
    setLoading(true)
    const reply = await actions.getProperty(propertyId)
    if (reply.status) {
      setProperty(reply.property)
    }
    setLoading(false)
  }

  const handleUpdate = async () => {
    setLoading(true)
    console.log("UPDATES", property)
    const reply = await actions.updateProperty(property._id, property)
    if (reply.status) {
      notification.success({
        message: `Property Updated`,
        description: 'You have successfully added a new property'
      })
      setProperty({ ...property, ...reply.property })
    } else {
      notification.error({
        message: `Error when updating property`,
        description: reply.message
      })
    }
    setLoading(false)
  }

  const handlePublish = async () => {
    setLoading(true)
    const reply = await actions.publishProperty(property._id)
    if (reply.status) {
      notification.success({
        message: `Published Property`,
        description: 'Property is now visible and searchable in the listing'
      })
      setProperty({ ...property, isDraft: false })
    } else {
      notification.error({
        message: `Error when updating the property`,
        description: reply.message
      })
    }
    setLoading(false)
  }

  const handleDraft = async () => {
    setLoading(true)
    const reply = await actions.unpublishProperty(property._id)
    if (reply.status) {
      notification.success({
        message: `Set to Draft Property`,
        description: 'Property is no longer visible and searchable in the listing'
      })
      setProperty({ ...property, isDraft: true })
    } else {
      notification.error({
        message: `Error when updating the property`,
        description: reply.message
      })
    }
    setLoading(false)
  }

  const extra = (
    <Col>
      <Button type="primary" style={{ marginRight: 10 }} onClick={handleUpdate}>Update</Button>
      {
        property.isDraft
          ? <Button type="primary" style={{ marginRight: 10 }} onClick={handlePublish}>Publish</Button>
          : <Button type="danger" style={{ marginRight: 10 }} onClick={handleDraft}>Set To Draft</Button>
      }
    </Col>
  )

  if (!property) {
    return (<div style={{ width: `100%`, height: `100vh`, justifyContent: 'center', alignItems: 'center', display: 'flex' }}><Spin /></div>)
  }

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
            <Space>
              <Button
                type="primary"
                size="large"
                onClick={handleUpdate}>
                Save Changes
              </Button>
              <Button
                type="primary"
                size="large"
                onClick={property.isDraft ? handlePublish : handleDraft}>
                {property.isDraft ? 'Publish' : 'Set To Draft'}
              </Button>

            </Space>
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




//
// <div style={{ maxWidth: 1024, margin: '0px auto' }}>
//   <Title>{property.heading}</Title>
// </div>
// <div style={{ marginTop: 50, paddingTop: 20 }}>
//   <Form
//     initialValues={property}
//     onFinish={handleFinish}
//     onValuesChange={handleChanged}
//     layout="vertical"
//     size="large">
//
//
//
//     <Collapse ghost expandIconPosition="right" className="editor">
//       <Panel header="Heading">
//         <Form.Item name="heading" label="Title">
//           <Input.TextArea />
//         </Form.Item>
//       </Panel>
//       <Panel header="Business Information">
//         <Form.Item name="name" label="Business Name">
//           <Input />
//         </Form.Item>
//         <Form.Item name="location" label="Location">
//           <Input />
//         </Form.Item>
//         <Form.Item name="phone" label="Phone Number">
//           <Input />
//         </Form.Item>
//         <Form.Item name="description" label="Description">
//           <Input.TextArea />
//         </Form.Item>
//       </Panel>
//       <Panel header="Pricing">
//         <Form.Item name="cost" label="Starting at">
//           <InputNumber
//             block
//             style={{ width: '100%' }}
//             formatter={value => `$ ${parseFloat(value).toFixed(2)}`}
//             />
//         </Form.Item>
//       </Panel>
//       <Panel header="Images">
//         <PhotosEditor />
//       </Panel>
//       <Panel header="Community Types">
//         <CaresEditor
//           selected={property.typesOfCare}
//           onComplete={typesOfCare => setProperty({ ...property, typesOfCare })}
//           />
//       </Panel>
//       <Panel header="Room Type">
//         <RoomsEditor
//           selected={property.roomTypes}
//           onComplete={roomTypes => setProperty({ ...property, roomTypes })}
//           />
//       </Panel>
//       <Panel header="Amenities">
//         <AmenitiesEditor
//           selected={property.amenities}
//           onComplete={amenities => setProperty({ ...property, amenities })}
//           />
//       </Panel>
//       <Panel header="Testimonials">
//         <TestimonialsEditor />
//       </Panel>
//     </Collapse>
//   </Form>
// </div>


export default AccountPropertyDashboard
