const Joi = require('joi');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const {Admin} = require('../models/admin');
const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  let admin = await Admin.findOne({ email: req.body.email });
  if (!admin) return res.status(400).send('Invalid email or password.');

  const validPassword = await bcrypt.compare(req.body.password, admin.password);
  if (!validPassword) return res.status(400).send('Invalid email or password.');

  const token = admin.generateAuthToken();
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