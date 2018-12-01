const loginController = require('../../controllers').loginController;
const authenticationService = require('../../services/authenticationService');

module.exports = (app) => {
    app.get('/login', (req, res) => res.status(200).send({
        message: 'Welcome to the Login!',
    }));

    app.post('/register', authenticationService.verifyToken, loginController.register);
    app.get('/token', loginController.token);

};