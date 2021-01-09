const express = require('express')
const router = express.Router()
const User = require('../modals/user')
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const auth = require('../middleware/auth')
//@route POST api/users
//@description  user registration
//@access PUBLIC
router.post('/', [
    body('name', 'Name is Required').not().isEmpty(),  //middleware for validation
    body('email', 'Enter Valid Email').isEmail(),
    body('password', 'Password length min 6').isLength({ min: 6 }),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) { //agr error empty nhi hota hai iska mtlb error hai 
        return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, password, isAdmin } = req.body;
    try {
        let user = await User.findOne({ email }); //user ka email check krenge ki phle se db hai ya nhi
        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }
        user = new User({
            name,
            email,
            password,
            isAdmin,
        });
        const salt = await bcrypt.genSalt(10); //salt generate kar rhe hai 
        user.password = await bcrypt.hash(password, salt); //ab salt or user ke password ko milake ke hash na rhe hai 
        const newuser = await user.save(); //db mai save kr diya 
        const payload = {
            user: {
                id: user.id     ///payload bna kar TOKEN MAI USER KI ID BHJ RHE HAI 
            }
        }
        jwt.sign(
            payload,
            config.get('jwtSecret'),
            {
                expiresIn: 360000,
            },
            (err, token) => {
                if (err) throw err;
                res.json({ token }); //yha se ham token bhej rhe hai res mai phir ham usko frontend se access krke loacl storage mai save kr denge
            },
        );
    } catch (error) {
        console.log(error)
    }
})
router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password')
        res.json(user)
    } catch (error) {
        res.status(401).send("Server Error")
    }
})
module.exports = router;