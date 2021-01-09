import { OrderList_sucess, OrderList_fail, orderdetail_fail } from '../types'
import axios from 'axios'
export const OrderListAction = () => async dispatch => {
    try {
        const { data } = await axios.get('/api/order')
        dispatch({
            type: OrderList_sucess,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: orderdetail_fail,
            payload: error
        })
    }
}