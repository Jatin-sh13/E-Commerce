const express = require('express')
const router = express.Router()
const orderdetails = require('../modals/orderdetail')
const auth = require('../middleware/auth')
//post req private
router.post('/', auth, async (req, res) => {
    const { orderItems, shippingAddress, paymentMethod, totalPrice, shippingPrice } = req.body
    try {
        const order = new orderdetails({
            user: req.user.id,
            orderItems,
            shippingAddress,
            paymentMethod,
            shippingPrice,
            totalPrice
        })
        const jatin = await order.save()
        res.json(jatin)
    } catch (error) {
        console.log(error)
        res.status(401).json('Server Error Order Details Not found')
    }
})
//get order by id
router.get('/:id', auth, async (req, res) => {
    try {
        const order = await orderdetails.findById(req.params.id)
        res.json(order)
    } catch (error) {
        console.log(error)
        res.status(401).json("Server Error")
    }
})
router.put('/:id/pay', auth, async (req, res) => {
    try {
        const order = await orderdetails.findById(req.params.id)
        if (order) {
            order.isPaid = true
            order.paidAt = Date.now()
            //This data come from paypal api
            order.paymentResult = {
                id: req.body.id,
                status: req.body.status,
                update_time: req.body.update_time,
                email_address: req.body.email_address
            }
        }
        await order.save()
        res.json(order)
    } catch (error) {
        console.log(error)
        res.status(401).json("Server Error")
    }
})
//getting all orders of the user 
router.get('/', auth, async (req, res) => {
    try {
        const orders = await orderdetails.find({ user: req.user.id })
        res.json(orders)
    } catch (error) {
        console.log(error)
        res.status(401).json('server error')
    }
})
module.exports = router