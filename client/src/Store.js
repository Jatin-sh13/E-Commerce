import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { ProductReducer } from './Reducer/Product'
import { CartReducer } from './Reducer/Cart'
import { LoginReducer } from './Reducer/Login'
import { orderReducer } from './Reducer/Order'
import { ODAfterPlaceReducer } from './Reducer/Orderdetail'
import { OrderListReducer } from './Reducer/OrderList'
import { PayReducer } from './Reducer/OrderPay'
const reducer = combineReducers({
    Productlist: ProductReducer,
    cart: CartReducer,
    user: LoginReducer,
    Orderdetails: orderReducer,
    ODAfterPlace: ODAfterPlaceReducer,
    OrderPay: PayReducer,
    OrderList: OrderListReducer
})
const cartitemfromlocal = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []
const shippingAddfromlocal = localStorage.getItem('Shipping_Address') ? JSON.parse(localStorage.getItem('Shipping_Address')) : {}
const PaymetAddfromlocal = localStorage.getItem('PaymentMethod') ? JSON.parse(localStorage.getItem('PaymentMethod')) : 'Paypal'

const initialState = {
    cart: {
        cartItems: cartitemfromlocal,
        shippingAddress: shippingAddfromlocal,
        PaymentMethod: PaymetAddfromlocal,
    }
};

const middleware = [thunk];
const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);
export default store