import React from 'react';
import { Row, Col } from 'antd';

// const allPhotos = [
//   'http://placehold.it/100x100',
//   'http://placehold.it/100x100',
//   'http://placehold.it/100x100',
//   'http://placehold.it/100x100'
// ]

export const Thumbnails = ({ photos = [], selected = -1, onSelect }) => (
  <Row gutter={10} style={{ marginTop: 10 }}>
    {
      photos.map((p, index) =>
        <Col xs={6} key={`photo-${index}`} onClick={() => onSelect && onSelect(p, index)}>
          <img src={p} style={{ width: `100%`, height: `100%`, borderRadius: 4, cursor: `pointer`, objectFit: `cover` }} />
        </Col>
      )
    }
  </Row>
)

export default Thumbnails
