import React from 'react'
import { Card, Button } from 'react-bootstrap'
import Rating from './Rating'
const Product = ({ product }) => {
    return (
        <div>
            <Card className='my-3 p-1 rounded'>
                <a href={`/product/${product._id}`}>
                    <Card.Img variant="top" src={product.image} />
                </a>
                <Card.Body>
                    <a href={`/product/${product._id}`}>
                        <Card.Title>{product.name}</Card.Title>
                    </a>
                    <Card.Text>
                        <Rating value={product.rating} text={`${product.numReviews} reviews`} />
                    </Card.Text>
                    <Card.Text as='h3'>
                        ${product.price}
                    </Card.Text>
                </Card.Body>
            </Card>
        </div>
    )
}

export default Product
