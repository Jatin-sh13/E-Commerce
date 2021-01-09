const express = require('express')
const router = express.Router()
const User = require('../modals/user')
const Product = require('../modals/product')
const auth = require('../middleware/auth')
//post product private route
router.post('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password')
        const isAdmin = user.isAdmin
        if (isAdmin) {
            const { name, description, image, brand, category, price, countInStock, rating, numReviews } = req.body
            const product = { name, description, image, brand, category, price, countInStock, rating, numReviews, user: req.user.id }
            const newproduct = new Product(product)
            await newproduct.save()
            return res.json(newproduct)
        }
        else {
            res.json("You Are not Autherised")
        }
    } catch (error) {
        console.log(errors)
    }
})
//get product all products
router.get("/", async (req, res) => {
    try {
        const products = await Product.find()
        res.json(products)
    } catch (error) {
        res.json('Some Error')
    }
})
//getting individual product by id
router.get("/:id", async (req, res) => {
    try {
        const product = await Product.findById({ _id: req.params.id })
        res.json(product)
    } catch (error) {
        console.log(error)
    }
})
module.exports = router;