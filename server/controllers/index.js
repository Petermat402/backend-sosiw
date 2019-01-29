const loginController = require('./loginController');
const gradeController = require('./gradeController');
const courseController = require('./courseController');
const authorizationController = require('./authorizationController');
const userController = require('./userController');
const credentialController = require('./credentialController');
const emailController = require('./emailController');
const lectureController = require('./lectureController');
const recoveryController = require('./recoveryController');

module.exports = {
    loginController,
    gradeController,
    courseController,
    authorizationController,
    userController,
    credentialController,
    emailController,
    lectureController,
    recoveryController
};