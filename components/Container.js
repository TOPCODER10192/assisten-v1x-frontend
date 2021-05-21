import { Spin } from 'antd';
import styles from './Container.module.css';

export default function Container({ loading = false, maxWidth = 1280, children, ...rest }) {
  return (
    <Spin spinning={loading}>
      <div {...rest} style={{ maxWidth, margin: `0px auto`, ...rest.style }}>{children}</div>
    </Spin>
  )
}
