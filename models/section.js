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
    inst_name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique: true,
        trim: true,
        lowercase: true
    },
    meetingList: [{
        type: mongoose.Types.ObjectId,
        ref: "Meeting"
    }],
    studentList: [{
        type: mongoose.Types.ObjectId,
        ref: "Student"
    }]
});
const Section = mongoose.model('Section', sectionSchema);

function validateSection(section) {
    const schema = Joi.object({
      name: Joi.string().min(5).max(50).required(),
      inst_name: Joi.string().min(5).max(255).required()
    });
    return schema.validate(section);
}

  exports.Section = Section; 
  exports.sectionSchema = sectionSchema;
  exports.validate = validateSection;