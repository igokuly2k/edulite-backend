const mongoose = require('mongoose');
const Joi = require('joi');
const { sectionSchema } = require('./section');
const { teacherSchema } = require('./teacher');

const collegeSchema = new mongoose.Schema({
  inst_name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true,
    trim: true,
    lowercase: true
  },
  sectionList: [{
    type: mongoose.Types.ObjectId, ref:'Section'}],
  teacherList: [{
    type: mongoose.Types.ObjectId, ref:'Teacher'}]

});
const College = mongoose.model('College', collegeSchema);

function validateCollege(college) {
  const schema = Joi.object({
    inst_name: Joi.string().min(5).max(255).required()
  });
  return schema.validate(college);
}

exports.College = College;
exports.validateCollege = validateCollege;
