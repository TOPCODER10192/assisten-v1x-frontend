import { notification } from 'antd';
import { request } from '../request';
import { API_URL } from '../../config';

const actions = {
  // get public listing
  getListings: async(store, filters) => {
    return await request('GET', `${API_URL}/properties`, filters)
  },
  // send tour request for property
  createTour: async(store, propertyId, tour) => {
    return await request('POST', `${API_URL}/property/${propertyId}/tours`, tour)
  },
  // AUTHORIZED ACCESS ONLY
  getProperty: async(store, propertyId) => {
    return await request('GET', `${API_URL}/property/${propertyId}`, {})
  },
  getAccountProperties: async(store, filters) => {
    return await request('GET', `${API_URL}/account/properties`, filters, { Authorization: `Bearer ${store.state.token}` })
  },
  createProperty: async(store, property) => {
    return await request('POST', `${API_URL}/account/properties`, property, { Authorization: `Bearer ${store.state.token}` })
  },
  updateProperty: async(store, propertyId, property) => {
    return await request('POST', `${API_URL}/account/property/${propertyId}`, property, { Authorization: `Bearer ${store.state.token}` })
  },
  publishProperty: async(store, propertyId) => {
    return await request('POST', `${API_URL}/account/property/${propertyId}/publish`, {}, { Authorization: `Bearer ${store.state.token}` })
  },
  unpublishProperty: async(store, propertyId) => {
    return await request('POST', `${API_URL}/account/property/${propertyId}/unpublish`, {}, { Authorization: `Bearer ${store.state.token}` })
  },
  getTours: async(store, propertyId, filters) => {
    return await request('GET', `${API_URL}/account/property/${propertyId}/tours`, filters, { Authorization: `Bearer ${store.state.token}` })
  },
  getCalls: async(store, propertyId, filters) => {
    return await request('GET', `${API_URL}/account/property/${propertyId}/calls`, filters, { Authorization: `Bearer ${store.state.token}` })
  },
  uploadPropertyPhoto: async(store, upload, name) => {
    return await request('POST', `${API_URL}/account/upload/property`, { upload, name }, { Authorization: `Bearer ${store.state.token}` })
  },
  uploadAvatar: async(store, upload, name) => {
    return await request('POST', `${API_URL}/account/upload/avatar`, { upload, name }, { Authorization: `Bearer ${store.state.token}` })
  },
}

export default actions
