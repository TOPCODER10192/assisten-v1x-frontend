import { notification } from 'antd';
import { request } from '../request';
import { API_URL } from '../../config';
import extras from './extras.json';

const actions = {
  getExtras: (store) => {
    console.log("EXTRAS", extras)
    store.setState({ extras }, store.actions.saveState)
  }
}

export default actions
