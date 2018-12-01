const grade = require('../models').grade;

module.exports = {
    create(req, res) {
        return grade
            .create({
                id_course: req.body.id_course,
                id_student: req.body.id_student,
                value: req.body.value
            })
            .then(grade => res.status(201).send(grade))
            .catch(error => res.status(400).send(error));
    },
};