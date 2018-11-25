const Credential = require('../models').Credential;

module.exports = {
    create(req, res) {
        return Credential
            .create({
                login: req.body.login,
                haslo: req.body.haslo
            })
            .then(credential => res.status(201).send(credential))
            .catch(error => res.status(400).send(error));
    },
};