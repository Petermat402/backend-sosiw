const user = require('../models').user;

module.exports = {
    create(req, res, id) {
        return user
            .create({
                id: id,
                name: req.body.name,
                surname: req.body.surname,
                pesel: req.body.pesel,
                email: req.body.email,
                group: req.body.group,
                departament: req.body.departament,
                role: req.body.role
            })
    },

    findByIdentyficator(id) {
        return user.findByPk(id)
    },

    isAdministrator(req, res, next) {
        user.findByPk(req.userId).then(user => {
                if (user.role === 'A') {
                    next();
                } else {
                    res.status(401).send("unathorized User!!")
                }
            }
        )
    },

    changeEmail(req, res, next) {
        user.findByPk(req.userId)
            .then(user => {
                if (!user) {
                    throw {
                        code: '404',
                        text: 'No such user'
                    }
                }
                return user.update({
                    email: req.body.email
                })
            })
            .then(() => {
                res.status(200).send({
                    message: 'email succesfully updated'
                })
            })
            .catch(err => {
                if (err.code) {
                    res.status(err.code).send(err.text)
                } else {
                    res.status(400).send(err)
                }
            })
    },



};