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

    create(req, res, hashedPassword) {
        return Promise.all([
            credential
                .create({
                    login: req.body.login,
                    password: hashedPassword,
                    role: req.body.role
                }),
            Promise.resolve(req),
            Promise.resolve(res)
        ])

    },

    findByIdentyficator(id) {
        return credential.findById(id)
    }
};