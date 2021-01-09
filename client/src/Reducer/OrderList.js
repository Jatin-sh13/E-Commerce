import { OrderList_sucess, OrderList_fail } from '../types'
const initialstate = {
    loading: true,
    OrderList: null,
    sucess: false,
    error: null
}
export const OrderListReducer = (state = initialstate, action) => {
    const { type, payload } = action
    switch (type) {
        case OrderList_sucess:
            return {
                loading: false,
                OrderList: payload,
                sucess: true
            }
        case OrderList_fail:
            return {
                loading: true,
                error: payload,
                sucess: false
            }
        default:
            return state
    }
}