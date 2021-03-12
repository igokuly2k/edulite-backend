const { Admin, validate } = require('../models/admin');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.post('/', async (req,res) => {
    try{
    const { error } = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    const user = Admin.findOne({ email: req.body.email });
    if (user) return res.status(400).send("Already User Exists with this email id");
    const user1 = Admin.findOne({ email: req.body.email });
    if (user1) return res.status(400).send("Already User Exists with this Instituion");

    let admin = new Admin({
        name: req.body.name,
        inst_name: req.body.inst_name,
        email: req.body.email,
        password: req.body.password
    });
    admin = await admin.save();
    res.send(admin);
    }
    catch(err){
        console.log(err);
    }

});

module.exports = router;