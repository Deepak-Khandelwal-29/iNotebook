const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {body, validationResult} = require('express-validator');
const router = express.Router()
const User = require('../models/User')
const {authenticateUser, jwtSec} = require('../middleware/authenticateUser')


let success = false
// user signup route
router.post('/signup', [
    body('name').isLength({min: 3}),
    body('email').isEmail(),
    body('password').isLength({min: 8})
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.json({errors: errors.array()});
    }
    try {
        // check if user already exists with this email
        let user = await User.findOne({email: req.body.email})
        if (user) {
            return res.status(400).json({success, message: "User with this email already exists"})
        }
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt)
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass
        })
        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, jwtSec)
        return res.json({success: true, authToken})
    }
        // if any internal error occur
    catch (err) {
        console.error(err.message)
        res.status(500).json({message: "Internal Server Error"})
    }
});


router.post('/login', [
    body('email').isEmail(),
    body('password').exists()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.json({errors: errors.array()});
    }
    const {email, password} = req.body;
    try {
        // check if user already exists with this email
        let user = await User.findOne({email})
        if (!user) {

            return res.json({success: false, message: "Login with correct credentials"})

        }

        const passCompare = await bcrypt.compare(password, user.password)
        if (!passCompare) {
            console.log(success + "mndvj")
            return res.json({success: false, message: "Login with correct credentials"})
        }

        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, jwtSec)
        return res.json({success: true, authToken})
    }
        // if any internal error occur
    catch (err) {
        console.error(err.message)
        res.status(500).json({message: "Internal Server Error"})
    }
});


router.post('/getuser', authenticateUser, async (req, res) => {
    try {
        const userId = req.user.id
        console.log(userId)
        const user = await User.findById(userId).select("-password")
        console.log(user)
        if (!user) {
            return res.status(404).json({message: "User not found"});
        }
        res.json(user)
    } catch (err) {  // if any internal error occur
        console.error(err.message)
        res.status(500).json({message: "Internal Server Error"})
    }
});

module.exports = router
