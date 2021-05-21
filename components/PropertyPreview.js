import { useState, useEffect } from 'react';
import {
  Form, Row, Col, Input, Button, DatePicker,
  Divider, Affix, Typography
} from 'antd';

import TourForm from './property/TourForm';
import { Location, Testimonials, Cares, Amenities, Rooms, CareCapables } from './property/Sections';
import Thumbnails from './property/Thumbnails';

const { Paragraph } = Typography

import styles from './PropertyPreview.module.css';


const ActiveField = ({ children, field, changed }) => (
  <div className={[field] in (changed || {}) ? styles.active : styles.inactive}>
    {children}
  </div>
)

const PropertyPreview = ({ property, changed, affix = true }) => {
  const [row, setRow] = useState(property)
  const [container, setContainer] = useState(null);
  const [changes, setChanges] = useState(changed)

  useEffect(() => {
    setRow(property)
  }, [property])

  useEffect(() => {
    setChanges(changed)
    setRow({ ...row, ...changed })
  }, [changed])

  return (
    <section className={styles.container} ref={setContainer}>
      <div className={styles.desc}>
        <ActiveField field="heading" changed={changed}>
          <h1 className={styles.heading}><b>{row.heading}</b></h1>
        </ActiveField>
        <Row>
          <Col className={styles.left} xs={24} md={15}>
            <div className={styles.featPhoto} style={{ backgroundImage: `url(${row.featPhoto})` }}/>
            <Thumbnails photos={row.photos || []} />
          </Col>
          <Col className={styles.right} xs={24} md={9}>
            <ActiveField field="name" changed={changed}>
              <h1 className={styles.name}>{row.name}</h1>
            </ActiveField>
            <h5 className={styles.descTitle}>Property Description</h5>
            <ActiveField field="description" changed={changed}>
              <Paragraph ellipsis={{ rows: 3, expandable: true, symbol: 'Read More' }}>
                {row.description}
              </Paragraph>
            </ActiveField>

            <div className={styles.tour}>
              {
                affix
                ? (
                  <Affix className={styles.contact}>
                    <TourForm property={property} />
                  </Affix>
                )
                : <TourForm property={property} />
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
        <Testimonials testimonials={property.testimonials} />
      </div>

    </section>

  )
}

export default PropertyPreview
