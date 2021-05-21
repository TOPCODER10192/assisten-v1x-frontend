import { useState, useEffect } from 'react';
import { Row, Col, Card, Button, Typography } from 'antd';
import Router from 'next/router';
import PrivateLayout from '../../layouts/PrivateLayout';
import Container from '../../components/Container';

import useGlobal from '../../hooks/useGlobal';

const { Title } = Typography

const PropertyCard = ({ row }) => (
  <Col xs={24} md={12} lg={8} style={{ marginBottom: 20 }}>
    <Card style={{ minHeight: 200, borderRadius: 10, backgroundImage: `url('${row.featPhoto}')`}}>
      <div style={{ marginTop: 50 }}>{row.name}</div>
      <div style={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap', marginBottom: 10 }}>Location {row.location}</div>
      <Button type="primary" onClick={() => Router.push(`/admin/property/${row._id}`)}>View Property</Button>
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
    const reply = await actions.getListings(filters)
    console.log("GET LISTINGS", reply)
    if (reply.status) {
      setRows(reply.properties)
    }
    setLoading(false)
  }

  return (
    <div>

    </div>
  )
}

export default AccountProperties
