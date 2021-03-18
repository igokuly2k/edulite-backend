const mongoose = require('mongoose');
const config = require('config');
const Joi = require('joi-oid');
const jwt = require('jsonwebtoken');

const studentSchema = new mongoose.Schema({
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
    section: {
        type: mongoose.Types.ObjectId,
        ref: 'Section',
        required: true
    }
});
studentSchema.methods.generateAuthToken = function() { 
    const token = jwt.sign({ _id: this._id, isStudent: true }, config.get('jwtPrivateKey'));
    return token;
  }
const Student = mongoose.model('Student', studentSchema);

function validateStudent(student) {
    const schema = Joi.object({
        name: Joi.string().min(5).max(50).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required(),
        section: Joi.objectId()
    });
    return schema.validate(student);
}

  exports.Student = Student; 
  exports.studentSchema = studentSchema;
  exports.validate = validateStudent;