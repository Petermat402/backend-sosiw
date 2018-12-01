const loginController = require('../../controllers').loginController;
const authenticationService = require('../../services/authenticationService');
const administratorController = require('../../controllers').administratorController;

module.exports = (app) => {

    app.post('/register', authenticationService.verifyToken, administratorController.isAdministrator ,loginController.register);
    app.get('/token', loginController.token);
    app.get('/login', loginController.login);

};