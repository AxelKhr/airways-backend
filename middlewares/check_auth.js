const jwt = require('jsonwebtoken');
const { secret } = require('../configJwt');

module.exports = function (req, res, next) {
    if (req.method === "OPTIONS") {
        next();
    }
    try {
        if (!req.headers.authorization) {
            return res.json({message: "You are not authorized to perform this operation"});
        }
        const token = req.headers.authorization.split(' ')[1];
        if (!token) {
            return res.json({message: "You are not authorized to perform this operation"});
        }
        const decodedData = jwt.verify(token, secret);
        req.user = decodedData;
        next();
    } catch (e) {
        console.log(e);
        return res.json(false);
    }
};