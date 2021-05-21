import { useState, useEffect } from 'react';
import { Row, Col, Card, Button, Spin, Typography } from 'antd';
import Router from 'next/router';
import PrivateLayout from '../../layouts/PrivateLayout';
import Container from '../../components/Container';

import useGlobal from '../../hooks/useGlobal';

import styles from './Account.module.css';

const { Title } = Typography

const PropertyCard = ({ row }) => (
  <Col key={row._id} xs={24} md={12} lg={8} style={{ marginBottom: 20 }}  onClick={() => Router.push(`/account/property/${row._id}`)}>
    <Card className={styles.cardProperty} style={{ overflow: 'hidden', minHeight: 200, borderRadius: 10, backgroundImage: `url('${row.featPhoto}')`, backgroundSize: `cover`}}>
      <div className={styles.cardOverlay} />
      <div className={styles.cardContent}>
        <Title level={3} className={styles.cardTitle}>{row.name}</Title>
        <Title level={5} className={styles.cardText}>Location {row.location}</Title>
        <Button type="primary" onClick={() => Router.push(`/account/property/${row._id}`)}>View Property</Button>
      </div>
    </Card>
  </Col>
)

function AccountProperties({ properties = [] }) {
  const [appState, actions] = useGlobal(['listings'])
  const [rows, setRows] = useState(properties)
  const [loading, setLoading] = useState(false)
  const [filters, setFilters] = useState({})

  useEffect(() => {
    getListings()
  }, [])

  const getListings = async() => {
    setLoading(true)
    const reply = await actions.getAccountProperties(filters)
    if (reply.status) {
      setRows(reply.properties)
    }
    setLoading(false)
  }

  return (
    <PrivateLayout
      sidebar={false}
      title="pick a property">
      <Spin spinning={loading}>
        <Container>
          <Row gutter={20} style={{ marginTop: 30, marginBottom: 100 }}>
            {rows.map(row => <PropertyCard row={row} />)}
            <Col xs={24} md={12} lg={8} onClick={() => Router.push('/account/property/add')}>
              <Card className={styles.card}>
                <Title level={3}>Add New Property</Title>
              </Card>
            </Col>
          </Row>
        </Container>
      </Spin>
    </PrivateLayout>
  )
}

export default AccountProperties
