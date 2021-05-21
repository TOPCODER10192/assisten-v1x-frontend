import { request } from '../request'
import { API_URL } from '../../config';

const actions = {
    getAll: (store) => {
        store.setState({
            capability: {
                data: [],
                loading: true
            }
        })
        request('GET', `${API_URL}/capabilities`).then(data => {
            store.setState({
                capability: {
                    data,
                    loading: false
                }
            })
        }).catch(() => {
            store.setState({
                capability: {
                    data: [],
                    loading: false
                }
            })
        })
    }
}

export default actions
