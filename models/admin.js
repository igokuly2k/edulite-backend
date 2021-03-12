const mongoose = require('mongoose');
const Joi = require('joi');
const jwt = require('jsonwebtoken');

const adminSchema = new mongoose.Schema({
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
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024
    }
});
adminSchema.methods.generateAuthToken = function() { 
    const token = jwt.sign({ _id: this._id }, config.get('jwtPrivateKey'));
    return token;
  }
const Admin = mongoose.model('Admin', adminSchema);

function validateAdmin(admin) {
    const schema = Joi.object({
        name: Joi.string().min(5).max(50).required(),
        inst_name: Joi.string().min(5).max(255).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required()
    });

    const validation = schema.validate(admin);
    return validation;
}

exports.Admin = Admin;
exports.validate = validateAdmin;
