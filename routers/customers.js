const Joi = require("joi")
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose")


const Customer = mongoose.model("Customer", new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    isGold: {
        type: Boolean,
        default: false
    },
    phone: {
        type: String,
        required: true,
        length: 10
    },
}));


router.get('/', async (req,res) => {
    const customers = await Customer.find().sort('name');
    res.send(customers);
});

router.get('/:id', async (req,res) => {
    const customers = await Customer.findById(req.params.id);
    if (!customers) return res.status(404).send(`The customer with ID number ${req.params.id} was not found`)
    
    return res.send(customers);
});


router.post('/', async (req,res) => {
    const { error } = validation(req.body)
    if (error) return res.status(400).send(error.details[0].message)
    
    let new_customer = new Customer({ 
        name: req.body.name,
        phone: req.body.phone,
        isGold: req.body.isGold
    });

    new_customer = await new_customer.save();

    res.send(new_customer)
});


// input validation
function validation(cust){
    const schema = Joi.object({
        name: Joi.string().min(10).required(),
        phone: Joi.string().min(10).required(),
        isGold: Joi.boolean()
    });
    return schema.validate(cust)
}


module.exports = router;
