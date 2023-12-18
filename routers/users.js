const bcrypt = require("bcrypt");
const _ = require("lodash");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const {User, validate} = require("../models/user")


// find and disply genres GET
router.post('/', async (req,res) => {
    const { error } = validate(req.body)
    if (error) return res.status(400).send(error.details[0].message)
    
    // check if user is already in the database
    let user = await User.findOne({ email : req.body.email });
    if (user) return res.status(400).send("User Already Registered");

    // instantiate a new user
    user = new User(_.pick(["name", "email", "password"]));

    //hash user password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    
    //save user to database
    await user.save();

    //display on console
    res.send(_.pick(user, ["_id", "name", "email"]));
});

module.exports = router;
