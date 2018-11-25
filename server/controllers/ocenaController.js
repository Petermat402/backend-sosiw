const Ocena = require('../models').Ocena;

module.exports = {
    create(req, res) {
        return Ocena
            .create({
                id_przedmiot: req.body.id_przedmiot,
                id_student: req.body.id_student,
                wartosc: req.body.wartosc
            })
            .then(ocena => res.status(201).send(ocena))
            .catch(error => res.status(400).send(error));
    },
};