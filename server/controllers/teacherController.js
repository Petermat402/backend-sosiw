const teacher = require('../models').teacher;

module.exports = {
    create(req, res) {
        return teacher
            .create({
                name: req.body.name,
                surname: req.body.surname,
                pesel: req.body.pesel,
                email: req.body.email,
                departament: req.body.departament
            })
            .then(teacher => res.status(201).send(teacher))
            .catch(error => res.status(400).send(error));
    },
};