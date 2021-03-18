const { Meeting } = require('../models/meeting');
const { Section } = require('../models/section');
const {Teacher} = require('../models/teacher');
const express = require('express');
const _ = require('lodash');
const auth = require('../middlewares/auth');
const teacherAuth = require('../middlewares/teacherAuth');
const Joi = require('joi-oid');
const router = express.Router();

function validateMeeting(meeting) {
    const schema = Joi.object({
        name: Joi.string().min(5).max(255).required(),
        sections: Joi.array().items(Joi.objectId())
    });
    return schema.validate(meeting);
}
router.post('/', [auth, teacherAuth], async (req, res) => {
    try {
        const { error } = validateMeeting(req.body);
        if (error) return res.status(400).send(error.details[0].message);
        let teacher = await Teacher.findById(req.user._id);
        if (!teacher) return res.status(400).send("User does'nt exist! ");

        let meeting = new Meeting(_.pick(req.body, ['name']));
        meeting.createdBy = req.user._id;
        meeting = await meeting.save();
        req.body.sections.forEach(async (element) => await Section.findByIdAndUpdate({ _id: element }, { $push: { meetingList: meeting._id } }, { new: true }));
        res.send(meeting);
    }
    catch (err) {
        console.log(err);
    }

});
router.get('/', auth, async (req,res) => {
    if(req.user.isTeacher == true){
        const meetingList= await Meeting.find({createdBy:req.user._id},'name');
        res.send(meetingList);
    }
    else if(req.user.isStudent == true){
        const meetingList=await Section.find({_id: req.user.section},'meetingList').populate('meetingList', 'name');
        res.send(meetingList);
    }
});
router.put('/:cancel', [auth,teacherAuth], async (req,res) => {
    const meeting = await Meeting.findByIdAndUpdate(req.params.cancel, {status: "Cancelled"});
    res.send(meeting);
});
router.put('/:start', [auth,teacherAuth], async (req,res) => {
    const meeting = await Meeting.findByIdAndUpdate(req.params.start, {status: "Ongoing"});
    res.send(meeting);
});

module.exports = router;