const userController = require('../../controllers').userController;
const credentialController = require('../../controllers').credentialController;
const authenticationService = require('../../services').authenticationService;

module.exports = (app) =>{
    app.put('/settings/changeEmail', authenticationService.verifyToken, userController.changeEmail);
    app.put('/settings/changePassword', authenticationService.verifyToken, credentialController.changePassword)
};