const mongoose = require('mongoose');
const {sectionSchema} = require('../models/section');
const {meetingSchema} = require('../models/meeting');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const config = require('config');

const teacherSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024
    },
    sectionList: {
        type: [sectionSchema]
    },
    meetingList: {
        type: [meetingSchema]
    }
});
teacherSchema.methods.generateAuthToken = function() { 
    const token = jwt.sign({ _id: this._id, isTeacher: true }, config.get('jwtPrivateKey'));
    return token;
  }
const Teacher = mongoose.model('Teacher', teacherSchema);

function validateTeacher(teacher) {
    const schema = Joi.object({
        name: Joi.string().min(5).max(50).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required()
    });
    return schema.validate(teacher);
}

  exports.Teacher = Teacher; 
  exports.teacherSchema = teacherSchema;
  exports.validate = validateTeacher;