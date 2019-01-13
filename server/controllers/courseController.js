const Sequelize = require('sequelize');
const course = require('../models').course;
const user = require('../models').user;
const _ = require('lodash');
const Op = Sequelize.Op;

module.exports = {
    create(req, res) {
        return course
            .create({
                name: req.body.name,
                id_teacher: req.body.id_teacher
            })
            .then(course => res.status(201).send(course))
            .catch(error => res.status(400).send(error));
    },

    findCourses(req, res, next) {
        course.findAll({
            where: {
                name: {
                    [Op.iLike]: '%' + req.params.searchPhrase + '%'
                }
            }
        }).then(courses => {
            const coursesToSend = [];
            _.each(courses, course => {
                coursesToSend.push(user.findByPk(course.id_teacher)
                    .then(user => {
                        return {
                            id: course.id,
                            name: course.name,
                            teacherName: user.name,
                            teacherSurname: user.surname,
                            department: user.departament,
                            email: user.email,
                            academicYear: course.academicYear,
                            semester: course.semester
                        }
                    }))
            });
            return Promise.all(coursesToSend);
        }).then(coursesToSend => {
            res.status(200).send(coursesToSend);
        }).catch(err => {
            console.log(err);
            if (err.code) {
                res.status(err.code).send(err.text)
            } else {
                res.status(400).send(err)
            }
        })
    },

    getUniqueAcademicYear(req, res, next) {
        course.findAll({
            attributes: [[Sequelize.fn('DISTINCT', Sequelize.col('academicYear')), 'academicYear']]
        })
            .then(courses => {
                res.status(200).send(courses);
            })
            .catch(error => {
                res.status(400).send(error);
            })
    }
};