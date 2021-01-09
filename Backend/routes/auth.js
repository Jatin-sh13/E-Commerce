const express = require('express')
const router = express.Router()
const User = require('../modals/user')
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const auth = require('../middleware/auth')
//@route POST api/users
//@description  Get login user and display user information
//@access PRIVATE
router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password') //password ko hta ke sari user ki information bhejna
        res.json(user)
    } catch (error) {
        console.log(error)
    }
})
//update profile
router.put('/', auth, async (req, res) => {
    const user = await User.findById(req.user.id)
    if (user) {
        user.name = req.body.name,
            user.email = req.body.email
    }
    const updateuser = await user.save()
    res.json(updateuser)
})
//@route POST api/users
//@description  Auth & Gettokens
//@access PUBLIC
router.post('/', [
    body('email', 'Please Include valide Email').isEmail(),
    body('password', 'Please Include valide Email').exists()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    //user ko login kr rhe hai 
    //db mai email find krenge milgya toh thik hai agr nhi mila toh invalid credentials  
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ msg: 'invalid credentials' })
        }
        //agr milgya user toh phir usko valid krvana hai 
        const isMatch = await bcrypt.compare(password, user.password) //plain text (password) or db mai jo user.password hai usko match krega 
        if (!isMatch) {
            res.status(400).json({ msg: "Invalid password" })
        }
        //agr login hojata hai toh token set krenge
        const payload = {
            user: {
                id: user.id     ///TOKEN MAI USER KI ID BHJ RHE HAI 
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
                res.json({ token });
            },
        );
    } catch (error) {
        console.log(error)
    }
})
module.exports = router;