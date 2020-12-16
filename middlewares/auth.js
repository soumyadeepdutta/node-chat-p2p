const { func } = require("joi");

const jwt = require('jsonwebtoken');

module.export = function (req, res, next) {
    const token = req.header('X-Auth-Token');
    if (!token) return res.status(401).send('Access Denied. Authentication token not provided');

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (ex) {
        res.status(400).send('Invalid Token.');
    }
}