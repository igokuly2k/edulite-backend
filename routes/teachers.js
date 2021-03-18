const { Teacher, validate } = require('../models/teacher');
const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const auth = require('../middlewares/auth');
const adminAuth = require('../middlewares/adminAuth');
const { College } = require('../models/college');
const teacherAuth = require('../middlewares/teacherAuth');
const router = express.Router();

router.post('/', [auth,adminAuth], async (req, res) => {
    try {
        const { error } = validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);
        let teacher = await Teacher.findOne({ email: req.body.email });
        if (teacher) return res.status(400).send("Already User Exists");

        teacher = new Teacher(_.pick(req.body, ['name', 'email', 'password']));
        const salt = await bcrypt.genSalt(10);
        teacher.password = await bcrypt.hash(teacher.password, salt);
        teacher = await teacher.save();
        let college = await College.findOneAndUpdate({inst_name: req.user.inst_name},{$push:{teacherList: teacher._id}},{new:true});
        res.send(teacher);
    }
    catch (err) {
        console.log(err);
    }

});
router.get('/', auth, async(req,res) => {
    if(req.user.isAdmin == true){
    const teachers = await College.findOne({"inst_name": req.user.inst_name}, 'teacherList').populate('teacherList','name email');
    res.send(teachers);
    }
    else if(req.user.isTeacher == true){
        const teacherInfo = await Teacher.findById(req.user._id,'-password');
        res.send(teacherInfo);
    }
});

module.exports = router;