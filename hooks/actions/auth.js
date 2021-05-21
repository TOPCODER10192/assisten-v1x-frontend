import { notification } from 'antd';
import Router from 'next/router';
import { request } from '../request';
import { API_URL } from '../../config';

const actions = {
  login: async(store, user) => {
    const reply = await request('POST', `${API_URL}/auth`, user)
    if (reply.status) {
      store.setState(
        { user: reply.user, token: reply.token, isLoggedIn: true },
        store.actions.saveState
      )
    }
    return reply
  },
  register: async() => {

  },
  logout: (store) => {
    store.setState({ isLoggedIn: false, user: false, token: false }, store.actions.saveState)
    Router.push('/login')
  },
  getAccount: async() => {

  },
  updateAccount: async() => {

  },
  changePassword: async() => {

  },
  logout: (store) => {
    store.setState(
      { isLoggedIn: false, user: false, token: false },
      store.actions.saveState
    )
  }
}

export default actions
