import { Addcart_sucess, Addcart_fail, Remove_cart, Shipping_Add_Sucess, Save_PaymentMethod } from '../types'
import axios from 'axios'
export const Addtocart = (id, qyt) => async (dispatch, getState) => {
    const { data } = await axios.get(`/api/product/${id}`)
    dispatch({
        type: Addcart_sucess,
        payload: {
            product: data._id,
            name: data.name,
            image: data.image,
            price: data.price,
            countInStock: data.countInStock,
            qyt
        }
    })
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}
export const removecart = (id) => async (dispatch, getState) => {
    dispatch({
        type: Remove_cart,
        payload: id
    })
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}
//shipping
export const shipping = (data) => async (dispatch) => {
    dispatch({
        type: Shipping_Add_Sucess,
        payload: data
    })
    localStorage.setItem('Shipping_Address', JSON.stringify(data))
}
//payment method
export const Payment = (data) => async (dispatch) => {
    dispatch({
        type: Save_PaymentMethod,
        payload: data
    })
    localStorage.setItem('PaymentMethod', JSON.stringify(data))
}
