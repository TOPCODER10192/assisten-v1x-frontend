import { useState, useEffect } from 'react';
import {
  Form, Input, Checkbox, Button, Space, Upload,
  Row, Col, Typography, message, Drawer, Rate
} from 'antd';
import { careList, roomList, amenityList } from '../../constants';
import { LoadingOutlined, PlusOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import fill from 'lodash/fill';
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';

dayjs.extend(advancedFormat)

const { TextArea } = Input
const { Text } = Typography

import useGlobal from '../../hooks/useGlobal';

const getBase64 = (file, callback) => {
  try {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.addEventListener('load', (evt) => resolve(reader.result, evt))
      reader.addEventListener('error', (evt) => reject(evt))
      reader.readAsDataURL(file)
    })
  } catch (e) {
    console.log("ERROR", e)
  }
}

function beforeUpload(file) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'

  if (!isJpgOrPng) {
    message.error('You can only upload jpeg/png file!')
  }

  const isLt2M = file.size / 1024 / 1024 < 2;

  if (!isLt2M) {
    message.error('Photo must be smaller than 2mb')
  }

  return isJpgOrPng && isLt2M
}

export const PhotoUpload = ({ src = false, onComplete, style }) => {
  const [loading, setLoading] = useState(false)

  const handleBefore = async(file) => {
    const ext = file.name.split('.')[1]
    const name = dayjs().format('x')
    const result = await getBase64(file)
    onComplete && onComplete(result.split(';base64,')[1], `${name}.${ext}`)
    return false
  }

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  )

  return (
    <Upload
      style
      name="upload"
      accept="image/png, image/jpeg"
      listType="picture-card"
      className="photo-uploader"
      showUploadList={false}
      data={{ name }}
      beforeUpload={handleBefore}>
      {
        src
        ? <img src={src} alt="avatar" style={{ width: '100%', height: `100%`, objectFit: `cover`, objectPosition: `top center` }} />
        : uploadButton
      }
    </Upload>
  )
}

const photosState = [
  'http://placehold.it/50x50',
  'http://placehold.it/50x50',
  'http://placehold.it/50x50',
  'http://placehold.it/50x50',
]

export const PhotosEditor = ({ featPhoto = '', photos = [], onPhotoComplete, onFeatComplete }) => {
  return (
    <div>
      <Row gutter={10}>
        <Col xs={24}>
          <PhotoUpload
            src={featPhoto != '' ? featPhoto : 'http://placehold.it/50x50'} onComplete={onFeatComplete} />
        </Col>
        {
          photosState.map((p, index) => (
            <Col xs={12} key={`photo-upload-${index}`}>
              <PhotoUpload src={photos.length > index ? photos[index] : p} onComplete={onPhotoComplete} />
            </Col>
          ))
        }
      </Row>
    </div>
  )
}

export const CaresEditor = ({ onComplete, selected = [] }) => {
  const [selects, setSelects] = useState(selected.reduce((obj, item) => ({ ...obj, [item]: true }),{}))

  const handleChanged = (e) => {
    const newCares = { ...selects, [e.target.name]: e.target.checked }
    setSelects(newCares)
    const typesOfCare = Object.keys(newCares).filter(name => newCares[name] === true)
    onComplete && onComplete(typesOfCare)
  }

  return (
    <div>
      {
        Object.keys(careList).map(key => (
          <div key={key}>
            <Checkbox
              name={key}
              checked={(selected || []).indexOf(key) > -1}
              onChange={handleChanged}>
              {careList[key].label}
            </Checkbox>
          </div>
        ))
      }
    </div>
  )
}

export const RoomsEditor = ({ onComplete, selected = [] }) => {
  const [selects, setSelects] = useState(selected.reduce((obj, item) => ({ ...obj, [item]: true }),{}))

  const handleChanged = (e) => {
    const newValues = { ...selects, [e.target.name]: e.target.checked }
    setSelects(newValues)
    onComplete && onComplete(Object.keys(newValues).filter(name => newValues[name] === true))
  }

  return (
    <div>
      {
        Object.keys(roomList).map(key => (
          <div>
            <Checkbox
              name={key}
              key={key}
              checked={(selected || []).indexOf(key) > -1}
              onChange={handleChanged}>
              {roomList[key].label}
            </Checkbox>
          </div>
        ))
      }
    </div>
  )
}

export const AmenitiesEditor = ({ onComplete, selected = [] }) => {
  const [selects, setSelects] = useState(selected.reduce((obj, item) => ({ ...obj, [item]: true }),{}))

  const handleChanged = (e) => {
    const newValues = { ...selects, [e.target.name]: e.target.checked }
    setSelects(newValues)
    onComplete && onComplete(Object.keys(newValues).filter(name => newValues[name] === true))
  }

  return (
    <div>
      {
        Object.keys(amenityList).map(key => (
          <div>
            <Checkbox
              name={key}
              key={key}
              checked={(selected || []).indexOf(key) > -1}
              onChange={handleChanged}>
              {amenityList[key].label}
            </Checkbox>
          </div>
        ))
      }
    </div>
  )
}

export const Checklist = ({ options = [], onComplete, selected = [] }) => {
  const [selects, setSelects] = useState(selected.reduce((obj, item) => ({ ...obj, [item]: true }),{}))

  const handleChanged = (e) => {
    const newValues = { ...selects, [e.target.name]: e.target.checked }
    setSelects(newValues)
    onComplete && onComplete(Object.keys(newValues).filter(name => newValues[name] === true))
  }

  return (
    <div>
      {
        options.map(opt => (
          <div key={opt.slug}>
            <Checkbox
              name={opt.slug}
              checked={(selected || []).indexOf(opt.slug) > -1}
              onChange={handleChanged}>
              {opt.name}
            </Checkbox>
          </div>
        ))
      }
    </div>
  )
}

export const TestimonyForm = ({ testimony, onComplete }) => {
  const [form] = Form.useForm()

  useEffect(() => {
    form.resetFields()
  }, [testimony])

  const handleChanged = async(data) => {
    const ext = data.file.name.split('.')[1]
    const name = dayjs().format('x')
    if (data.file.status == 'done') {
      const result = await getBase64(data.file.originFileObj)
      const base64 = result.split(';base64,')[1]
      const name = `${name}.${ext}`
    }
  }

  const handleFinish = (values) => {
    onComplete && onComplete(values)
  }

  return (
    <Form
      form={form}
      onFinish={handleFinish}
      initialValues={testimony}
      layout="vertical"
      >
      <Upload
        accept="image/png, image/jpeg"
        listType="picture-card"
        onChange={handleChanged}>
        {testimony.photo ? <img src={testimony.photo} alt="avatar" style={{ width: '100%' }} /> : `Upload`}
      </Upload>
      <Form.Item name="name" label="Name">
        <Input placeholder="Name" />
      </Form.Item>
      <Form.Item name="message" label="Testimony">
        <TextArea placeholder="Testimony" />
      </Form.Item>
      <Form.Item name="rate" label="Rating">
        <Rate />
      </Form.Item>
      <Form.Item>
        <Button htmlType="submit" type="primary">Update</Button>
      </Form.Item>
    </Form>
  )
}

const messageState = {
  name: 'John Doe',
  message: 'Great Day!',
  rate: 5,
  photo: 'http://placehold.it/100x100'
}

const testimonyItemStyle = {
  display: `flex`,
  justifyContent: `space-between`,
  borderBottom: `1px solid #eee`,
  paddingBottom: 10,
  marginBottom: 10
}

export const TestimonialsEditor = ({ data = [], onComplete }) => {
  const [messages, setMessages] = useState(data)
  const [message, setMessage] = useState({})
  const [index, setIndex] = useState(0)
  const [modal, showModal] = useState(false)
  const [counter, setCounter] = useState(1)

  // useEffect(() => {
  //   setMessages([...data, ])
  // }, [data])

  const addItem = () => {
    setMessages([...messages, messageState])
  }

  const handleEdit = (message, mIndex) => {
    showModal(true)
    setMessage(message)
    setIndex(mIndex)
  }

  const updateItem = (values) => {
    let newMessages = messages
    newMessages[index] = { ...newMessages[index], ...values }
    setMessages(newMessages)
    onComplete && onComplete(newMessages)
    showModal(false)
  }

  const removeItem = (index) => {
    setMessages(messages.filter((m, mIndex) => mIndex != index))
  }

  return (
    <div>
      <Drawer
        title="Edit Testimony"
        placement="right"
        closable={true}
        width={300}
        onClose={() => showModal(false)}
        visible={modal}
        >
        <TestimonyForm
          testimony={message}
          onComplete={updateItem}
          />
      </Drawer>
      <div style={{ textAlign: `right`, marginBottom: 10 }}>
        <Button onClick={addItem} type="primary" size="small">Add</Button>
      </div>
      {
        messages.map((message, mIndex) =>
          <div key={`${message.name} ${mIndex}`}>
            <Text><b>Featured Testimonial {mIndex + 1}</b></Text>
            <div style={testimonyItemStyle}>
              <span>{message.name}</span>
              <Space>
                <Button icon={<DeleteOutlined />} size="small" danger onClick={() => removeItem(mIndex)} />
                <Button icon={<EditOutlined />} size="small" onClick={() => handleEdit(message, mIndex)} />
              </Space>
            </div>
          </div>
        )
      }
    </div>
  )
}
