const mongoose = require('mongoose');
const Joi = require('joi');

const meetingSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    startDate: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        enum: ['Cancelled', 'Not Yet Started', 'Ongoing'],
        default: 'Not Yet Started'
    }
});
const Meeting = mongoose.model('Meeting', meetingSchema);

function validateMeeting(meeting) {
    const schema = Joi.object({
      name: Joi.string().min(5).max(255).required()
    });
    return schema.validate(meeting);
}

  exports.Meeting = Meeting; 
  exports.meetingSchema = meetingSchema;
  exports.validate = validateMeeting;