import { orderdetail_sucess, orderdetail_fail } from '../types'
const initialstate = {
    loading: true,
    orderdetail: null,
    error: null,
    sucess: false
}
export const orderReducer = (state = initialstate, action) => {
    const { type, payload } = action
    switch (type) {
        case orderdetail_sucess:
            return {
                loading: false,
                orderdetail: payload,
                sucess: true
            }
        case orderdetail_fail:
            return {
                loading: true,
                error: payload,
                sucess: false
            }
        default:
            return state
    }
}
