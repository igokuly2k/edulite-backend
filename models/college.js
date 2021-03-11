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
        unique: true
    },
    sectionList: {
      type: [sectionSchema]
    },
    teacherList: {
      type: [teacherSchema]
    }
});
const College = mongoose.model('College', collegeSchema);

function validateCollege(college) {
    const schema = {
      inst_name: Joi.string().min(5).max(255).required()
    };
    return Joi.validate(college, schema);
}

  exports.College = College; 
  exports.validate = validateCollege;
