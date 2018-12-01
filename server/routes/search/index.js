const studentController = require('../../controllers').studentController;
const teacherController = require('../../controllers').teacherController;
const courseController = require('../../controllers').courseController;

module.exports = (app) => {
    app.get('/search', (req, res) => res.status(200).send({
        message: 'Welcome to the Todos API!',
    }));
};