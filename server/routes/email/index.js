const emailController = require('../../controllers').emailController;
const authenticationService = require('../../services').authenticationService;

module.exports = (app) => {
    app.post('/email', authenticationService.verifyToken,  emailController.sendEmail);
    app.post('/email/users', authenticationService.verifyToken,  emailController.sendEmailUsers);
    app.post('/email/groups', authenticationService.verifyToken, emailController.sendEmailGroups);
    app.post('/email/departments', authenticationService.verifyToken, emailController.sendEmailDepartments);
};