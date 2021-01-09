import { Productlist_sucess, Productlist_fails, ProductDetail_fail, ProductDetail_sucess } from '../types'
const initialstate = {
    loading: true,
    products: [],
    ProductDetail: {},
    error: null
}
export const ProductReducer = (state = initialstate, action) => {
    const { type, payload } = action
    switch (type) {
        case Productlist_sucess:
            return {
                loading: false,
                products: payload,
                error: null
            }
        case Productlist_fails:
            return {
                loading: true,
                products: [],
                error: payload
            }
        case ProductDetail_sucess:
            return {
                ...state,
                ProductDetail:payload
            }
        default:
            return state
    }
}