const { Student, validate } = require('../models/student');
const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const auth = require('../middlewares/auth');
const adminAuth = require('../middlewares/adminAuth');
const { Section } = require('../models/section');
const router = express.Router();

router.post('/', [auth, adminAuth] , async (req, res) => {
    try {
        const { error } = validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);
        let student = await Student.findOne({ email: req.body.email });
        if (student) return res.status(400).send("Already User Exists");
        let section = await Section.findById(req.body.section);
        if (!section) return res.status(400).send("Invalid Section");

        student = new Student(_.pick(req.body, ['name', 'email', 'password','section']));
        const salt = await bcrypt.genSalt(10);
        student.password = await bcrypt.hash(student.password, salt);
        student = await student.save();
        section = await Section.findOneAndUpdate({_id: req.body.section},{$push:{studentList: student._id}},{new:true});
        res.send(student);
    }
    catch (err) {
        console.log(err);
    }
});

module.exports = router;