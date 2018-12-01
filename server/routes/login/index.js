const loginController = require('../../controllers').loginController;
const authenticationService = require('../../services/authenticationService');
const administratorController = require('../../controllers').administratorController;

module.exports = (app) => {
    app.get('/login', (req, res) => res.status(200).send({
        message: 'Welcome to the Login!',
    }));

    app.post('/register', authenticationService.verifyToken, administratorController.isAdministrator ,loginController.register);
    app.get('/token', loginController.token);

};