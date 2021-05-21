import React from 'react';
import { Sparklines, SparklinesCurve } from 'react-sparklines';
import { Typography } from 'antd';

const { Title } = Typography;

const variants = {
  primary: '#3685B5',
  secondary: '#F7CC2E'
}

const StatCard = ({ title, value, data = [0, 50, 25, 75, 50], variant = 'primary', shadow = true }) => (
  <div className={ shadow ? 'stat-card' : 'stat-card no-shadow' }>
    <Title level={5}>{title}</Title>
    <Title>{value}</Title>
    <div className="chart">
      <Sparklines data={data} width={50} height={20}>
        <SparklinesCurve style={{ fill: 'none', strokeWidth: 1, stroke: Object.keys(variants).indexOf(variant) > -1 ? variants[variant] : variants['primary'] }} />
      </Sparklines>
    </div>
  </div>
)

export default StatCard
