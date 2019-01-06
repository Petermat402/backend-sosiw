const academicYear = require('../common/academicYear');

module.exports = {
    setAcademicYear() {
        const date = new Date();
        if (date.getMonth() < 9) {
            academicYear.value = (date.getFullYear() - 1).toString() + '/' + date.getFullYear().toString()

        } else {
            academicYear.value = date.getFullYear().toString() + '/' + (date.getFullYear() + 1).toString()
        }
    }
};