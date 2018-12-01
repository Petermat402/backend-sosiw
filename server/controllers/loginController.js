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
var bcrypt = require('bcryptjs');

module.exports = {
    register(req, res, next) {
        const hashedPassword = bcrypt.hashSync(req.body.password, 10);
        credentialController.create(req, res, hashedPassword)
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
        //const hashedPassword = bcrypt.hashSync(req.body.password, 10);
        let password = req.body.password;
        credentialController.findByLogin(req.body.login)
            .then(credential => {
                if (!credential) {
                    return res.status(431).send("no such user")
                }
                if (bcrypt.compareSync(password, credential.password)) {
                    password = '';
                    console.log(credential.role);

                    switch (credential.role) {
                        case 'S': {
                            return studentController.findByIdentyficator(credential.id)
                        }
                        case 'T': {
                            return teacherController.findByIdentyficator(credential.id)
                        }
                        case 'A': {
                            return administratorController.findByIdentyficator(credential.id)
                        }
                        default : {
                            throw 'Wrong Role or role unspecified';
                        }
                    }
                }
                throw "Wrong password"
            })
            .then(user => {
                const token = authenticationService.createToken(user.id);
                res.status(200).send({
                    auth: true,
                    token: token,
                    user
                })
            })
            .catch(err => res.status(400).send(err))
    }

};