const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const _ = require('lodash');
const lecture = require('../models').lecture;
const user = require('../models').user;
const course = require('../models').course;
const automatedEmailAccount = require('../config/automatedEmailAccount');
const emailTemplate = require('../common/emailTemplate');
const emailService = require('./emailService');

module.exports = {
    findStudentsToRemind() {
        const today = new Date();
        const beginningToday = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
        const beginningTomorrow = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 2);
        return lecture.findAll({
            where: {
                start_hour: {
                    [Op.lt]: beginningTomorrow,
                    [Op.gte]: beginningToday
                }
            },
            attributes: [[Sequelize.fn('DISTINCT', Sequelize.col('group')), 'group']]
        })
            .then(lectures => {
                const usersInfo = [];
                _.each(lectures, lecture => {
                    usersInfo.unshift(user.findAll({
                        where: {
                            group: lecture.group,
                            reminder: true,
                            active: true
                        }
                    })
                        .then(users => {
                            const retrievedUserInfo = [];
                            _.each(users, user => {
                                retrievedUserInfo.push({
                                    email: user.email,
                                    id: user.id,
                                    language: user.language
                                })
                            });
                            return retrievedUserInfo;
                        }))
                });
                return Promise.all(usersInfo);
            })
            .then(usersInfo => {
                let usersToReturn = [];
                _.each(usersInfo, usersArray => {
                    usersToReturn = usersToReturn.concat(usersArray);
                });
                usersToReturn = _.compact(usersToReturn);
                usersToReturn = _.uniqWith(usersToReturn, _.isEqual);
                return usersToReturn;
            })
    },

    findTeachersToRemind() {
        const today = new Date();
        const beginningToday = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
        const beginningTomorrow = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 2);
        return lecture.findAll({
            where: {
                start_hour: {
                    [Op.lt]: beginningTomorrow,
                    [Op.gte]: beginningToday
                }
            },
            attributes: [[Sequelize.fn('DISTINCT', Sequelize.col('id_course')), 'id_course']]
        })
            .then(lectures => {
                const usersInfo = [];
                _.each(lectures, lecture => {
                    usersInfo.unshift(course.findByPk(lecture.id_course)
                        .then(course => {
                            if (course) {
                                return user.find({
                                    where: {
                                        id: course.id_teacher,
                                        reminder: true,
                                        active: true
                                    }
                                })
                                    .then(user => {
                                        if (user) {
                                            return {
                                                email: user.email,
                                                id: user.id,
                                                language: user.language
                                            }
                                        }
                                        return Promise.resolve();
                                    })
                            }
                            return Promise.resolve();
                        }))
                });
                return Promise.all(usersInfo);
            })
            .then(usersInfo => {
                usersInfo = _.compact(usersInfo);
                usersInfo = _.uniqWith(usersInfo, _.isEqual);

                return usersInfo;
            })
    },

    sendRemainders: function (users) {
        _.each(users, user => {
            text = emailTemplate.en;
            subject = emailTemplate.subjectEn;
            switch (user.language) {
                case 'pl': {
                    text = emailTemplate.pl;
                    subject = emailTemplate.subjectPl;
                    break;
                }
                case 'de': {
                    text = emailTemplate.de;
                    subject = emailTemplate.subjectDe;
                }

            }
            emailService.sendGmailEmail([user.email],
                subject,
                text,
                automatedEmailAccount.login,
                automatedEmailAccount.password)
                .then(respone => {
                        console.log('[ReminderService] - succesfully send email to ', user.email)
                    },
                    err => console.error(err))
        });
    }, intervalFunc() {
        module.exports.findStudentsToRemind().then(users => {
            module.exports.sendRemainders(users);
        });
        module.exports.findTeachersToRemind().then(users => {
            module.exports.sendRemainders(users);
            console.log('jahujjjj==>>', users);
        });

    }


};