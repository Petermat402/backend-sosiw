const Nauczyciel = require('../models').Nauczyciel;

module.exports = {
    create(req, res) {
        return Nauczyciel
            .create({
                imie: req.body.nazwisko,
                nazwisko: req.body.nazwisko,
                pesel: req.body.pesel,
                email: req.body.email,
                wydzial: req.body.wydzial
            })
            .then(nauczyciel => res.status(201).send(nauczyciel))
            .catch(error => res.status(400).send(error));
    },
};