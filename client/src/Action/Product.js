import { Productlist_fails, Productlist_sucess, ProductDetail_sucess } from '../types'
import axios from 'axios'
export const Productlist = () => async dispatch => {
    try {
        const { data } = await axios.get('/api/product')
        console.log(data)
        dispatch({
            type: Productlist_sucess,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: Productlist_fails,
            payload: error
        })
    }
}
export const ProductDetails = (id) => async dispatch => {
    try {
        const { data } = await axios.get(`/api/product/${id}`)
        dispatch({
            type: ProductDetail_sucess,
            payload: data
        })
    } catch (error) {
        console.log(error)
    }
}
