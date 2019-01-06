var jwt = require('jsonwebtoken');
var config = require('../config/JWTConfig');

module.exports = {
    verifyToken(req, res, next){
        const token = req.headers['token'];
        console.log(token)
        if (!token)
            return res.status(419).send({ auth: false, message: 'No token provided.' });

        jwt.verify(token, config.key, function(err, decoded) {
            if (err)
                return res.status(403).send({ auth: false, message: 'Failed to authenticate token.' });

            // if everything good, save to request for use in other routes
            req.userId = decoded.id;
            next();
        });
    },

    createToken(id) {
        return jwt.sign({id: id}, config.key, {
            expiresIn: 86400 // expires in 24 hours
        });
    }
};