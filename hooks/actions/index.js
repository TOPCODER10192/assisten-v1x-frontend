import auth from './auth';
import property from './property';
import store from './store';
import app from './app';
import capabilities from './capabilities';

export default {
  ...app,
  ...auth,
  ...property,
  ...store,
  capabilities
}
