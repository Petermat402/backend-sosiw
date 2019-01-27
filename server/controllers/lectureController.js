const Sequelize = require('sequelize');
const course = require('../models').course;
const lecture = require('../models').lecture;
const user = require('../models').user;
const _ = require('lodash');
const Op = Sequelize.Op;
const academicYear = require('../common/academicYear');

module.exports = {
    create(req, res) {
        return lecture
            .create({
                id_course: req.body.id_course,
                start_hour: req.body.start_hour,
                group: req.body.group,
                room: req.body.room
            })
            .then(lecture => res.status(201).send(lecture))
            .catch(error => res.status(400).send(error));
    },

    getStudentsLectures(req, res, next) {
        user.findByPk(req.userId)
            .then(foundUser => {
                if(foundUser && foundUser.active && foundUser.role === 'S') {
                    return lecture.findAll({
                        where: {
                            group: foundUser.group
                        }
                    })
                        .then(lectures => {
                            const lecturesRetrieved = [];
                            _.each(lectures, lecture => {
                                lecturesRetrieved.push(course.findOne({
                                    where: {
                                        id: lecture.id_course,
                                        academicYear: academicYear.value
                                    }
                                })
                                    .then(foundCourse => {
                                        if(foundCourse) {
                                            let endDate = new Date(lecture.start_hour);
                                            endDate.setHours(endDate.getHours()+1);
                                            endDate.setMinutes(endDate.getMinutes()+35);
                                            return {
                                                id: lecture.id,
                                                start_hour: lecture.start_hour,
                                                end_hour: new Date(endDate),
                                                group: lecture.group,
                                                id_course: foundCourse.id,
                                                courseName: foundCourse.name,
                                                room: lecture.room
                                            }
                                        }
                                        return Promise.resolve();
                                    }))
                            });
                            return Promise.all(lecturesRetrieved);
                        });
                }
                throw {
                    code: 420,
                    text: 'No such active user'
                }
            })
            .then(lectures => {
                const lecturesToSend = _.compact(lectures);
                res.status(200).send(lecturesToSend);
            })
            .catch(err => {
                console.error(err);
                if (err.code) {
                    res.status(err.code).send(err.text)
                } else {
                    res.status(400).send(err)
                }
            })
    },

    getTeacherLectures(req, res, next) {
        user.findByPk(req.userId)
            .then(foundUser => {
                if(foundUser && foundUser.active && foundUser.role === 'T') {
                    return course.findAll({
                        where: {
                            id_teacher: foundUser.id,
                            academicYear: academicYear.value
                        }})
                        .then(courses => {
                            const lecturesRetrieved = [];
                            if(courses) {
                                _.each(courses, course => {
                                    lecturesRetrieved.unshift(lecture.findAll({
                                        where: {
                                            id_course: course.id
                                        }
                                    })
                                        .then(lectures => {
                                            const coursesLectures = [];
                                            if(lectures) {
                                                _.each(lectures, lecture => {
                                                    let endDate = new Date(lecture.start_hour);
                                                    endDate.setHours(endDate.getHours()+1);
                                                    endDate.setMinutes(endDate.getMinutes()+35);
                                                    coursesLectures.push({
                                                        id: lecture.id,
                                                        start_hour: lecture.start_hour,
                                                        end_hour: new Date(endDate),
                                                        group: lecture.group,
                                                        id_course: course.id,
                                                        courseName: course.name,
                                                        room: lecture.room
                                                    })
                                                })
                                            }
                                            return coursesLectures;
                                        }))
                                })
                            }
                            return Promise.all(lecturesRetrieved);
                        })
                }
                throw {
                    code: 420,
                    text: 'No such active user'
                }
            })
            .then(lectures => {
                let lecturesToSend = [];
                _.each(lectures, lectureArray => {
                    lecturesToSend = lecturesToSend.concat(lectureArray);
                });
                lecturesToSend = _.compact(lecturesToSend);
                res.status(200).send(lecturesToSend);
            })
            .catch(err => {
                console.error(err);
                if (err.code) {
                    res.status(err.code).send(err.text)
                } else {
                    res.status(400).send(err)
                }
            })
    }

};