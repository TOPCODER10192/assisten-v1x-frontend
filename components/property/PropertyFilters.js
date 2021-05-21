import { useState } from 'react';
import { DownOutlined } from '@ant-design/icons';
import { Form, Input, Select, Button, Row, Col, Popover, Dropdown, Slider, Menu, Space } from 'antd';

const { Option } = Select;

const sorters = [
  { value: 'popular', label: 'Most Popular' },
  { value: 'recent', label: 'Most Recent' },
  { value: 'price-desc', label: 'Price Lowest to Highest' },
  { value: 'price-asc', label: 'Price Highest to Lowest' }
]

const careTypes = [
  { value: 'independent', label: 'Independent Living' },
  { value: 'assisted', label: 'Assisted Living' },
  { value: 'inhome', label: 'In-Home Care' },
  { value: 'behavioral', label: 'Behavioral Care' },
  { value: 'memory', label: 'Memory Care' }
]

const roomTypes = [
  { value: 'studio', label: 'Studio' },
  { value: 'private', label: 'Private' },
  { value: 'shared', label: 'Shared' },
]

const PropertyFilters = ({ result = 1, total = 10, capability = [], onSearch, onFilters }) => {
  const [state, setState] = useState({
    tags: [],
    rooms: [],
    cares: [],
    search: '',
    sort: 'popular',
    order: 'asc',
    startcost: 20,
    endcost: 350,
  })

  const handleSearchEnter = (e) => {
    const filters = { ...state, search: e.target.value }
    console.log("SEARCH", filters)
    onSearch && onSearch({ search: e.target.value })
  }

  const handleOnChange = (name, value) => {
    const filters = { ...state, [name]: value }
    console.log("CHANGED FILTERS", filters)
    setState(filters)
    onSearch && onSearch(filters)
  }

  const priceMenu = (
    <Menu>
      <Slider range defaultValue={[state.startcost, state.endcost]} max={1000} min={0} />
    </Menu>
  )

  return (
    <Row gutter={12} style={{ height: 34 }}>
      <Col xs={24} md={5}>
        <Form.Item name="search">
          <Input.Search
            onPressEnter={handleSearchEnter}
            style={{ width: '100%', marginBottom: 10 }}
            placeholder="Address, city or ZIP code"
          />
        </Form.Item>
      </Col>
      <Col align="center" xs={24} md={4}>
        <Button
          type="text"
          style={{ marginBottom: 10 }}
          onClick={() => onFilters && onFilters()}>Showing {result} of {total} results
        </Button>
      </Col>
      <Col name="sort" xs={24} md={3}>
        <Select
          placeholder="Sort By"
          onChange={(value) => handleOnChange('sort', value)}
          showArrow
          style={{ width: '100%', marginBottom: 10 }}>
          {
            sorters.map(sort =>
              <Option
                key={sort.value}
                value={sort.value}>
                {sort.label}
              </Option>
            )
          }
        </Select>
      </Col>
      <Col md={3} xs={24}>
        <Dropdown
          overlay={priceMenu}
          trigger={['click']}>
          <Button
            style={{ width: '100%', textAlign: 'left', marginBottom: 10 }}
            className="custom">
            <span className="text">
              {state.startcost}-{state.endcost}
            </span>
            <DownOutlined />
          </Button>
        </Dropdown>
      </Col>
      <Col md={3} xs={24}>
        <Select
          showArrow
          placeholder="Community Types"
          mode="multiple"
          onChange={(values) => handleOnChange('cares', values)}
          style={{ width: '100%', marginBottom: 10 }}
        >
          {
            careTypes.map(care =>
              <Option
                key={care.value}
                value={care.value}>
                {care.label}
              </Option>
            )
          }
        </Select>
      </Col>
      <Col md={3} xs={24}>
        <Select
          showArrow
          placeholder="Capabilities"
          mode="multiple"
          onChange={(values) => handleOnChange('careCapables', values)}
          style={{ width: '100%', marginBottom: 10 }}
        >
          {
            capability.map(c =>
              <Option
                key={c._id}
                value={c._id}>
                {c.name}
              </Option>
            )
          }
        </Select>
      </Col>
      <Col md={3} xs={24}>
        <Select
          showArrow
          placeholder="Room Types"
          mode="multiple"
          onChange={(values) => handleOnChange('rooms', values)}
          style={{ width: '100%', marginBottom: 10 }}>
          {
            roomTypes.map(room =>
              <Option
                key={room.value}
                value={room.value}>
                {room.label}
              </Option>
            )
          }
        </Select>
      </Col>
    </Row>
  )
}

export default PropertyFilters
