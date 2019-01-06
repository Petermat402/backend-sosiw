const Sequelize = require('sequelize');
const user = require('../models').user;
const _ = require('lodash');
const Op = Sequelize.Op;
module.exports = {
    create(req, res, id) {
        return user
            .create({
                id: id,
                name: req.body.name,
                surname: req.body.surname,
                pesel: req.body.pesel,
                email: req.body.email,
                group: req.body.group,
                departament: req.body.departament,
                role: req.body.role
            })
    },

    findByIdentyficator(id) {
        return user.findByPk(id)
    },

    isAdministrator(req, res, next) {
        user.findByPk(req.userId).then(user => {
                if (user.role === 'A') {
                    next();
                } else {
                    res.status(401).send("unathorized user")
                }
            }
        )
    },
    isStudent(req, res, next) {
        user.findByPk(req.userId).then(user => {
                if (user.role === 'S') {
                    next();
                } else {
                    res.status(401).send("unathorized user")
                }
            }
        )
    },
    isTeacher(req, res, next) {
        user.findByPk(req.userId).then(user => {
                if (user.role === 'T') {
                    next();
                } else {
                    res.status(401).send("unathorized user")
                }
            }
        )
    },

    changeEmail(req, res, next) {
        user.findByPk(req.userId)
            .then(user => {
                if (!user) {
                    throw {
                        code: 420,
                        text: 'No such user'
                    }
                }
                return user.update({
                    email: req.body.email
                })
            })
            .then(() => {
                res.status(200).send({
                    message: 'email succesfully updated'
                })
            })
            .catch(err => {
                if (err.code) {
                    res.status(err.code).send(err.text)
                } else {
                    res.status(400).send(err)
                }
            })
    },

    getColleagues(req, res, next) {
        user.findByPk(req.userId)
            .then(foundUser => {
                if (!foundUser) {
                    throw {
                        code: 420,
                        text: 'No such user'
                    }
                }
                if (foundUser.role === 'S') {
                    return user.findAll({
                        where: {
                            group: foundUser.group
                        }
                    })
                } else {
                    return user.findAll({
                        where: {
                            departament: foundUser.departament,
                            role: {
                                [Op.or]: ['T', 'A']
                            }

                        }
                    })
                }

            })
            .then(users => {
                _.each(users, user => {
                    user.pesel = 0;
                });
                res.status(200).send(users)
            })
            .catch(err => {
                if (err.code) {
                    console.log(err);
                    res.status(err.code).send(err.text)
                } else {
                    console.log(err);
                    res.status(400).send(err)
                }
            })

    },

    findStudents(req, res, next) {
        module.exports.findUsersBySearchPattern('S', req.params.searchPhrase)
            .then(users => {
                _.each(users, user => {
                    user.pesel = 0;
                });
                res.status(200).send(users);
            })
            .catch(err => {
                if (err.code) {
                    console.log(err);
                    res.status(err.code).send(err.text)
                } else {
                    console.log(err);
                    res.status(400).send(err)
                }
            })

    },

    findTeachers(req, res, next) {
        module.exports.findUsersBySearchPattern('T', req.params.searchPhrase)
            .then(users => {
                _.each(users, user => {
                    user.pesel = 0;
                });
                res.status(200).send(users);
            })
            .catch(err => {
                if (err.code) {
                    console.log(err);
                    res.status(err.code).send(err.text)
                } else {
                    console.log(err);
                    res.status(400).send(err)
                }
            });
    },

    findStudentsByGroup(req, res, next) {
        user.findAll({
            where: {
                group: req.params.searchPhrase
            }
        }).then(users => {
            _.each(users, user => {
                user.pesel = 0;
            });
            res.status(200).send(users);
        }).catch(err => {
            if (err.code) {
                console.log(err);
                res.status(err.code).send(err.text)
            } else {
                console.log(err);
                res.status(400).send(err)
            }
        });
    },

    findUsersBySearchPattern(role, searchPhrase) {
        const searchId = _.parseInt(searchPhrase);
        if (_.isInteger(searchId)) {
            return user.findAll({
                where: {
                    role: role,
                    id: searchId
                }
            })
        } else
            return user.findAll({
                where: {
                    role: role,
                    [Op.or]: [
                        {
                            name: {
                                [Op.iLike]: '%' + searchPhrase + '%'
                            }
                        },
                        {
                            surname: {
                                [Op.iLike]: '%' + searchPhrase + '%'
                            }
                        },
                        {
                            email: {
                                [Op.iLike]: '%' + searchPhrase + '%'
                            }
                        }]
                }
            })


    }


};