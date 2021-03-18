const { Admin, validate } = require('../models/admin');
const { College, validateCollege } = require('../models/college');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const { error } = validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);
        const { errorCollege } = validateCollege({name: req.body.inst_name});
        if (errorCollege) return res.status(400).send(errorCollege.details[0].message);
        let admin = await Admin.findOne({ $or: [{ email: req.body.email }, { inst_name: req.body.inst_name }] });
        if (admin) return res.status(400).send("Already User Exists");

        admin = new Admin(_.pick(req.body, ['name', 'inst_name', 'email', 'password']));
        const salt = await bcrypt.genSalt(10);
        admin.password = await bcrypt.hash(admin.password, salt);
        let college = new College({inst_name: req.body.inst_name});
        admin = await admin.save();
        college = await college.save();
        res.send(admin);
    }
    catch (err) {
        console.log(err);
    }

});

module.exports = router;