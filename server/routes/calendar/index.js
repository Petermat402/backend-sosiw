const authenticationService = require('../../services').authenticationService;
const lectureController = require('../../controllers').lectureController;

module.exports = (app) => {
    app.get('/calendar/student', authenticationService.verifyToken, lectureController.getStudentsLectures);
    app.get('/calendar/teacher', authenticationService.verifyToken, lectureController.getTeacherLectures);
};