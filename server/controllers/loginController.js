const authenticationService = require('../services').authenticationService;
const credentialController = require('./credentialController');
const userController = require('./userController');
const atob = require('atob');
const bcrypt = require('bcryptjs');
const academicYear = require('../common/academicYear');

module.exports = {
    register(req, res, next) {
        const hashedPassword = bcrypt.hashSync(atob(req.body.password), 10);
        credentialController.create(req, res, hashedPassword)
            .then(([credential, req, res]) => {
                console.log('credentialId  ==  ', credential.id);
                if (req.body.role && (req.body.role === 'A' || req.body.role === 'T' || req.body.role === 'S')) {
                    return userController.create(req, res, credential.id);
                }
                res.status(453).send("No role specified or wrong role")
            })
            .then(user => res.status(201).send(user)
            ).catch(error => res.status(400).send(error))

    },

    token(req, res) {
        const token = authenticationService.createToken(req.body.id);
        res.status(200).send({token: token})
    },

    login(req, res) {
        let password = atob(req.body.password);
        credentialController.findByLogin(req.body.login)
            .then(credential => {
                if (!credential) {
                    throw {
                        code: 420,
                        text: 'No such user'
                    }
                }
                if (bcrypt.compareSync(password, credential.password)) {
                    password = '';
                    return userController.findByIdentyficator(credential.id);
                }
                throw {
                    code: 422,
                    text: 'Unauthorized user. Wrong credentials'
                }
            })
            .then(user => {
                if (user && user.active) {
                    const token = authenticationService.createToken(user.id);
                    res.status(200).send({
                        auth: true,
                        token: token,
                        user
                    })
                } else {
                    throw {
                        code: 420,
                        text: 'No such active user'
                    }
                }

            })
            .catch(err => {
                if (err.code) {
                    res.status(err.code).send(err.text)
                } else {
                    res.status(400).send(err)
                }
            })
    },

    getAcademicYear(req, res, next) {
        res.status(200).send({
            academicYear: academicYear.value
        })
    },

    getNewToken(req, res, next) {
        const newToken = authenticationService.createToken(req.userId);
        res.status(200).send({
            auth: true,
            token: newToken,
            user: req.user
        })
    }
};