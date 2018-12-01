const loginController = require('./loginController');
const gradeController = require('./gradeController');
const courseController = require('./courseController');
const teacherController = require('./teacherController');
const studentController = require('./studentController');
const authorizationController = require('./authorizationController');
const administratorController = require('./administratorController')

module.exports = {
    loginController,
    gradeController,
    courseController,
    teacherController,
    studentController,
    authorizationController,
    administratorController
};