const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const emailService = require('../services').emailService;
const user = require('../models').user;
const _ = require('lodash');
const atob = require('atob');

module.exports = {

    sendEmail(req, res) {
        emailService.sendGmailEmail(
            req.body.addresses,
            req.body.subject,
            req.body.text,
            req.body.senderEmail,
            req.body.password
        ).then(info => {
            res.status(200).send("ok")
        })
            .catch(err => {
                console.log(err);
                res.status(400).send(err)
            })

    },

    sendEmailUsers(req, res, next) {
        user.findByPk(req.userId)
            .then(user => {
                if (user && user.active) {
                    return emailService.sendGmailEmail(
                        req.body.addresses,
                        req.body.subject,
                        req.body.text,
                        user.email,
                        atob(req.body.password)
                    )
                }
                throw {
                    code: 420,
                    text: "No such active user"
                }
            })
            .then(info => {
                res.status(200).send(info)
            })
            .catch(err => {
                console.log(err);
                if (err.code) {
                    res.status(err.code).send(err.text)
                } else {
                    res.status(400).send(err)
                }
            })
    },

    sendEmailGroups(req, res, next) {
        user.findByPk(req.userId)
            .then(foundUser => {
                if (foundUser && foundUser.active) {
                    return user.findAll({
                        where: {
                            group: {
                                [Op.or]: req.body.addresses
                            }
                        },
                        attributes: {
                            include: ['email'],
                            exclude: ['id', 'name', 'surname', 'pesel', 'group', 'departament', 'role', 'createdAt', 'updatedAt', 'active']
                        }
                    })
                        .then(usersEmails => {
                            const addresses = [];
                            _.each(usersEmails, userEmail => {
                                addresses.push(userEmail.email);
                            });
                            return emailService.sendGmailEmail(
                                addresses,
                                req.body.subject,
                                req.body.text,
                                foundUser.email,
                                atob(req.body.password)
                            )
                        })
                }
                throw {
                    code: 420,
                    text: "No such active user"
                }
            })
            .then(info => {
                res.status(200).send(info);
            })
            .catch(err => {
                console.log(err);
                if (err.code) {
                    res.status(err.code).send(err.text)
                } else {
                    res.status(400).send(err)
                }
            })
    },

    sendEmailDepartments(req, res, next) {
        user.findByPk(req.userId)
            .then(foundUser => {
                if (foundUser && foundUser.active) {
                    return user.findAll({
                        where: {
                            departament: {
                                [Op.or]: req.body.addresses
                            }
                        },
                        attributes: {
                            include: ['email'],
                            exclude: ['id', 'name', 'surname', 'pesel', 'group', 'departament', 'role', 'createdAt', 'updatedAt', 'active']
                        }
                    })
                        .then(usersEmails => {
                            const addresses = [];
                            _.each(usersEmails, userEmail => {
                                addresses.push(userEmail.email);
                            });
                            return emailService.sendGmailEmail(
                                addresses,
                                req.body.subject,
                                req.body.text,
                                foundUser.email,
                                atob(req.body.password)
                            )
                        })
                }
                throw {
                    code: 420,
                    text: "No such active user"
                }
            })
            .then(info => {
                res.status(200).send(info);
            })
            .catch(err => {
                console.log(err);
                if (err.code) {
                    res.status(err.code).send(err.text)
                } else {
                    res.status(400).send(err)
                }
            })
    }
};
