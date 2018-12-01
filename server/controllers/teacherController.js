const teacher = require('../models').teacher;

module.exports = {
    create(req, res, id) {
        return teacher
            .create({
                id: id,
                name: req.body.name,
                surname: req.body.surname,
                pesel: req.body.pesel,
                email: req.body.email,
                departament: req.body.departament
            })
    },
    findByIdentyficator(id){
        return teacher.findById(id)
    }
};