const _ = require('lodash');
const nodemailer = require('nodemailer');
module.exports = {

    sendGmailEmail(addresses, subject, text, senderEmail, senderPassword) {
        const addressesString = module.exports.convertAddressesArray(addresses);
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: senderEmail,
                pass: senderPassword
            }
        });

        const mailOptions = {
            from: senderEmail,
            to: addressesString,
            subject: subject,
            text: text
        };

        return new Promise((resolve, reject) => {
            transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                    reject(error);
                } else {
                    resolve(info);
                }
            });
        })


    },

    convertAddressesArray(addresses) {
        let resultAddresses = '';
        _.each(addresses, address => {
            resultAddresses = resultAddresses +', ' + address;
        });
        return resultAddresses;
    },


};