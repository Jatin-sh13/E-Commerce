import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Addtocart, removecart } from '../Action/Cart'
import Message from '../componets/Message'
import { Col, Row, ListGroup, Image, Button, Form, Card } from 'react-bootstrap'
import { Redirect } from 'react-router-dom'
import { getlogindata } from '../Action/Login'
const Cartscreen = ({ match, location, history }) => {
    const productId = match.params.id
    const qyt = location.search ? Number(location.search.split('=')[1]) : 1
    const dispatch = useDispatch()
    const cart = useSelector((state) => state.cart)
    const userInfo = useSelector((state) => state.user)
    const { user, token } = userInfo
    const { cartItems } = cart
    useEffect(() => {
        dispatch(getlogindata())
        if (productId) {
            dispatch(Addtocart(productId, qyt))
        }
    }, [dispatch])
    const total_quantity = cartItems.reduce((acc, element) => {
        return acc + element.qyt
    }, 0)
    const total_price = cartItems.reduce((acc, element) => {
        return acc + element.qyt * element.price
    }, 0)
    const Checkouthandler = () => {
        console.log()
        if (user && token) {
            history.push('/shipping')
        }
        else {
            history.push('/login')
        }
    }
    const removefromcart = (id) => {
        dispatch(removecart(id))
    }
    return (
        <div><br />
            <h1>Shopping Cart</h1>
            {cartItems.length === 0 ? <Message>Your Cart is Empty</Message> : <Fragment>
                <Row>
                    <Col md={8}>
                        <ListGroup variant="flush">
                            {cartItems.map(item => (
                                <ListGroup.Item>
                                    <Row>
                                        <Col md={2}>
                                            <Image src={item.image} fluid rounded />
                                        </Col>
                                        <Col md={2} style={{ marginTop: '10px' }}>
                                            <p>${item.price}</p>
                                        </Col>
                                        <Col md={4} style={{ marginTop: '10px' }}>
                                            <p>{item.name}</p>
                                        </Col>
                                        <Col md={2}>
                                            {item.countInStock > 0 ?
                                                <div>
                                                    <Form.Control as="select" custom value={item.qyt} onChange={(e) => dispatch(Addtocart(item.product, Number(e.target.value)))}>
                                                        {[...Array(item.countInStock).keys()].map(
                                                            (x) => (
                                                                <option key={x + 1} value={x + 1}>
                                                                    {x + 1}
                                                                </option>
                                                            )
                                                        )}
                                                    </Form.Control>
                                                </div>
                                                : 'fghj'}
                                        </Col>
                                        <Col md={2}>
                                            <Button onClick={() => removefromcart(item.product)}>Delete</Button>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    </Col>
                    <Col md={4}>
                        <ListGroup>
                            <ListGroup.Item>
                                Subtotal({total_quantity})Items
                            </ListGroup.Item>
                            <ListGroup.Item>
                                Total Price:${total_price}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Button type='Button' disabled={cartItems.length === 0} onClick={Checkouthandler} className='btn-block'>CheckOut</Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Col>
                </Row>
            </Fragment>}
        </div>
    )
}

export default Cartscreen
