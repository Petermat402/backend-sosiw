const Przedmiot = require('../models').Przedmiot;

module.exports = {
    create(req, res) {
        return Przedmiot
            .create({
                nazwa: req.body.nazwa,
                id_nauczyciel: req.body.id_nauczyciel
            })
            .then(przedmiot => res.status(201).send(przedmiot))
            .catch(error => res.status(400).send(error));
    },
};