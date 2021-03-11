const mongoose = require('mongoose');
const Joi = require('joi');
const { meetingSchema } = require('./meeting');
const { studentSchema } = require('./student');
const sectionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    meetingList: {
        type: [meetingSchema]
    },
    studentList: {
        type: [studentSchema]
    }
});
const Section = mongoose.model('Section', sectionSchema);

function validateSection(section) {
    const schema = {
      name: Joi.string().min(5).max(50).required()
    };
    return Joi.validate(section, schema);
}

  exports.Section = Section; 
  exports.sectionSchema = sectionSchema;
  exports.validate = validateSection;