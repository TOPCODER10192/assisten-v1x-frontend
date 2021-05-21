import React from 'react';
import 'antd/dist/antd.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function PublicLayout({ headerProps, children }) {
  return (
    <div>
      <Header {...headerProps} />
      <section style={{ minHeight: '100vh' }}>
        {children}
      </section>
      <Footer />
    </div>
  )
}
