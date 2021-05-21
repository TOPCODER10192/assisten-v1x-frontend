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
            <blockquote>
              <p>
                “It was last August when I found myself visiting with mom’s doctor. He told me mom was doing well but was concerned about her current living situation. After the conversation, I knew it was time to find mom a senior living community. At that moment I experienced an overwhelming amount of emotions. Mostly i felt guilty because I believed it was my responsibility to care for my mom, however, I quickly realized I didn’t have the time nor the ability to do so.
              </p>
              <p>
                “I was frustrated with myself for not planning, as I knew this day might come but I didn’t think it would be so soon. I was scared for what was ahead but nothing prepared me for how overwhelming the next steps would be.
              </p>
              <p>
                “After learning more about my mom's care needs I started searching for the right living option. I quickly found there were many roadblocks preventing me from finding the right place.
              </p>
              <p>
                “I began online and thought I had found some promising websites that could help. It wasn’t long before I realized each one was just trying to collect my personal information and sell it to facilities, most of which I had no interest in whatsoever.
              </p>
              <p>
                “As I continued looking I found a placement agency that said they could help. I was excited I could speak to someone knowledgeable about the options near me. However, after doing more research I learned the agency was only contracted with a handful of facilities in my area. I was worried they would limit my options and only show me places that would benefit them the most. With these feelings of concern, I decided to move on and do it myself. After all, no one knows my mom better than me and I knew I would be the one to find the right place for her.”
              </p>
            </blockquote>
            <p>
              After hearing this story and so many others like it, we knew something needed to be done. We gathered together a team of senior living experts from all sides of the industry to create the ultimate senior living resource.
            </p>
            <p>
              At Assisten we connect you to senior living communities you’re interested in and you decide who to call and when. We believe that you should be in control of this process, after all, you know your loved one best.
            </p>
            <p>
              We allow you to browse senior living options without the headache of unwanted marketers and solicitors.
            </p>
            <p>
              We give you the tools to educate yourself, helping you make smart decisions based on your specific needs.
            </p>
            <p>
              In order to truly simplify your senior living search, we give YOU the control by making it SIMPLE, SAFE, and FREE.
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
