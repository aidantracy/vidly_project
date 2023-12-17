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
    user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });
    
    //save to database
    await user.save();

    //display on console
    res.send(user);
});

module.exports = router;
