const loginController = require('../../controllers').loginController;
const authenticationService = require('../../services').authenticationService;
const userController = require('../../controllers').userController;
const credentialController = require('../../controllers').credentialController;

module.exports = (app) => {
    app.get('/register/username/:login', authenticationService.verifyToken, userController.isAdministrator, credentialController.findUsername);
    app.post('/register', authenticationService.verifyToken, userController.isAdministrator ,loginController.register);
    app.get('/token', loginController.token);
    app.get('/token/validate', authenticationService.verifyToken, userController.isActiveUser, loginController.getNewToken);
    app.post('/login',  loginController.login);
    // app.get('/user', authenticationService.verifyToken, userController.isActiveUser, )
};