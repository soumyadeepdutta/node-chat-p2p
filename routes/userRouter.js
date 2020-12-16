const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const router = require('express').Router();
const {User, validate} = require('../models/user');

// register a user
router.post('/register', async (req, res) => {
    
    // validate user input
    const {error} = validate(req.body);
    if (error) return res.status(400).send(error.message);

    // check if already exists
    let user = await User.findOne({email: req.body.email});
    if (user) return res.status(400).send('User already registered');

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    // else save
    user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    });

    await user.save();

    // generate authentication token
    const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET);

    // loadash can be used
    res.header('X-Auth-Token', token).send({
        _id: user._id,
        name: user.name,
        email: user.email
    });
})

// login a user
router.post('/login', (req, res) => {
    res.send('login api');
})

router.post('/chat', (req, res) => {
    res.send('send-message-to-a-user');
})

module.exports = router