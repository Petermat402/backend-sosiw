const credential = require('../models').credential;
const student = require('../models').student;
const teacher = require('../models').teacher;
const config = require('../config/JWTConfig');
const authenticationService = require('../services/authenticationService');
var jwt = require('jsonwebtoken');

module.exports = {
    register(req, res, next) {
        return credential
            .create({
                login: req.body.login,
                password: req.body.password
            })
            .then(credential => res.status(201).send(credential))
            .catch(error => res.status(400).send(error));
    },

    token(req, res) {
        const token = jwt.sign({ id: req.body.id }, config.key, {
            expiresIn: 86400 // expires in 24 hours
        });
        res.status(200).send({token: token})
    }

};