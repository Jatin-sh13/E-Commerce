import React, { useEffect } from 'react'
import { Row, Col, ListGroup, Image, Card, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getlogindata } from '../Action/Login'
import { OrderAction } from '../Action/Order'
const PlaceOrderScreen = ({ history }) => {
    const dispatch = useDispatch()
    const cart = useSelector((state) => state.cart)
    const details = useSelector((state) => state.Orderdetails)
    const { sucess } = details
    const { orderdetail } = details
    const { shippingAddress, PaymentMethod } = cart
    useEffect(() => {
        dispatch(getlogindata())
        if (sucess) {
            history.push(`/order/${orderdetail._id}`)
        }
    }, [dispatch, history, sucess])
    const total_quantity = cart.cartItems.reduce((acc, element) => {
        return acc + element.qyt
    }, 0)
    const total_price = cart.cartItems.reduce((acc, element) => {
        return acc + element.qyt * element.price
    }, 0)
    const shipping = 3
    const order = {
        orderItems: cart.cartItems,
        shippingAddress: shippingAddress,
        paymentMethod: PaymentMethod,
        shippingPrice: shipping,
        totalPrice: total_price
    }
    const Placeorderhandler = () => {
        console.log(order)
        dispatch(OrderAction(order))
    }
    return (
        <div><br />
            <h1>Place Order</h1>
            <Row>
                <Col md={8}>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h5>shipping</h5>
                            <p>Address:{shippingAddress.address},{shippingAddress.city} {shippingAddress.postalCode},{shippingAddress.country}</p>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h5>Payment Method</h5>
                            <p>Method:{PaymentMethod}</p>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h5>Order items</h5>
                            {cart.cartItems === 0 ? <h6>Cart is Empty</h6> : (
                                <ListGroup variant='flush'>
                                    {cart.cartItems.map((item, index) => (
                                        <ListGroup.Item key={index}>
                                            <Row>
                                                <Col md={2}>
                                                    <Image src={item.image} fluid rounded />
                                                </Col>
                                                <Col md={6}>
                                                    {item.name}
                                                </Col>
                                                <Col md={1}>
                                                    {item.qyt}x{item.price}={item.qyt * item.price}
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
                                    <Col>Items:</Col>
                                    <Col>{total_quantity}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Shipping</Col>
                                    <Col>${shipping}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Total Price</Col>
                                    <Col>${total_price + shipping}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Button type='Button' disabled={cart.cartItems.length === 0} className='btn-block' onClick={Placeorderhandler}>Place Order</Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default PlaceOrderScreen
