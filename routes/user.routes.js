const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const userModel = require('../model/schema');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')



router.get('/register', (req, res) => {
    res.render("register");
})
router.post('/register',
    body('name').trim().isLength({ min: 2 }),
    body('number').trim().isLength({ min: 10 }),
    body('email').trim().isEmail(),
    body('password').trim().isLength({ min: 5 }),
    async (req, res) => {
         console.log('💬 BODY:', req.body);
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: "Invalid Data"
            });
        }
        const { name, number, email, password } = req.body;

        const hashedpass = await bcrypt.hash(password, 10);

        const newUser = await userModel.create({
            name,
            number,
            email,
            password : hashedpass
        })
        res.json(newUser);
    })

router.get('/login',(req,res)=>{
    res.render('login');
})


router.post('/login', [
    body('email').isEmail().isLength({ min: 5 }),
    body('password').trim().isLength({ min: 5 })
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            error: errors.array(),
            message: 'Invalid Data'
        });
    }

    const { email, password } = req.body;

    const user = await userModel.findOne({ email });
    if (!user) {
        return res.status(400).json({
            message: 'User Not Found or Password is Incorrect'
        });
    }

    const isMatch = await bcrypt.compare(password, user.password); // note: use `user.hashedpass`

    if (!isMatch) {
        return res.status(400).json({
            message: "User Not Found or Password is Incorrect"
        });
    }

    const token = jwt.sign({
        userID: user._id,
        email: user.email,
        username: user.name,
    }, process.env.JWT_SECRET);

    res.cookie('token', token);
    res.send('Logged In');
});


module.exports = router;