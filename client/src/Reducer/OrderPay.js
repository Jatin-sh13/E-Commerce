import { Pay_fail, Pay_sucess } from '../types'
const initialstate = {
    loading: true,
    Paydetails: null,
    sucess: false,
    error: null
}
export const PayReducer = (state = initialstate, action) => {
    const { type, payload } = action
    switch (type) {
        case Pay_sucess:
            return {
                loading: false,
                Paydetails: payload,
                sucess: true
            }
        case Pay_fail:
            return {
                loading: true,
                error: payload,
                sucess: false
            }
        default:
            return state
    }
}