import React from 'react';
import Link from 'next/link';
import { Row, Col, Typography, Input } from 'antd';
import styles from './Footer.module.css';

const { Title, Text } = Typography;

const Links = ({ links = [] }) => links.map(l => (
  <Link key={l.key} href={l.href}>
    <a className={styles.link}>{l.label}</a>
  </Link>
))


export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>

        <Row className={styles.lists}>
          <Col xs={24} sm={12} md={6} className={styles.links}>
            <Title level={5}>Assisten</Title>
            <Links
              links={[
                { key: 'about', label: 'About Assisten', href: '/about' },
                { key: 'faq', label: 'FAQ', href: '/faq' },
                { key: 'contact', label: 'Contact Us', href: '/contact-us' },
                { key: 'team', label: 'Our Team', href: '/team' },
                { key: 'partner', label: 'Partners', href: '/partners' },
              ]}
              />
          </Col>
          <Col xs={24} sm={12} md={6} className={styles.links}>
            <Title level={5}>Cities</Title>
            <Links
              links={[
                { key: 'york', label: 'New York, NY', href: '/cities/new-york' },
                { key: 'vegas', label: 'Las Vegas, NV', href: '/cities/las-vegas' },
                { key: 'sac', label: 'Sacramento, CA', href: '/cities/sacramento' },
                { key: 'la', label: 'Los Angeles, CA', href: '/cities/los-angeles' },
                { key: 'florida', label: 'Orlando, FL', href: '/cities/orlando' },
                { key: 'texas', label: 'San Antonio, TX', href: '/cities/san-antonio' },
              ]}
              />
          </Col>
          <Col xs={24} sm={12} md={6} className={styles.links}>
            <Title level={5}>Social</Title>
            <Links
              links={[
                { key: 'fb', label: 'Facebook', href: 'https://facebook.com/assisten' },
                { key: 'tw', label: 'Twitter', href: 'https://twitter.com/assisten' },
                { key: 'ln', label: 'LinkedIn', href: 'https://linkedin.com/assisten' },
              ]}
              />
          </Col>
          <Col xs={24} sm={12} md={6}  className={styles.links}>
            <Title level={5}>Resources</Title>
            <Links
              links={[
                { key: 'help', label: 'Help', href: '/help' },
                { key: 'blog', label: 'Blog', href: '/blog' },
                { key: 'hosting', label: 'Host your Facility', href: '/host-your-facility' },
              ]}
              />
          </Col>
        </Row>
        <div className={styles.text}>
          @Copyright Assisten 2020
        </div>
      </div>
    </footer>
  )
}
