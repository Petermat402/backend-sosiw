const credential = require('../models').credential;

module.exports = {
    findByLogin(login) {
        return credential
            .find({
                where: {
                    login: login
                }
            })
    },

    create(req, res) {
        return Promise.all([credential
            .create({
                login: req.body.login,
                password: req.body.password
            }),
            Promise.resolve(req),
            Promise.resolve(res)])

    },

    findByIdentyficator(id) {
        return credential.findById(id)
    }
};