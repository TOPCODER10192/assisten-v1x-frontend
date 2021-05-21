import { useState, useCallback, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Input, Row, Col, Button, Space, Affix } from 'antd';
import styles from './PropertyCard.module.css';

const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1)

const PropertyCard = ({ property, selected = false, imageHash }) => (
  <div className={`${styles.propertyCard} ${selected && styles.active}`} id={property._id}>
    <Link href={{ pathname: '/facility/[slug]', query: { slug: `${property.slug}-${property._id}` } }}>
      <Row>
        <Col flex="360px">
          { property.featPhoto.length > 0 && <img src={`${property.featPhoto}?${imageHash}`} width={360} height={220} className={styles.featPhoto} /> }
          { property.featPhoto.length < 1 && <img src={'http://placehold.it/100x100'} width={360} height={220} className={styles.featPhoto} /> }
        </Col>
        <Col flex="auto">
          <div className={styles.propertyInfo}>
            <h1 className={styles.title}>{property.heading}</h1>
            <h2 className={styles.name}>{property.name}</h2>

            <Row gutter={10}>
              <Col xs={24} sm={12} className={styles.info}>
                <h5>Community Types:</h5>
                <span className={styles.cares}>{property.typesOfCare.join(' • ')}</span>
                <h5 className={styles.midColHeading}>Room Type:</h5>
                <span className={styles.rooms}>{property.roomTypes.join(' • ')}</span>
              </Col>
              <Col xs={24} sm={12} className={styles.info}>
                <h5>Amenities:</h5>
                <span className={styles.amenities}>{property.amenities.slice(0, 4).map(amenity => <img key={amenity.slug} src={`/icon/${amenity}.svg`} width={25} height={25} />)}</span>
              </Col>
            </Row>
            <h4>Starting at <b className={styles.cost}>${property.cost}</b> per month</h4>
          </div>
        </Col>
      </Row>
    </Link>
  </div>
)

export default PropertyCard
