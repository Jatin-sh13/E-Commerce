import { ODAfterPlace_sucess, ODAfterPlace_fail } from '../types'
import axios from 'axios'
export const ODAfter = (id) => async dispatch => {
    try {
        const { data } = await axios.get(`/api/order/${id}`)
        dispatch({
            type: ODAfterPlace_sucess,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: ODAfterPlace_fail,
            payload: error
        })
    }
}