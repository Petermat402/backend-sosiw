const student = require('../models').student;

module.exports = {
    create(req, res, id) {
        return student
            .create({
                id: id,
                name: req.body.name,
                surname: req.body.surname,
                pesel: req.body.pesel,
                email: req.body.email,
                group: req.body.group,
                departament: req.body.departament
            })
    },

    findByIdentyficator(id){
        return student.findById(id)
    }

};