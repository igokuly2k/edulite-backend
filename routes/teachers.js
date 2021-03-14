const { Teacher, validate } = require('../models/teacher');
const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const { error } = validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);
        let teacher = await Teacher.findOne({ email: req.body.email });
        if (teacher) return res.status(400).send("Already User Exists");

        teacher = new Teacher(_.pick(req.body, ['name', 'email', 'password']));
        const salt = await bcrypt.genSalt(10);
        teacher.password = await bcrypt.hash(teacher.password, salt);
        teacher = await teacher.save();
        res.send(teacher);
    }
    catch (err) {
        console.log(err);
    }

});

module.exports = router;