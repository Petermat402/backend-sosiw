const Student = require('../models').Student;

module.exports = {
    create(req, res) {
        return Student
            .create({
                imie: req.body.nazwisko,
                nazwisko: req.body.nazwisko,
                pesel: req.body.pesel,
                email: req.body.email,
                grupa: req.body.grupa,
                wydzial: req.body.wydzial
            })
            .then(nauczyciel => res.status(201).send(nauczyciel))
            .catch(error => res.status(400).send(error));
    },
};