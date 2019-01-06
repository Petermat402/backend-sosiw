const gradeController = require('../../controllers').gradeController;
const authenticationService = require('../../services').authenticationService;
const userController = require('../../controllers').userController;

module.exports = (app) => {

    app.get('/grades/student', authenticationService.verifyToken, userController.isStudent, gradeController.getStudentGrades);
    app.get('/grades/teacher', authenticationService.verifyToken, userController.isTeacher, gradeController.getTeacherGrades);
    app.post('/grade', authenticationService.verifyToken, );
    app.put('/grade', authenticationService.verifyToken, userController.isTeacher, gradeController.updateGrade)

};