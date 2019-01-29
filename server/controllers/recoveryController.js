const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const _ = require('lodash');
const emailService = require('../services').emailService;
const credentialController = require('./credentialController');
const automatedEmailAccount = require('../config/automatedEmailAccount');
const environment = require('../config/environment');
const emailTemplate = require('../common/emailTemplate');
const authenticationService = require('../services').authenticationService;
const user = require('../models').user;

module.exports = {
    sendEmailWithRecoveryLink(req, res, next) {
        credentialController.findByLogin(req.body.login)
            .then(credential => {
                if (credential) {
                    const token = authenticationService.createRecoveryToken(credential.id, credential.login);
                    return user.findByPk(credential.id)
                        .then(user => {
                            const link = environment.frontUrl + 'recovery/' + token;
                            let subject = emailTemplate.recoverySubjectEn;
                            let text = emailTemplate.recoveryTextEn;
                            switch (user.language) {
                                case 'pl' : {
                                    subject = emailTemplate.recoverySubjectPl;
                                    text = emailTemplate.recoveryTextPl;
                                    break;
                                }
                                case 'de': {
                                    subject = emailTemplate.recoverySubjectDe;
                                    text = emailTemplate.recoveryTextDe;
                                }
                            }
                            text = text + link;
                            return emailService.sendGmailEmail([user.email], subject, text, automatedEmailAccount.login, automatedEmailAccount.password)
                        })
                }
                throw {
                    code: 420,
                    text: 'No such user'
                }
            })
            .then(() => {
                res.status(200).send("OK")
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