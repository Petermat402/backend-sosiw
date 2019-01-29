const recoveryController = require('../../controllers').recoveryController;
const credentialController = require('../../controllers').credentialController;
const authenticationService = require('../../services').authenticationService;
module.exports = (app) => {
    app.put('/recovery', recoveryController.sendEmailWithRecoveryLink);
    app.post('/recovery/password', authenticationService.verifyToken, credentialController.recoverPassword)
};