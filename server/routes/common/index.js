const courseController = require('../../controllers').courseController;
const authenticationService = require('../../services').authenticationService;
const userController = require('../../controllers').userController;
const loginController = require('../../controllers').loginController;

module.exports = (app) => {
    app.get('/common/current/academicYear', loginController.getAcademicYear);
    app.get('/all/academicYears', authenticationService.verifyToken, userController.isActiveUser, courseController.getUniqueAcademicYear);
    app.put('/language/change', authenticationService.verifyToken, userController.changeLanguage);
    app.get('/language', authenticationService.verifyToken, userController.getLanguage)
};