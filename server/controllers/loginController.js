const credential = require('../models').credential;
const student = require('../models').student;
const teacher = require('../models').teacher;
const config = require('../config/JWTConfig');
const authenticationService = require('../services/authenticationService');
const administratorController = require('./administratorController');
const studentController = require('./studentController');
const teacherController = require('./teacherController');
const credentialController = require('./credentialController');
var jwt = require('jsonwebtoken');

module.exports = {
    register(req, res, next) {

                credentialController.create(req, res)
                    .then(([credential, req, res]) => {
                        console.log('credentialId  ==  ', credential.id)
                        if (req.body.role) {
                            let role = req.body.role;
                            if (role === 'S') {
                                return studentController.create(req, res, credential.id)
                            } else if (role === 'T') {
                                return teacherController.create(req, res, credential.id)
                            } else if (role === 'A') {
                                return administratorController.create(req, res, credential.id)
                            }
                        }
                        res.status(452).send("No role specified!")
                    })
                    .then(user => res.status(201).send(user)
                    ).catch(error => res.status(400).send(error))

    },

    token(req, res) {
        const token = jwt.sign({id: req.body.id}, config.key, {
            expiresIn: 86400 // expires in 24 hours
        });
        res.status(200).send({token: token})
    },

    login(req, res) {

    }

};