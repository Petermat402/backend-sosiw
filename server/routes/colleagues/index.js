const authenticationService = require('../../services').authenticationService;
const userController = require('../../controllers').userController;

module.exports = (app) =>{
    app.get('/colleagues', authenticationService.verifyToken, userController.getColleagues);
};