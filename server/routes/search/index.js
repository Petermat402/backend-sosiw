const courseController = require('../../controllers').courseController;
const authenticationService = require('../../services').authenticationService;
const userController = require('../../controllers').userController;

module.exports = (app) => {
    app.get('/search/student/:searchPhrase', authenticationService.verifyToken, userController.findStudents);
    app.get('/search/teacher/:searchPhrase', authenticationService.verifyToken, userController.findTeachers);
    app.get('/search/course/:searchPhrase', authenticationService.verifyToken, courseController.findCourses);
    app.get('/search/group/:searchPhrase', authenticationService.verifyToken, userController.findStudentsByGroup);
};