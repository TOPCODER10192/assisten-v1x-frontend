import React, { useState, useEffect, useMemo } from 'react';
import { Row, Col, Spin, Statistic, Collapse,
  Typography, Input, Form, InputNumber, Button, Table,
  Alert, Space
} from 'antd';
import { RightOutlined, AppstoreOutlined, EditOutlined, LeftOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';

import PrivateLayout from '../../../../layouts/PrivateLayout';
import PropertyPreview from '../../../../components/PropertyPreview';
import StatCard from '../../../../components/StatCard';
import useGlobal from '../../../../hooks/useGlobal';
import moment from 'moment';

const { Panel } = Collapse;
const { Title, Text } = Typography;


const dateFormat = "ddd, MMMM Do, YYYY"



// const latestCalls = [
//   { _id: 1, callerId: '333-423-2323', calledFrom: 'Rexburg ID', facilityCalled: 'Cambridge Court', date: '06-30-2022' },
//   { _id: 2, callerId: '356-145-3512', calledFrom: 'Salt Lake City UT', facilityCalled: 'Wennsyl Place', date: '06-30-2022' },
//   { _id: 3, callerId: '534-123-7799', calledFrom: 'Salt Lake City UT', facilityCalled: 'Wennsyl Place', date: '06-30-2022' },
//   { _id: 4, callerId: '276-134-5296', calledFrom: 'Pittsburg PA', facilityCalled: 'Cambridge Court', date: '06-30-2022' },
//   { _id: 5, callerId: '777-451-4544', calledFrom: 'Sacramento CA', facilityCalled: 'Modern Plaza', date: '06-30-2022' },
//   { _id: 6, callerId: '800-522-7544', calledFrom: 'Sacramento CA', facilityCalled: 'Modern Plaza', date: '06-30-2022' }
// ]

const latestCallColumns = [
  {
    title: 'Date',
    dataIndex: 'date',
    key: 'date',
  },
  {
    title: 'Caller Id',
    dataIndex: 'callerId',
    key: 'callerId',
  },
  {
    title: 'Called From',
    dataIndex: 'calledFrom',
    key: 'calledFrom',
  },
  {
    title: 'Facility Called',
    dataIndex: 'facilityCalled',
    key: 'facilityCalled',
  }
]

const tourColumns = [
  {
    title: 'First Name',
    dataIndex: 'firstname',
    key: 'firstname',
  },
  {
    title: 'Last Name',
    dataIndex: 'lastname',
    key: 'lastname',
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: 'Phone',
    dataIndex: 'phone',
    key: 'phone',
  },
  {
    title: 'Date',
    dataIndex: 'schedule',
    key: 'schedule',
    render: schedule => moment(schedule).format(dateFormat)
  }
]

function AccountPropertyDashboard({ setTitle, setSider, setHeader }) {
  const router = useRouter()
  const [appState, actions] = useGlobal(['isLoggedIn'])
  const [property, setProperty] = useState(false)
  const [changed, setChanged] = useState({})
  const [loading, setLoading] = useState(false)
  const [calls, setCalls] = useState([])
  const [tours, setTours] = useState([])

  useEffect(() => {
    if (router.query.id) {
      getProperty(router.query.id)
      getCalls(router.query.id)
      getTours(router.query.id)
    }
  }, [router.query.id])

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

  const getCalls = async(propertyId) => {
    setLoading(true)
    const reply = await actions.getCalls(propertyId)
    if (reply.status) {
      setCalls(reply.calls)
    }
    setLoading(false)
  }

  const getTours = async(propertyId) => {
    setLoading(true)
    const reply = await actions.getTours(propertyId)
    if (reply.status) {
      setTours(reply.tours)
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

  console.log("PROPERTY", property)


  return (
    <PrivateLayout
      title={`${property.name} Dashboard`}
      sider={sider}
      contentStyle={{ backgroundColor: 'white' }}
      >
    <div style={{ maxWidth: 1024, margin: '0px auto', paddingTop: 30, marginBottom: 100 }}>

      {
        property.isDraft && (
          <Row style={{ marginBottom: 20 }}>
            <Col xs={24}>
              <Alert
                message="Do you like to publish this property?"
                type="warning"
                showIcon
                action={
                  <Button size="small">
                    PUBLISH
                  </Button>
                }
                closable
              />
            </Col>
          </Row>
        )
      }

      <Row gutter={20}>
        <Col sm={24} md={12}>
          <StatCard title="Search Results" value={property.searches} />
        </Col>
        <Col sm={24} md={12}>
          <StatCard title="Page Visits" value={property.views} />
        </Col>
        <Col sm={24} md={12}>
          <StatCard title="Phone Calls" value={property.calls} />
        </Col>
        <Col sm={24} md={12}>
          <StatCard title="Form Submissions" value={property.tours} />
        </Col>
      </Row>

      <div className="card" style={{ marginBottom: 20 }}>
        <Row>
          <Col flex="auto" >
            <div style={{ marginBottom: 10 }}>
              <Title level={5}>Latest Calls</Title>
            </div>
          </Col>
          <Col>
            <Button type="link" onClick={() => router.push(`/account/property/${router.query.id}/report`)}>View More</Button>
          </Col>
        </Row>
        <Table
          pagination={false}
          rowKey={row => row._id}
          dataSource={calls}
          columns={latestCallColumns} />
      </div>


      <Row className="card">
        <Col flex="auto" >
          <div style={{ marginBottom: 10 }}>
            <Title level={5}>Latest Form Submissions</Title>
          </div>
          <Table
            pagination={false}
            rowKey={row => row._id}
            dataSource={tours}
            columns={tourColumns} />
        </Col>
      </Row>

    </div>
    </PrivateLayout>
  )
}

export default AccountPropertyDashboard
