import React, { useEffect, useState } from 'react'
import { Row, Col, ListGroup, Image, Card, Button } from 'react-bootstrap'
import { PayPalButton } from 'react-paypal-button-v2'
import { useDispatch, useSelector } from 'react-redux'
import { getlogindata } from '../Action/Login'
import { ODAfter } from '../Action/Orderdetails'
import { OrderPayAction } from '../Action/OrderPay'
import axios from 'axios'
const PlaceOrderScreen = ({ history, match }) => {
    const [sdkready, setSdkready] = useState(false)
    const placedetails = useSelector((state) => state.ODAfterPlace)
    const paydetails = useSelector((state) => state.OrderPay)
    const { fulldetails } = placedetails
    const { sucess, Paydetails } = paydetails
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getlogindata())
        const addpaypalscript = async () => {
            try {
                const { data } = await axios.get('/api/config/paypal')
                const script = document.createElement('script')
                script.type = "text/javascript"
                script.src = `https://www.paypal.com/sdk/js?client-id=${data}`
                script.async = true
                script.onload = () => {
                    setSdkready(true)
                }
                document.body.appendChild(script)
            } catch (error) {
                console.log(error)
            }
        }
        if (!fulldetails || sucess) {
            dispatch(ODAfter(match.params.id))
            addpaypalscript()
        }
        if (sucess) {
            dispatch(ODAfter(match.params.id))
        }
    }, [dispatch, match, ODAfter, sucess,])
    const onsucesspayment = (paymentResult) => {
        dispatch(OrderPayAction(match.params.id, paymentResult))
        dispatch(ODAfter(match.params.id))
        console.log(paymentResult)
    }
    return (
        <div>
            {fulldetails ? <div><br />
                <h1>Order ID:{fulldetails._id}</h1>
                <Row>
                    <Col md={8}>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <h5>shipping</h5>
                                <p>Address:{fulldetails.shippingAddress.address}{fulldetails.shippingAddress.city} {fulldetails.shippingAddress.postalCode},{fulldetails.shippingAddress.country}</p>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <h5>Payment Method</h5>
                                <p>Method:{fulldetails.paymentMethod}</p>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                {fulldetails.isPaid ? <div>Payment status:<h1 style={{ color: 'green' }}>PAID</h1><p>{fulldetails.paidAt}</p></div> : <div>Payment status:<h3 style={{ color: "red" }}>Not Paid</h3> </div>}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                {fulldetails.isDelivered ? <div>Delivery status<h1 style={{ color: 'green' }}>Delivered Sucessfully</h1></div> : <div>Delivery status :<h3 style={{ color: "red" }}>Not Delivered</h3> </div>}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <h5>Order items</h5>
                                {fulldetails.orderItems === 0 ? <h6>Cart is Empty</h6> : (
                                    <ListGroup variant='flush'>
                                        {fulldetails.orderItems.map((item, index) => (
                                            <ListGroup.Item key={index}>
                                                <Row>
                                                    <Col md={2}>
                                                        <Image src={item.image} fluid rounded />
                                                    </Col>
                                                    <Col md={6}>
                                                        {item.name}
                                                    </Col>
                                                    <Col md={1}>
                                                        ${item.price}
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>
                                        ))}
                                    </ListGroup>
                                )}
                            </ListGroup.Item>
                        </ListGroup>
                    </Col>
                    <Col md={4}>
                        <Card>
                            <ListGroup variant="flush">
                                <ListGroup.Item>
                                    <h3>order summary</h3>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Total Payment</Col>
                                        <Col>${fulldetails.totalPrice}</Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    {!fulldetails.isPaid ? <div>
                                        <PayPalButton amount={fulldetails.totalPrice} onSuccess={onsucesspayment} />
                                    </div> : ''}
                                </ListGroup.Item>
                            </ListGroup>
                        </Card>
                    </Col>
                </Row>
            </div> : ''}
        </div>
    )
}

export default PlaceOrderScreen
