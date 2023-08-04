const Course = require("./Course");
const Student = require("./Student");

Student.belongsToMany(Course, { through: "studentCourse" });
Course.belongsToMany(Student, { through: "studentCourse" });
