import React from 'react';
import Head from 'next/head';
import Router from 'next/router';
import { Input, Row, Col, Button, Space, Divider, Collapse } from 'antd';

import PublicLayout from '../layouts/PublicLayout';
import styles from './Index.module.css';

const { Panel } = Collapse

export default function Home() {
  return (
    <PublicLayout headerProps={{ mode: 'basic' }}>
      <section className={styles.hero} style={{ minHeight: 400 }}>
        <div className={styles.heroImageAbout} />
        <div className={styles.heroOverlay} />
        <div className={styles.heroText}>
          <h1>About Us</h1>
        </div>
      </section>

      <section className={styles.history}>
        <h1>Company History</h1>
        <Row gutter={20}>
          <Col xs={14}>
            <img src="/photos/company-history.jpg" style={{ width: '100%' }} />
          </Col>
          <Col xs={10}>
            <p>
              Sed eu tortor varius, accumsan lorem et, dictum purus. In hac habitasse platea dictumst. Sed ullamcorper, lacus eu maximus feugiat, odio leo ullamcorper nibh, malesuada lobortis massa nisl vitae dui. Morbi tincidunt est a porta ultrices. Suspendisse vitae tincidunt nibh, sit amet semper odio. Duis laoreet a nibh vitae ultricies. Praesent condimentum quis diam nec mattis.
            </p>
            <p>
              Quisque vel gravida lacus. Phasellus vulputate iaculis erat, et iaculis libero convallis quis. Vestibulum quis diam facilisis, commodo ipsum nec, ultricies orci.
            </p>
          </Col>
        </Row>

        <Divider />

      </section>

      <section className={styles.stepsStarted}>
        <h1>steps to get you started</h1>
        <Row gutter={20}>
          <Col flex="auto">
            <div>
              1
            </div>
            
          </Col>
          <Col flex="auto">
            2
          </Col>
          <Col flex="auto">
            3
          </Col>
        </Row>
      </section>

      <section className={styles.faq}>
        <h1>steps to get you started</h1>
        <Row gutter={20}>
          <Col xs={10}>
            <Collapse ghost expandIconPosition="right">
              <Panel header="Question Number 1" key="1">
                <p>Cras tincidunt dui vel nulla auctor convallis. Maecenas pellentesque tristique dolor vitae faucibus. Praesent hendrerit sagittis gravida.</p>
              </Panel>
              <Panel header="Question Number 2" key="2">
                <p>Cras tincidunt dui vel nulla auctor convallis. Maecenas pellentesque tristique dolor vitae faucibus. Praesent hendrerit sagittis gravida.</p>
              </Panel>
              <Panel header="Question Number 3" key="3">
                <p>Cras tincidunt dui vel nulla auctor convallis. Maecenas pellentesque tristique dolor vitae faucibus. Praesent hendrerit sagittis gravida.</p>
              </Panel>
            </Collapse>
          </Col>
          <Col xs={14}>
            2
          </Col>
        </Row>
      </section>

    </PublicLayout>
  )
}
