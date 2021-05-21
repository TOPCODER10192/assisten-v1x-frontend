import React, { useState, useEffect } from 'react';
import { Spin, Collapse, Typography, Input, Form, InputNumber, Button, Checkbox } from 'antd';
import { RightOutlined, AppstoreOutlined, EditOutlined, LeftOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';

import PrivateLayout from '../../../../layouts/PrivateLayout';
import PropertyPreview from '../../../../components/PropertyPreview';
import useGlobal from '../../../../hooks/useGlobal';

const { Panel } = Collapse;
const { Title, Text } = Typography;


function AccountPropertyReport() {
  const router = useRouter()
  const [appState, actions] = useGlobal(['isLoggedIn'])
  const [property, setProperty] = useState(false)
  const [changed, setChanged] = useState({})
  const [loading, setLoading] = useState(false)
  const [rooms, setRooms] = useState([])

  useEffect(() => {
    if (router.query.id) {
      getProperty(router.query.id)
    }
  }, [router.query.id])

  const getProperty = async(propertyId) => {
    setLoading(true)
    console.log("ROUTER", router.query)
    const reply = await actions.getProperty(propertyId)
    console.log("REPLY", reply)
    if (reply.status) {
      setProperty(reply.property)
    }
    setLoading(false)
  }

  const handleFinish = (values) => {
    setProperty(values)
  }
  const handleChanged = (values) => {
    setChanged(values)
    console.log("CHANGED", values)
  }

  if (!property) {
    return (<div style={{ width: `100%`, height: `100vh`, justifyContent: 'center', alignItems: 'center', display: 'flex' }}><Spin /></div>)
  }

  const sider = (
    <div style={{ marginTop: 50, paddingTop: 20 }}>
      <Button
        type="text"
        icon={<LeftOutlined />}
        onClick={() => router.push(`/account`)}
        style={{ display: 'flex', alignItems: 'center', fontSize: 16, height: 50 }}
        ghost block>
        Properties<span style={{ flex: 1 }} />
      </Button>
      <Button
        type="text"
        icon={<AppstoreOutlined />}
        onClick={() => router.push(`/account/property/${router.query.id}`)}
        style={{ display: 'flex', alignItems: 'center', fontSize: 16, height: 50, fontWeight: 'bold' }}
        ghost block>
        Dashboard<span style={{ flex: 1 }} /><RightOutlined />
      </Button>
      <Button
        type="text"
        icon={<EditOutlined />}
        onClick={() => router.push(`/account/property/${router.query.id}/edit`)}
        style={{ display: 'flex', alignItems: 'center', fontSize: 16, height: 50 }}
        ghost block>
        Editor<span style={{ flex: 1 }} /><RightOutlined />
      </Button>
    </div>
  )

  return (
    <PrivateLayout
      title="reporting"
      sider={sider}
      contentStyle={{ backgroundColor: 'white' }}
      >
      
    </PrivateLayout>
  )
}

export default AccountPropertyReport
