import { orderdetail_sucess, orderdetail_fail } from '../types'
import axios from 'axios'
export const OrderAction = (order) => async dispatch => {
    console.log(order)
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const { data } = await axios.post('/api/order', order, config)
        console.log(data)
        dispatch({
            type: orderdetail_sucess,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: orderdetail_fail,
            payload: error
        })
    }
}