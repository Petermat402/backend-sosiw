const config = require('../config/JWTConfig');
const randomstring = require('randomstring');

module.exports = {
    setUp() {
        config.key = randomstring.generate({
            length: 128,
            charset: config.charset
        });
    }


};

