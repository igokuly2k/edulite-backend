const Joi = require('joi');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const {Student} = require('../models/student');
const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  let student = await Student.findOne({ email: req.body.email });
  if (!student) return res.status(400).send('Invalid email or password.');

  const validPassword = await bcrypt.compare(req.body.password, student.password);
  if (!validPassword) return res.status(400).send('Invalid email or password.');

  const token = student.generateAuthToken();
  res.send(token);
});

function validate(req) {
  const schema = Joi.object({
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required()
  });

  const validation =  schema.validate(req);
  return validation;
}

module.exports = router; 