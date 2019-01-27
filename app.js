const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

require('./server/routes/login')(app);
require('./server/routes/grade')(app);
require('./server/routes/search')(app);
require('./server/routes/settings')(app);
require('./server/routes/colleagues')(app);
require('./server/routes/email')(app);
require('./server/routes/common')(app);
require('./server/routes/calendar')(app);
require('./server/routes/recovery')(app);
app.get('*', (req, res) => res.status(200).send({
    message: 'Welcome to the beginning of nothingness.',
}));
module.exports = app;