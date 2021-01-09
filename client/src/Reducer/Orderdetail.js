//reducer for orderdetails after placing the order
import { ODAfterPlace_fail, ODAfterPlace_sucess } from '../types'
const initialstate = {
    loading: true,
    fulldetails: null,
    sucess: false,
    error: null
}
export const ODAfterPlaceReducer = (state = initialstate, action) => {
    const { type, payload } = action
    switch (type) {
        case ODAfterPlace_sucess:
            return {
                loading: false,
                fulldetails: payload,
                sucess: true
            }
        case ODAfterPlace_fail:
            return {
                loading: true,
                error: payload,
                sucess: false
            }
        default:
            return state
    }
}