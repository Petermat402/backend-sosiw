const loginController = require('../../controllers').loginController;
const authenticationService = require('../../services').authenticationService;
const userController = require('../../controllers').userController;
const cors = require('cors')

module.exports = (app) => {
    app.post('/register', authenticationService.verifyToken, userController.isAdministrator ,loginController.register);
    app.get('/token', loginController.token);
    app.post('/login',  loginController.login);

};