const grade = require('../models').grade;
const user = require('../models').user;
const course = require('../models').course;
const _ = require('lodash');
const academicYear = require('../common/academicYear');

module.exports = {
    create(req, res) {
        return grade
            .create({
                id_course: req.body.id_course,
                id_student: req.body.id_student,
                value: req.body.value
            })
            .then(grade => res.status(201).send(grade))
            .catch(error => res.status(400).send(error));
    },

    getStudentGrades(req, res, next) {
        grade.findAll({
            where: {
                id_student: req.userId
            },
            attributes: {
                exclude: ['id']
            }
        })
            .then(grades => {
                const gradesRetrieved = [];
                _.each(grades, grade => {
                    gradesRetrieved.push(course.findOne({
                        where: {
                            id: grade.id_course,
                            academicYear: req.params.academicYear,
                            semester: req.params.semester
                        }
                    })
                        .then(course => {
                            if (course) {
                                return user.findByPk(course.id_teacher)
                                    .then(teacher => {
                                        if (teacher.role !== 'T') {
                                            throw {
                                                code: 421,
                                                text: 'Wrong person assigned as teacher'
                                            }
                                        }
                                        return {
                                            courseName: course.name,
                                            teacherName: teacher.name,
                                            teacherSurname: teacher.surname,
                                            value: grade.value,
                                            term: grade.term,
                                            academicYear: course.academicYear,
                                            semester: course.semester
                                        }
                                    })
                            } else return Promise.resolve();
                        }))
                });
                return Promise.all(gradesRetrieved);
            })
            .then(gradesRetrieved => {
                const gradesToSend = _.compact(gradesRetrieved);
                res.status(200).send(gradesToSend);
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

    getTeacherGrades(req, res, next) {
        course.findAll({
            where: {
                id_teacher: req.userId,
                academicYear: req.params.academicYear,
                semester: req.params.semester
            }
        })
            .then(courses => {
                const gradesToSend = [];
                _.each(courses, course => {
                    gradesToSend.push(grade.findAll({
                        where: {
                            id_course: course.id
                        },
                        attributes: {
                            exclude: ['id']
                        }
                    })
                        .then(grades => {
                            const gradesExtracted = [];
                            _.each(grades, grade => {
                                gradesExtracted.push(new Promise((resolve, reject) => {
                                    resolve({
                                        courseId: course.id,
                                        courseName: course.name,
                                        academicYear: course.academicYear,
                                        semester: course.semester,
                                        value: grade.value,
                                        studentId: grade.id_student,
                                        term: grade.term
                                    })
                                }))
                            });

                            return Promise.all(gradesExtracted)
                        }))
                });
                return Promise.all(gradesToSend)
            })
            .then(gradesToSend => {
                res.status(200).send(gradesToSend);
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

    updateGrade(req, res, next) {
        grade.findOne(
            {
                where: {
                    id_course: req.body.courseId,
                    id_student: req.body.studentId,
                    term: req.body.term
                },
                attributes: {
                    exclude: ['id']
                }
            })
            .then(foundGrade => {
                if (foundGrade) {
                    return course.findByPk(foundGrade.id_course).then(course => {
                        if (course.academicYear === academicYear.value) {
                            return foundGrade.update({
                                value: req.body.value
                            })
                        }
                        throw {
                            code: 452,
                            text: 'Cannot modify grades when academic year ended'
                        }
                    })


                }
                throw {
                    code: 454,
                    text: 'No such grade entry'
                }
            })
            .then(grade => {
                res.status(200).send(grade);
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


}
;