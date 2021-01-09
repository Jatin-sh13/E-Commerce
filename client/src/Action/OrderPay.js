import { Pay_fail, Pay_sucess } from '../types'
import axios from 'axios'
export const OrderPayAction = (orderid, paymentResult) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const { data } = await axios.put(`/api/order/${orderid}/pay`, paymentResult, config)
        dispatch({
            type: Pay_sucess,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: Pay_fail,
            payload: error
        })
    }
}