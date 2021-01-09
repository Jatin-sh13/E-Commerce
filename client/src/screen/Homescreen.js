import React, { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Col, Row } from 'react-bootstrap'
import Product from '../componets/Product'
import { Productlist } from '../Action/Product'
import Loader from '../componets/Loader'
import { getlogindata } from '../Action/Login'
const Homescreen = () => {
    const dispatch = useDispatch()
    const productlist = useSelector(state => state.Productlist)
    const { products, error, loading } = productlist
    useEffect(() => {
        dispatch(Productlist())
        dispatch(getlogindata())
    }, [dispatch])
    return (
        <div>
            {loading ? <Loader /> : error ? <h1>{error}</h1> : <Fragment>
                <Row>
                    {products.map((product) => (
                        <Col xs={12} sm={6} md={6} lg={4} xl={3}>
                            <Product product={product} />
                        </Col>
                    ))}
                </Row>
            </Fragment>}
        </div>
    )
}
export default Homescreen
