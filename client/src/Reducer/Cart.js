import { Addcart_fail, Addcart_sucess, Remove_cart, Save_PaymentMethod, Shipping_Add_Sucess } from '../types'
export const CartReducer = (state = { cartItems: [], shippingAddress: {}, PaymentMethod: '' }, action) => {
    const { type, payload } = action
    switch (type) {
        case Addcart_sucess:
            const item = payload
            const existItem = state.cartItems.find((x) => x.product === item.product)
            if (existItem) {
                return {
                    ...state,
                    cartItems: state.cartItems.map((x) =>
                        x.product === existItem.product ? item : x
                    ),
                }
            } else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, item],
                }
            }
        case Remove_cart:
            return {
                ...state,
                cartItems: state.cartItems.filter(x => x.product !== action.payload)
            }
        case Shipping_Add_Sucess:
            return {
                ...state,
                shippingAddress: payload
            }
        case Save_PaymentMethod:
            return {
                ...state,
                PaymentMethod: payload
            }
        default:
            return state
    }
}