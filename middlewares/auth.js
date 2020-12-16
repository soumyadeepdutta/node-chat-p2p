const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Joi = require('joi');
const router = require('express').Router();
const {User} = require('../models/user');

router.post('/', async (req, res, next) => {
    const {error} = validate(req.body);
    if (error) return res.status(400).send(error.message);

    let user = await User.findOne({email: req.body.email});
    if (!user) return res.status(400).send('Email or Password is invalid');

    const validPassword = bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).send('Email or Password is invalid');

    const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET);
    res.header('X-Auth-Token', token).send(true);
});

function validate(req) {
    const schema = Joi.object({
        email: Joi.string()
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
            .min(5)
            .max(255)
            .required(),
        password: Joi.string()
            .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
            .min(5)
            .max(255)
            .required(),
    })

    return schema.validate(req)
}

module.exports = router