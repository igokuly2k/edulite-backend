const { Section, validate } = require('../models/section');
const { College } = require('../models/college');
const auth = require('../middlewares/auth');
const _ = require('lodash');
const adminAuth = require('../middlewares/adminAuth');
const express = require('express');
const router = express.Router();

router.post('/', [auth,adminAuth], async (req,res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    let section = await Section.findOne({ email: req.body.email });
    if (section) return res.status(400).send("Already User Exists");

    section = new Section(_.pick(req.body, ['name']));
    section.inst_name = req.user.inst_name;
    section = await section.save();
    let college = await College.findOneAndUpdate({inst_name: req.user.inst_name},{$push:{sectionList: section._id}},{new:true});
    res.send(section);
});
router.get('/', auth, async(req,res) => {
    const sections = await Section.find({"inst_name": req.user.inst_name}, 'name');
    res.send(sections); 
});
module.exports = router;