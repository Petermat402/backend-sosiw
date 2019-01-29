const courseController = require('../../controllers').courseController;
const authenticationService = require('../../services').authenticationService;
const userController = require('../../controllers').userController;
const loginController = require('../../controllers').loginController;

module.exports = (app) => {
    app.get('/common/current/academicYear', loginController.getAcademicYear);
    app.get('/all/academicYears', authenticationService.verifyToken, userController.isActiveUser, courseController.getUniqueAcademicYear);
    app.put('/language/change', authenticationService.verifyToken, userController.changeLanguage);
    app.get('/language', authenticationService.verifyToken, userController.getLanguage);
    app.put('/reminder', authenticationService.verifyToken, userController.setReminder);
    app.get('/active/:login', authenticationService.verifyToken, userController.isAdministrator, userController.checkIfUserIsActive);
    app.put('/activate', authenticationService.verifyToken, userController.isAdministrator, userController.activateUser);
    app.put('/deactivate', authenticationService.verifyToken, userController.isAdministrator, userController.deactivateUser);
};