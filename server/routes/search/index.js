const studentController = require('../controllers').studentController;
const nauczycielController = require('../controllers').nauczycielController;
const przedmiotController = require('../controllers').przedmiotController;

module.exports = (app) => {
    app.get('/search', (req, res) => res.status(200).send({
        message: 'Welcome to the Todos API!',
    }));
};