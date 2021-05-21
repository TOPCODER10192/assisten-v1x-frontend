import React from 'react';
import 'antd/dist/antd.css';

export default function PublicLayout({ headerProps, children }) {
  return (
    <div>
      <section style={{ minHeight: '100vh' }}>
        { children }
      </section>
    </div>
  )
}
