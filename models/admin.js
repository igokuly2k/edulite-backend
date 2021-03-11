const mongoose = require('mongoose');
const Joi = require('joi');

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
        unique: true
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
    }
});
const Admin = mongoose.model('Admin', adminSchema);

function validateAdmin(admin) {
    const schema = {
      name: Joi.string().min(5).max(50).required(),
      inst_name: Joi.string().min(5).max(255).required(),
      email: Joi.string().min(5).max(255).required().email(),
      password: Joi.string().min(5).max(255).required()
    };
  
    return Joi.validate(admin, schema);
  }
  
  exports.Admin = Admin; 
  exports.validate = validateAdmin;
