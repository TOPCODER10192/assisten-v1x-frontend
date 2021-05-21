import { useState, useCallback, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Input, Row, Col, Button, Space, Affix, Spin, Modal, Typography } from 'antd';

import PublicLayout from '../layouts/PublicLayout';
import PropertyCard from '../components/property/PropertyCard';
import PropertyMap from '../components/property/PropertyMap';
import PropertyFilters from '../components/property/PropertyFilters';

import useGlobal from '../hooks/useGlobal';

import { useMediaQuery } from 'react-responsive';

import styles from './Listing.module.css';



const { Title, Text } = Typography;

const ButtonGroup = ({ name = '', options = [], value, onClick, style }) => {
  return (
    <div className={styles.buttonGroup}>
      {
        options.map(option =>
          <Button
            key={option.key}
            type={value === option.key && 'primary'}
            onClick={() => onClick && onClick(name, option)}
          >
            {option.label}
          </Button>
        )
      }
    </div>
  )
}

const YesNoGroup = ({ name = '', onClick, value = 0, nextStep = 0 }) => {
  return (
    <Space>
      <Button type={value === true && 'primary'} onClick={() => onClick && onClick(name, true, nextStep)}>Yes</Button>
      <Button type={value === false && 'primary'} onClick={() => onClick && onClick(name, false, nextStep)}>No</Button>
    </Space>
  )
}

const StepModal = ({ showing = 'Showing 1 of 10 results', current = 0, onClose, onComplete }) => {
  const [step, setStep] = useState(current)
  const [values, setValues] = useState({})
  const [finish, setFinish] = useState(false)

  const handleComplete = (newValues) => setValues(newValues)

  const handleFinish = () => {
    onComplete && onComplete(values)
    onClose && onClose()
  }

  const handleStepSingle = (name, option) => {
    const newValues = { ...values, [name]: option.key }
    setValues(newValues)
    setStep(option.step)
    handleComplete(newValues)
  }

  const handleStepMulti = (name, option) => {
    const newValues = { ...values, [name]: option.key, [option.key]: !values[option.key] }
    setValues(newValues)
    setStep(option.step)
    handleComplete(newValues)
  }

  const handleStepTruth = (name, value, step = -1, onComplete) => {
    const newValues = { ...values, [name]: value }
    setValues(newValues)
    if (step > -1) {
      setStep(step)
    } else {
      onComplete && onComplete(name, value)
    }
    handleComplete(newValues)
  }

  const handleLastStep = (name, option) => {
    const newValues = { ...values, [name]: option.key }
    setValues(newValues)
    setFinish(true)
    handleComplete(newValues)
  }

  const handlePrevious = () => {
    if (step > 0) {
      setStep(step - 1)
    }
  }

  const renderQuestion = () => {
    switch (step) {
      case 1:
        return (
          <div className={styles.questionContent}>
            <Title level={3}>Does your loved one have dementia?</Title>
            <YesNoGroup
              name="dimentia"
              onClick={handleStepTruth}
              value={values.dimentia}
              nextStep={2}
            />
          </div>
        )
        break;
      case 2:
        return (
          <div className={styles.questionContent}>
            <Title level={3}>Which does your loved one use?</Title>
            <ButtonGroup
              name="assistance"
              options={[
                { key: 'walker', label: 'Walker', step: 3 },
                { key: 'wheelchair', label: 'WheelChair', step: 3 },
                { key: 'cain', label: 'Cane', step: 3 },
                { key: 'walk', label: 'None', step: 3 },
              ]}
              value={values.assistance}
              onClick={handleStepMulti}
            />
          </div>
        )
        break;
      case 3:
        return (
          <div className={styles.questionContent}>
            <Title level={1}>Does your loved one need help with:</Title>
            <Title level={5}>Dressing?</Title>
            <YesNoGroup
              name="dressing"
              value={values.dressing}
              onClick={handleStepTruth}
              nextStep={-1}
            />
            <Title level={5}>Bathing?</Title>
            <YesNoGroup
              name="bathing"
              value={values.bathing}
              onClick={handleStepTruth}
              nextStep={-1}
            />
            <Title level={5}>Grooming?</Title>
            <YesNoGroup
              name="grooming"
              value={values.grooming}
              onClick={handleStepTruth}
              nextStep={4}
            />
          </div>
        )
        break;
      case 4:
        return (
          <div className={styles.questionContent}>
            <Title level={1}>Does you loved one need help with:</Title>
            <Title level={5}>Medication Management?</Title>
            <YesNoGroup
              name="medication"
              value={values.medication}
              onClick={handleStepTruth}
              nextStep={-1}
            />
            <Title level={5}>Incontinence Care?</Title>
            <YesNoGroup
              name="incontinence"
              value={values.incontinence}
              onClick={handleStepTruth}
              nextStep={5}
            />
          </div>
        )
        break;
      case 5:
        return (
          <div className={styles.questionContent}>
            <Title level={1}>How much does your loved one weigh?</Title>
            <Title level={5}>An estimate is great.</Title>
            <ButtonGroup
              name="weight"
              options={[
                { key: 100, label: '< 100 lbs', step: 6 },
                { key: 125, label: '100-125 lbs', step: 6 },
                { key: 150, label: '125-150 lbs', step: 6 },
                { key: 175, label: '125-175 lbs', step: 6 },
                { key: 200, label: '150-200 lbs', step: 6 },
                { key: 225, label: '200-225 lbs', step: 6 },
                { key: 250, label: '225-250 lbs', step: 6 },
                { key: 300, label: '> 250 lbs', step: 6 },
              ]}
              value={values.weight}
              style={{ justifyContent: 'center' }}
              onClick={handleLastStep}
            />
          </div>
        )
        break;
      default:
        return (
          <div className={styles.questionContent}>
            <Title level={1}>Which of these are you searching for?</Title>
            <ButtonGroup
              name="careType"
              options={[
                { key: 'independent', label: 'Independent Living', step: 1 },
                { key: 'assisted', label: 'Assisted Living', step: 1 },
                { key: 'inhome', label: 'In-Home Care', step: 1 },
                { key: 'memory', label: 'Behavioral Care', step: 1 },
                { key: 'behavioral', label: 'Memory Care', step: 1 }
              ]}
              value={values.careType}
              onClick={handleStepSingle}
            />
          </div>
        )
    }
  }

  return (
    <div>
      <Row style={{ marginTop: 10, marginBottom: 20 }} justify="middle">
        <Col xs={12}>
          {showing}
        </Col>
        <Col xs={12} align="right">
          <Button type="link" onClick={onClose}>
            Return to search results
          </Button>
        </Col>
      </Row>
      {renderQuestion()}
      <Row>
        <Col flex="auto">
          <Button type="link" onClick={handlePrevious}>
            Previous Question
          </Button>
        </Col>
        <Col flex="auto">
          {
            finish && <Button onClick={handleFinish} type="primary">Finish</Button>
          }
        </Col>
        <Col flex="auto" style={{ textAlign: 'right' }}>
          Question {step + 1} of 6
        </Col>
      </Row>
    </div>
  )
}

const useSearchQuery = () => {
  const [query, setQuery] = useState(false)

  useEffect(() => {
    const query = window.location.search.substring(1).split('&').reduce((obj, item) => {
      if (item.split('=')[0] != '') {
        obj[item.split('=')[0]] = item.split('=')[1]
      }
      return obj
    }, {})
    setQuery(query)
  }, [typeof window !== 'undefined'])

  return query
}

function Listing({ properties = [] }) {
  const [appState, actions] = useGlobal(['listings', 'extras', 'capability'])
  const [rows, setRows] = useState(properties)
  const [selected, setSelected] = useState(null)
  const [container, setContainer] = useState(null)
  const router = useRouter()
  const [filters, setFilters] = useState({ page: 1, limit: 20, search: '' })
  const [result, setResult] = useState({ total: 10 })
  const [loading, setLoading] = useState(false)
  const [modal, setModal] = useState(false)
  const isMobile = useMediaQuery({ query: '(max-width: 760px)' })
  const query = useSearchQuery()
  const [bar, showBar] = useState(true)
  const [imageHash, setImageHash] = useState(Date.now())

  useEffect(() => {
    actions.capabilities.getAll()
  }, [])

  useEffect(() => {
    showBar(!isMobile)
  }, [isMobile])

  useEffect(() => {
    setModal(true)
    if (query) {
      setFilters({ ...filters, ...query, ready: true })
      console.log("QUERY", query)
    }
  }, [query])

  useEffect(() => {
    if (filters.ready) {
      getListings(filters)
    }
  }, [filters])

  const getListings = async (filters) => {
    setLoading(true)
    actions.getExtras()
    const reply = await actions.getListings(filters)
    if (reply.status) {
      setRows(reply.properties)
      setResult({
        ...result,
        total: reply.total
      })
      setImageHash(Date.now())
    }
    setLoading(false)
  }

  const renderProperties = useCallback(() => rows.map(row =>
    <PropertyCard
      selected={row._id == selected}
      property={row}
      key={row._id}
      id={row._id}
      imageHash={imageHash}
    />
  ), [rows, selected])

  const handleMarkerClick = (e, marker, map) => {
    map.panTo({ lat: marker.address.point.coordinates[1], lng: marker.address.point.coordinates[0] })
    setSelected(marker._id)

    const el = document.getElementById(marker._id)
    window.scrollTo({
      behavior: el ? "smooth" : "auto",
      top: el ? el.offsetTop : 0
    })
  }

  const handleSearch = async (search) => {
    setFilters({ ...filters, ...search })
    // await getListings({ ...filters, ...search })
  }

  const filterBar = (
    <div style={{ paddingTop: 10 }}>
      <PropertyFilters
        capability={appState.capability.data}
        result={rows.length}
        total={result.total}
        onSearch={handleSearch}
        onFilters={() => setModal(true)} />
    </div>
  )

  const extras = (
    <div>

    </div>
  )

  return (
    <PublicLayout
      headerProps={{
        content: bar && filterBar,
        extras: extras,
        search: false
      }}
    >
      <Modal
        visible={modal}
        closable
        centered
        footer={null}
        onCancel={() => setModal(false)}
      >
        <StepModal
          showing={`Showing ${rows.length} of ${result.total} results`}
          onComplete={(tags) => setFilters({ ...filters, tags: Object.keys(tags).filter(t => tags[t] == true || tags[t] != '') })}
          onClose={() => setModal(false)} />
      </Modal>
      <Spin spinning={loading}>
        <Row style={{ marginBottom: 50 }}>
          <Col xs={24} md={15} xl={15} xxl={12} className={styles.properties}>
            {renderProperties()}
          </Col>
          {
            !isMobile && (
              <Col xs={0} md={9} xl={9} xxl={12}>
                <div ref={setContainer} className={styles.map}>
                  <PropertyMap
                    markers={rows}
                    onMarkerClick={handleMarkerClick}
                    selected={selected}
                  />
                </div>
              </Col>
            )
          }
        </Row>
      </Spin>
    </PublicLayout>
  )
}

// export async function getStaticProps(ctx) {
//
//   const reply = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/properties`)
//   const result = await reply.json()
//
//   let properties = []
//   if (result.status) {
//     properties = result.properties
//   }
//
//   return {
//     props: {
//       properties,
//     }
//   }
// }

export default Listing
