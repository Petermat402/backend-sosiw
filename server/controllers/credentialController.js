const credential = require('../models').credential;
const atob = require('atob');
const bcrypt = require('bcryptjs');

module.exports = {
    findByLogin(login) {
        return credential
            .find({
                where: {
                    login: login
                }
            })
    },

    create(req, res, hashedPassword) {
        return Promise.all([
            credential
                .create({
                    login: req.body.login,
                    password: hashedPassword
                }),
            Promise.resolve(req),
            Promise.resolve(res)
        ])

    },

    findByIdentyficator(id) {
        return credential.findById(id)
    },

    changePassword(req, res, next) {
        let passwordOld = atob(req.body.passwordOld);
        let passwordNew = bcrypt.hashSync(atob(req.body.passwordNew), 10);
        credential.findByPf(req.userId)
            .then(credential => {
                if (!credential) {
                    throw {
                        code: '404',
                        text: 'No such user'
                    }
                }
                if (!bcrypt.compareSync(passwordOld, credential.password)) {
                    throw {
                        code: '432',
                        text: 'Wrong password'
                    }
                }
                return credential.update({
                    password: passwordNew
                })

            })
            .then(() => {
                res.status(200).send({
                    message: 'password has been changed'
                })
            })
            .catch(err => {
                if (err.code) {
                    res.status(err.code).send(err.text)
                } else {
                    res.status(400).send(err)
                }
            })
    }
};