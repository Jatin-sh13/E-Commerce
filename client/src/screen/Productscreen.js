import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Row, Image, Col, ListGroup, Button, Form } from 'react-bootstrap'
import Rating from '../componets/Rating'
import { useDispatch, useSelector } from 'react-redux'
import { ProductDetails } from '../Action/Product'
import { getlogindata } from '../Action/Login'
const Productscreen = ({ history, match }) => {
    const [qyt, setQyt] = useState(1)
    const dispatch = useDispatch()
    const productlist = useSelector(state => state.Productlist)
    const { ProductDetail } = productlist
    useEffect(() => {
        dispatch(ProductDetails(match.params.id))
        dispatch(getlogindata())
    }, [dispatch])
    const addtocart = () => {
        history.push(`/cart/${match.params.id}?qyt=${qyt}`)
    }
    return (
        <div>
            <Link className='btn btn-light my-3' to='/'>
                Go Back
            </Link>
            <Row>
                <Col md={6}>
                    <Image src={ProductDetail.image} fluid />
                </Col>
                <Col md={6} style={{ padding: '10px' }}>
                    <h4 style={{ marginLeft: '20px' }}>{ProductDetail.name}</h4>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <Rating value={ProductDetail.rating} text={`${ProductDetail.numReviews} reviews`} />
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h5>Price:${ProductDetail.price}</h5>
                            <p>{ProductDetail.countInStock >= 0 ? 'In Stock' : 'Out of Stock'}</p>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <p>Description:{ProductDetail.description}</p>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                {ProductDetail.countInStock > 0 ?
                                    <div>
                                        <Form.Control as="select" custom value={qyt} onChange={(e) => setQyt(e.target.value)}>
                                            {[...Array(ProductDetail.countInStock).keys()].map(
                                                (x) => (
                                                    <option key={x + 1} value={x + 1}>
                                                        {x + 1}
                                                    </option>
                                                )
                                            )}
                                        </Form.Control>
                                    </div>
                                    : 'fghj'}
                                <div>
                                    <h4 style={{ marginRight: '10px', marginLeft: '10px', backgroundColor: '#f7f7f9', paddingBottom: '10px', paddingTop: '10px' }}>Price:$100</h4>
                                </div>
                                <div><Button onClick={addtocart} style={{ marginLeft: '10px' }}>Add to cart</Button></div>
                            </Row>
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
            </Row>
        </div>
    )
}
export default Productscreen 
