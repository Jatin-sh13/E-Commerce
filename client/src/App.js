import React from 'react'
import Header from './componets/Header'
import Footer from './componets/Footer'
import Homescreen from './screen/Homescreen'
import { Container } from 'react-bootstrap'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Productscreen from './screen/Productscreen'
import Cartscreen from './screen/Cartscreen'
import Loginscreen from './screen/Loginscreen'
import { setToken } from './setToken'
import Registerscreen from './screen/Registerscreen'
import UserProfile from './screen/UserProfile'
import ShippingScreen from './screen/ShippingScreen'
import PaymentScreen from './screen/PaymentScreen'
import PlaceOrderScreen from './screen/PlaceOrderScreen'
import Orderscreen from './screen/Orderscreen'
import Adminlogin from './screen/Adminlogin'
import UploadProduct from './screen/UploadProduct'

const App = () => {
    if (localStorage.token) {
        setToken(localStorage.token)
    }
    return (
        <div>
            <Router>
                <Header />
                <Container>
                    <Route path="/" exact component={Homescreen} />
                    <Route path="/product/:id" exact component={Productscreen} />
                    <Route path="/order/:id" exact component={Orderscreen} />
                    <Route path="/cart/:id?" exact component={Cartscreen} />
                    <Route path="/login" exact component={Loginscreen} />
                    <Route path="/register" exact component={Registerscreen} />
                    <Route path="/UserProfile" exact component={UserProfile} />
                    <Route path="/shipping" exact component={ShippingScreen} />
                    <Route path="/payment" exact component={PaymentScreen} />
                    <Route path="/placeorder" exact component={PlaceOrderScreen} />
                    <Route path="/admin" exact component={Adminlogin} />
                    <Route path="/uploadProduct" exact component={UploadProduct} />
                </Container>
            </Router>
        </div>
    )
}

export default App
