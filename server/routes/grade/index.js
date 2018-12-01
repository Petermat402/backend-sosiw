const gradeController = require('../../controllers').gradeController;

module.exports = (app) => {
    app.get('/grade', (req, res) => res.status(200).send({
        message: 'Welcome to the Ocena API!',
    }));

    app.post('/grade', gradeController.create);

};