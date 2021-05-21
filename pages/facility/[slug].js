import { useState, useCallback, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Link from 'next/link';
import {
  Input, Select, Row, Col, Button, Space, Affix, Form,
  Divider, DatePicker, Breadcrumb, Spin, Anchor, Rate, Typography,
  message
} from 'antd';

const { Paragraph } = Typography

import { useMediaQuery } from 'react-responsive';

import PublicLayout from '../../layouts/PublicLayout';
import PropertyMap from '../../components/property/PropertyMap';
import Thumbnails from '../../components/property/Thumbnails';

import {
  Location, Testimonials, Cares,
  Amenities, Rooms, CareCapables
} from '../../components/property/Sections';
import TourForm from '../../components/property/TourForm';

import styles from './Facility.module.css';

import useGlobal from '../../hooks/useGlobal';

function Facility() {
  const [state, actions] = useGlobal(['isLoggedIn'])
  const [property, setProperty] = useState(false)
  const router = useRouter()
  const isMobile = useMediaQuery({ query: '(max-width: 760px)' })

  useEffect(() => {
    if (router.query.slug) {
      getProperty(router.query.slug)
    }
  }, [router.query.slug])

  const getProperty = async (slug) => {
    const id = slug.substr(slug.lastIndexOf('-') + 1)
    console.log("SLUG", slug, id)
    const reply = await actions.getProperty(id)
    console.log("RESULTS", reply)
    if (reply.status) {
      setProperty(reply.property)
    }
  }

  if (!property) {
    return (
      <PublicLayout headerProps={{ search: false }}>
        <Spin>
          <div style={{ width: `100%`, height: `100vh` }} />
        </Spin>
      </PublicLayout>
    )
  }

  return (
    <PublicLayout headerProps={{ search: false }}>
      <section className={styles.container}>

        <Breadcrumb separator=">">
          <Breadcrumb.Item>
            <Link href="/listing"><a>All Properties</a></Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>{property.name}</Breadcrumb.Item>
        </Breadcrumb>

        <div className={styles.desc}>
          <h1 className={styles.heading}><b>{property.heading}</b></h1>
          <Row>
            <Col className={styles.left} xs={24} md={15}>
              <div className={styles.featPhoto} style={{ backgroundImage: `url(${property.featPhoto})` }} />
              <Thumbnails photos={property.photos || []} onSelect={(featPhoto) => setProperty({ ...property, featPhoto })} />
            </Col>
            <Col className={styles.right} xs={24} md={9}>
              <h1 className={styles.name}>{property.name}</h1>
              <h5 className={styles.descTitle}>Property Description</h5>
              <Paragraph ellipsis={{ rows: 3, expandable: true, symbol: 'Read More' }}>
                {property.description}
              </Paragraph>

              <div className={styles.tour}>
                {
                  isMobile
                  ? <TourForm property={property} />
                  : (
                    <Affix className={styles.contact}>
                      <TourForm property={property} />
                    </Affix>
                  )
                }
              </div>

            </Col>
          </Row>
        </div>

        <div className={styles.sectionList}>
          <Rooms roomTypes={property.roomTypes} />
          <Cares typesOfCare={property.typesOfCare} />
          <Amenities amenities={property.amenities} />
          <CareCapables careCapables={property.careCapables} />
          <Location property={property} />
          {
            property.testimonials.length > 0 && (
              <Testimonials testimonials={property.testimonials} />
            )
          }
        </div>

      </section>

    </PublicLayout>
  )
}

// export async function getStaticPaths() {
//   const reply = await fetch('https://api.preview.assisten.com/v1/properties')
//   const result = await reply.json()
//   return {
//     paths: result.properties.map(p => ({ params: { slug: `${p.slug}-${p._id}` } })),
//     fallback: true
//   }
// }

// Facility.getInitialProps = async ({ query }) => {
//   if (query.slug) {
//     const id = query.slug.substr(query.slug.lastIndexOf('-') + 1)
//     const reply = await fetch(`https://api.preview.assisten.com/v1/property/${id}`)
//     const result = await reply.json()
//     return { property: result.status ? result.property : false }
//   }
//   return { property: false }
// }


// <Row align="center">
//   <Col xs={16}>
//     <h3>{property.name}</h3>
//   </Col>
//   <Col xs={8} align="end">
//     <span>Starting at</span>
//     <h3 className={styles.cost}>${parseFloat(property.cost)}</h3>
//   </Col>
// </Row>
// <Row align="center" justify="middle" style={{ marginTop: 20 }}>
//   <Col xs={8} style={{ textAlign: 'center' }}>
//     <div className={styles.agent} style={{ backgroundImage: `url("/photos/agent.jpeg")` }}/>
//   </Col>
//   <Col xs={16}>
//     <div className={styles.call}>
//       <h3 className={styles.phoneTitle}>Give Us A Call!</h3>
//       <a href={`tel:${property.phone}`}>
//         <h4 className={styles.phone}>{property.phone}</h4>
//       </a>
//     </div>
//   </Col>
// </Row>
// <Divider />

export default Facility
