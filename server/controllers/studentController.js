const student = require('../models').student;

module.exports = {
    create(req, res) {
        return student
            .create({
                imie: req.body.nazwisko,
                nazwisko: req.body.nazwisko,
                pesel: req.body.pesel,
                email: req.body.email,
                grupa: req.body.grupa,
                departament: req.body.departament
            })
            .then(nauczyciel => res.status(201).send(nauczyciel))
            .catch(error => res.status(400).send(error));
    },
};