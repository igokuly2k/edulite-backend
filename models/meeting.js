const mongoose = require('mongoose');

const meetingSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: "Teacher",
        required: true
    },
    startDate: {
        type: Date
    },
    status: {
        type: String,
        enum: ['Cancelled', 'Not Yet Started', 'Ongoing'],
        default: 'Not Yet Started'
    }
});
const Meeting = mongoose.model('Meeting', meetingSchema);

exports.Meeting = Meeting; 
exports.meetingSchema = meetingSchema;