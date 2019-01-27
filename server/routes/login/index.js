const loginController = require('../../controllers').loginController;
const authenticationService = require('../../services').authenticationService;
const userController = require('../../controllers').userController;

module.exports = (app) => {
    app.post('/register', authenticationService.verifyToken, userController.isAdministrator ,loginController.register);
    app.get('/token', loginController.token);
    app.get('/token/validate', authenticationService.verifyToken, userController.isActiveUser, loginController.getNewToken);
    app.post('/login',  loginController.login);
    // app.get('/user', authenticationService.verifyToken, userController.isActiveUser, )
};