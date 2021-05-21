import React from 'react';
import { Input } from 'antd';
import styles from './Section.module.css';

const SearchLight = () => (
  <section className={styles.contactbar}>
    <h2>lorem ipsum headline</h2>
    <div className={styles.contactSearch}>
      <Input.Search
        size="large"
        />
    </div>
    <div className={styles.contactText}>
      Vestibulum suscipit scelerisque arcu ac ultricies. Morbi eros lorem, euismod nec mattis sit amet, commodo nec justo. Aenean commodo tincidunt odio, eu tincidunt ante elementum at. Nam molestie tempor magna a posuere. Sed non molestie arcu. Duis egestas ultricies elit, in convallis enim luctus sed. Ut pretium, dolor eu tristique tempor, ligula lacus bibendum turpis, sit amet varius nunc risus et leo. Etiam vestibulum sapien non dolor rutrum ornare.
    </div>
  </section>
)

export default SearchLight
