import React from 'react';
import { Button, Space, Avatar, Rate, Typography } from 'antd';

import { careList, roomList } from '../../constants';

const { Title, Paragraph, Text } = Typography

import PropertyMap from './PropertyMap';

import styles from '../Property.module.css';

import useGlobal from '../../hooks/useGlobal';

const useExtras = (name) => {
  const [state] = useGlobal(['extras'])
  return state.extras[name]
}

export const Care = ({ care }) => (
  <div className={styles.care}>
    <img src={care.photo} width={40} height={40} />
    {care.label}
  </div>
)

export const Amenity = ({ photo, label }) => (
  <div className={styles.care}>
    <img src={care.photo} width={40} height={40} />
    {care.label}
  </div>
)

export const Cares = ({ typesOfCare = [] }) => (
  <section className={styles.section}>
    <h5 className={styles.sectionTitle}>Community Types</h5>
    <div className={styles.cares}>
      {typesOfCare.map(care => <Care key={care} care={careList[care]} />)}
    </div>
  </section>
)

export const Rooms = ({ roomTypes = [] }) => {
  const roomList = useExtras('roomTypes')

  return (
    <section className={styles.section}>
      <h5 className={styles.sectionTitle}>Bed Types</h5>
      <ul>
        {
          roomList.filter(room => roomTypes.indexOf(room.slug) > -1).map(room => (
            <li key={room.slug}><Title level={5}>{room.name}</Title></li>
          ))
        }
      </ul>
    </section>
  )
}


export const Amenities = ({ amenities = [] }) => {
  const amenityList = useExtras('amenities')

  return (
    <section className={styles.section}>
      <h5 className={styles.sectionTitle}>Amenities</h5>
      <div className={styles.amenities}>
        {
          amenityList.filter(item => amenities.indexOf(item.slug) > -1).map(item => (
            <div key={item.slug} className={styles.amenity}>
              <img src={`/icon/${item.slug}.svg`} width={18} height={16} />
              {item.name}
            </div>
          ))
        }
      </div>
    </section>
  )
}

// {
//   amenities.map(amenity => (
//   ))
// }

export const CareCapables = ({ careCapables = [] }) => {
  const capableList = useExtras('careCapables')

  return (
    <section className={styles.section}>
      <h5 className={styles.sectionTitle}>Care Capabilities</h5>
      <div className={styles.amenities}>
        {
          capableList.filter(item => careCapables.indexOf(item.slug) > -1).map(item => (
            <div key={item.slug} className={styles.amenity}>
              {item.name}
            </div>
          ))
        }
      </div>
    </section>
  )
}

export const Location = ({ property }) => (
  <section className={styles.section}>
    <h5 className={styles.sectionTitle}>Location</h5>
    <div className={styles.location}>
      <PropertyMap markers={[property]} />
    </div>
  </section>
)

export const Testimonials = ({ testimonials = [] }) => (
  <section className={styles.section}>
    <h5 className={styles.sectionTitle}>Testimonials</h5>
    <ul className={styles.testimonials}>
      {testimonials.map((t, tKey) => (
        <li key={`testimonials-${tKey}`}>
          <div style={{ display: `flex`, alignItems: `center` }}>
            <Avatar size={64} src={t.photo} />
            <div style={{ flex: 1, marginLeft: 10 }}>
              <Title level={4} style={{ marginBottom: 0 }}>{t.name}</Title>
              <Text>{t.posted ? t.posted : 'Today'}</Text>
            </div>
            <Rate allowHalf value={t.rate} />
          </div>
          <Paragraph style={{ marginTop: 10 }}>{t.message}</Paragraph>
        </li>
      ))}

    </ul>
  </section>
)

// <li>
//   <Button type="primary">Show More</Button>
// </li>


export default {
  Amenities,
  Rooms,
  Cares,
  Location,
  CareCapables,
  Testimonials
}
