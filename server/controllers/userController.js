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
    }

};