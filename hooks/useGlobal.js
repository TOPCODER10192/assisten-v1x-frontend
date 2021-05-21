import React from 'react';
import store from 'store';
import globalHook from './globalHook';
import actions from './actions';

const currentState = store.get('@assisten')
console.log("CURRENT STATE", currentState)

const initialState = {
  isLoggedIn: false,
  user: false,
  token: false,

  listings: [],
  listing: false,

  properties: [],
  property: false,

  capability: {
    loading: false,
    data: []
  },

  showSidebar: true,

  extras: {
    careCapables: [],
    roomTypes: [],
    careTypes: [],
    amenities: [],
  },

  ...currentState
}

const useGlobal = globalHook(React, initialState, actions)

export default useGlobal
