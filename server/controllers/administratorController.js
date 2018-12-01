const administrator = require('../models').administrator;

module.exports = {
    create(req, res, id) {
        return administrator
            .create({
                id: id,
                name: req.body.name,
                surname: req.body.surname,
                pesel: req.body.pesel
            })
    },

    findByIdentyficator(id) {
        return administrator.findByPk(id)
    },

    isAdministrator(req, res, next) {
        administrator.findByPk(req.userId).then(admin => {
            if (admin) {
                next();
            }else {
                res.status(401).send("unathorized User!!")
            }
        })
    }
};