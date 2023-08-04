const catchError = require("../utils/catchError");
const Course = require("../models/Course");
const Student = require("../models/Student");

const getAll = catchError(async (req, res) => {
  const results = await Course.findAll({ include: [Student] });
  return res.json(results);
});

const create = catchError(async (req, res) => {
  const result = await Course.create(req.body);
  return res.status(201).json(result);
});

const getOne = catchError(async (req, res) => {
  const { id } = req.params;
  const result = await Course.findByPk(id, { include: [Student] });
  if (!result) return res.sendStatus(404);
  return res.json(result);
});

const remove = catchError(async (req, res) => {
  const { id } = req.params;
  await Course.destroy({ where: { id } });
  return res.sendStatus(204);
});

const update = catchError(async (req, res) => {
  const { id } = req.params;
  const result = await Course.update(req.body, {
    where: { id },
    returning: true,
  });
  if (result[0] === 0) return res.sendStatus(404);
  return res.json(result[1][0]);
});

const setStundents = catchError(async (req, res) => {
  //1-Se debe localizar al curso que le queremos agregar sus estudiantes, esto se hace mediante el metodo de sequelize findByPk
  const { id } = req.params;
  const course = await Course.findByPk(id);

  //2-Setear los valores en nuestra instancia, esto se hace mediante el metodo de sequelize setNombre(req.body, ya que ahi se escriben nuestro estudiantes)
  await course.setStudents(req.body);

  //3-Leer nuestro cursos juntos nuestros estudiantes a travez del metodo getNombre()
  const students = await course.getStudents();
  return res.json(students);
});

module.exports = {
  getAll,
  create,
  getOne,
  remove,
  update,
  setStundents,
};
