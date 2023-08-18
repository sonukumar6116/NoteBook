const express = require('express');
const User = require('../models/Users');
var bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');
var fetchuser = require('../middleware/fetchuser');
var jwt = require('jsonwebtoken');

const router = express.Router();
const JWT_SECRECT = "iamgoodboy%";

//ROUTE 1: creating user with help of name , email, password by using : POST:api/auth/createuser - no login req.
router.post('/createuser',
    [body('email', 'enter a valid email').isEmail(),
    body('name', 'enter a valid name').isLength({ min: 5 }),
    body('password', 'enter a valid password').isLength({ min: 5 })],
    async (req, res) => {
        let success = false;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({success, errors: errors.array() });
        }
        try {
            let user = await User.findOne({ email: req.body.email });
            if (user) {
                return res.status(400).json({success, error: "already exits" })
            }
            const salt = bcrypt.genSaltSync(10);
            const setPass = await bcrypt.hashSync(req.body.password, salt);
            user = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: setPass,
            })

            const data = {
                user: {
                    id: user.id
                }
            }

            const authtoken = jwt.sign(data, JWT_SECRECT);
            success=true;
            res.json({success,authtoken});
        } catch (error) {
            return res.status(400).json({ error: error })
        }
    })

//ROUTE 2: login user with help of eamil and password by using : POST:api/auth/login - login not req.
router.post('/login',
    [body('email', 'enter a valid email').isEmail(),
    body('password', 'enter a valid password').exists()
    ],
    async (req, res) => {

        let success = false;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success, errors: errors.array() });
        }

        const { email, password } = req.body;

        try {

            let user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({ success, error: "enter a valid credentials" })
            }

            let passwordCompare = await bcrypt.compare(password, user.password)

            if (!passwordCompare) {
                return res.status(400).json({ success, error: "enter a valid credentials" })
            }

            const data = {
                user: {
                    id: user.id
                }
            }

            const username = user.name;
            
            const authtoken = jwt.sign(data, JWT_SECRECT);
            success = true;
            res.json({success, authtoken,email,username});
            
        } catch (error) {
            return res.status(400).json({ success,error: error })
        }
    })

//ROUTE 3: getting user with help of token by using : POST:api/auth/getuser - login req.

router.post('/getuser', fetchuser, async (req, res) => {

    try {
        userID = req.user.id;
        const user = await User.findById(userID).select("-password")
        res.json(user);
    } catch (err) {
        return res.status(400).json({ error: error })
    }

})

module.exports = router;