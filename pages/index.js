import { useState, useEffect } from 'react';
import Head from 'next/head'
import Router from 'next/router';
import { Input, Row, Col, Button, Space, Typography, Carousel } from 'antd';
import ReactPlayer from 'react-player/youtube';

import PublicLayout from '../layouts/PublicLayout';
import styles from './Index.module.css';
import { careList } from '../constants';
import useScroll from '../hooks/useScroll';

const { Title, Text } = Typography

const cities = [
  { name: 'New York City, NY', text: '42 communities' },
  { name: 'Las Vegas, NV', text: '18 communities' },
  { name: 'Sacramento, CA', text: '23 communities' },
  { name: 'Los Angeles, CA', text: '44 communities' },
  { name: 'Orlando, FL', text: '55 communities' },
  { name: 'San Antonio, TX', text: '19 communities' },
]

const partners = [
  { url: '', photo: '' },
]

const resources = [
  { id: 1, title: 'helpful resource/article/blog', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.' },
  { id: 2, title: 'helpful resource/article/blog', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.' },
  { id: 3, title: 'helpful resource/article/blog', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.' },
]

export default function Home() {
  const { scrollY, scrollX, scrollDirection } = useScroll()
  const [altHeader, setAltHeader] = useState(true)

  useEffect(() => {
    if (scrollY > 350) {
      setAltHeader(false)
    } else {
      setAltHeader(true)
    }
    console.log("SCROLL", scrollY, scrollDirection)
  }, [scrollY > 350])

  return (
    <PublicLayout headerProps={{ mode: 'basic', alt: altHeader }}>

      <section className={styles.hero}>
        <div className={styles.heroImage} />
        <div className={styles.heroOverlay} />
        <div className={styles.heroSearch}>
          <h1>Find Properties Now</h1>
          <Input.Search
            placeholder="Search property, city or ZIP code"
            className="border-none search"
            size="large"
            onPressEnter={event => Router.push({ pathname: '/listing', query: { search: event.target.value } })}
          />
        </div>
      </section>

      <section className={styles.assist}>
        <Row>
          <Col xs={24} md={10}>
            <div style={{ padding: `0px 20px 20px 20px` }}>
              <h2 className={styles.sectionTitle}>How Assisten Can Help</h2>
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
              <a href="tel:+18886894899" className={styles.actionLink}>
                +1.888.689.4899
              </a>
              <a href="support@assisten.com" className={styles.actionLink}>
                support@assisten.com
              </a>
            </div>
          </Col>
          <Col xs={24} md={14} align="center" justify="center">
            <div style={{ padding: 20 }}>
              <ReactPlayer url="https://www.youtube.com/watch?v=RLSOnwTjgDY" width={`100%`} />
            </div>
          </Col>
        </Row>
      </section>

      <section className={styles.services}>
        <h2>learn about the community types available</h2>
        <p className={styles.serviceText}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam quis viverra justo, id varius velit. Fusce aliquam elit at tortor sodales, in hendrerit eros sodales. Proin a massa et risus sodales vehicula
        </p>
        <Row justify="center">
          {
            Object.keys(careList).map(care =>
              <Col xs={24} md={8} key={care} style={{ padding: 10, paddingBottom: 0 }}>
                <div className={styles.serviceCard}>
                  <img src={careList[care].bg} className={styles.serviceCardBackground} />
                  <div className={styles.serviceCardOverlay} />
                  <h3>{careList[care].label}</h3>
                </div>
              </Col>
            )
          }
        </Row>
      </section>

    </PublicLayout>
  )
}


//            <img src="http://placehold.it/500x300" width="100%" />
// <section className={styles.partners}>
//
//
// </section>
//
// <section className={styles.resources}>
//   <Row gutter={40}>
//     {
//       resources.map(resource => (
//         <Col md={8} key={resource.id}>
//           <img src="http://placehold.it/500x300" style={{ width: '100%', marginBottom: 10 }} />
//           <div style={{ minHeight: 200 }}>
//             <Title level={5}>{resource.title}</Title>
//             <Text>{resource.content}</Text>
//           </div>
//         </Col>
//       ))
//     }
//   </Row>
// </section>
//
//
// <section className={styles.cities}>
//
//   <div style={{ textAlign: 'center', margin: '0px auto', maxWidth: 600, marginBottom: 30 }}>
//     <Title level={3}>Most searched cities</Title>
//     <Text>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto</Text>
//   </div>
//
//   <Row gutter={20}>
//     {
//       cities.map((city, cityId) => (
//         <Col key={`cities-${cityId}`} md={8} style={{ marginBottom: 20 }}>
//           <div style={{ minHeight: 160, background: `url('http://placehold.it/500x300')` }}>
//             <Title level={5}>{city.title}</Title>
//             <Text>{city.content}</Text>
//           </div>
//         </Col>
//       ))
//     }
//   </Row>
// </section>
//
// <section className={styles.helpbar}>
//   <h2>could we help you with anything else?</h2>
//   <Space>
//     <Button type="primary">Request More Information</Button>
//     <Button>Contact Hosts</Button>
//   </Space>
// </section>


// <section className={styles.testimonies}>
//   <Carousel dots={false} centerMode arrows slidesToShow={1} swipeToSlide swipe style={{ maxWidth: 500, margin: `0px auto` }}>
//     <div className={styles.carouselItem}>
//       <div>
//         <p>Mattis ullamcorper velit sed ullamcorper. Lacinia at quis risus sed vulputate. Mi sit amet mauris commodo quis imperdiet massa tincidunt. Convallis posuere morbi leo urna molestie at. Vivamus arcu felis bibendum ut. </p>
//         <h3>- Steve Rogers</h3>
//       </div>
//     </div>
//     <div className={styles.carouselItem}>
//       <div>
//         <p>Mattis ullamcorper velit sed ullamcorper. Lacinia at quis risus sed vulputate. Mi sit amet mauris commodo quis imperdiet massa tincidunt. Convallis posuere morbi leo urna molestie at. Vivamus arcu felis bibendum ut. </p>
//         <h3>- Steve Rogers</h3>
//       </div>
//     </div>
//     <div className={styles.carouselItem}>
//       <div>
//         <p>Mattis ullamcorper velit sed ullamcorper. Lacinia at quis risus sed vulputate. Mi sit amet mauris commodo quis imperdiet massa tincidunt. Convallis posuere morbi leo urna molestie at. Vivamus arcu felis bibendum ut. </p>
//         <h3>- Steve Rogers</h3>
//       </div>
//     </div>
//     <div className={styles.carouselItem}>
//       <div>
//         <p>Mattis ullamcorper velit sed ullamcorper. Lacinia at quis risus sed vulputate. Mi sit amet mauris commodo quis imperdiet massa tincidunt. Convallis posuere morbi leo urna molestie at. Vivamus arcu felis bibendum ut. </p>
//         <h3>- Steve Rogers</h3>
//       </div>
//     </div>
//   </Carousel>
//
// </section>
