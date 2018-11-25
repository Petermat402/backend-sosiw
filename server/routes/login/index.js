const credentialController = require('../controllers').credentialController;

module.exports = (app) => {
    app.get('/login', (req, res) => res.status(200).send({
        message: 'Welcome to the Todos API!',
    }));

   // app.post('/login/credentialCreate', credentialController.create);

};