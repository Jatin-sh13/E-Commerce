const express = require('express')
const app = express()
const userRoute = require('./routes/user')
const productRoute = require('./routes/product')
const authRoute = require('./routes/auth')
const orderRoute = require('./routes/Order')

const connectdb = require('./config/db')
const config = require('config')
connectdb()
app.use(express.json({ extended: false }))
app.use('/api/user', userRoute)
app.use('/api/product', productRoute)
app.use('/api/auth', authRoute)
app.use('/api/order', orderRoute)
app.get('/api/config/paypal', (req, res) => {
    console.log('hello')
    res.send(config.get('PAYPAL_CLIENT_ID'))
})
const port = process.env.PORT || 1999
app.listen(port, () => {
    console.log("Server is running")
})