const course = require('../models').course;

module.exports = {
    create(req, res) {
        return course
            .create({
                name: req.body.name,
                id_teacher: req.body.id_teacher
            })
            .then(course => res.status(201).send(course))
            .catch(error => res.status(400).send(error));
    },
};