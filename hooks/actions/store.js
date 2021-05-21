import { notification } from 'antd';
import localstore from 'store';

const actions = {
  saveState: async(store) => {
    localstore.set('@assisten', store.state)
    console.log("SAVED STATE")
  },
  clearState: async() => {

  }
}

export default actions
