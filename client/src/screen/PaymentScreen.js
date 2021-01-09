import React, { useState, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getlogindata } from '../Action/Login'
import { Payment } from '../Action/Cart'
import FormContainer from '../componets/FormContainer'
const PaymentScreen = ({ history }) => {
    const [paymentmethod, setPaymentmethod] = useState('Paypal')
    const cart = useSelector((state) => state.cart)
    const { shippingAddress } = cart
    if (!shippingAddress) {
        history.push('/shipping')
    }
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getlogindata())
    }, [dispatch])
    const handlesubmit = (e) => {
        e.preventDefault()
        dispatch(Payment(paymentmethod))
        history.push('/placeorder')
    }
    return (
        <FormContainer><br />
            <h1>Payment Method</h1>
            <Form onSubmit={handlesubmit}>
                <Form.Check type="radio" label='Paypal or Credit card' name="paymentMethod" value='Paypal' id="Paypal" checked onChange={(e) => setPaymentmethod(e.target.value)}>
                </Form.Check>
                <br />
                <Form.Check type="radio" label='Stripe' name="paymentMethod" value='Stripe' id="Stripe" onChange={(e) => setPaymentmethod(e.target.value)}>
                </Form.Check><br />
                <Button type='submit' variant='primary'>
                    Continue
        </Button>
            </Form>
        </FormContainer>
    )
}

export default PaymentScreen
