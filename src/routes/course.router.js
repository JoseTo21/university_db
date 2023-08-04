const {
  getAll,
  create,
  getOne,
  remove,
  update,
  setStundents,
} = require("../controllers/course.controllers");
const express = require("express");

const routerCourse = express.Router();

routerCourse.route("/").get(getAll).post(create);

routerCourse.route("/:id").get(getOne).delete(remove).put(update);

// courses/:id/students
routerCourse.route("/:id/students").post(setStundents);

module.exports = routerCourse;
