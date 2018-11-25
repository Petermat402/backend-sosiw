const ocenaController = require('../controllers').ocenaController;

module.exports = (app) => {
    app.get('/ocena', (req, res) => res.status(200).send({
        message: 'Welcome to the Ocena API!',
    }));

    app.post('/ocena', ocenaController.create);

};