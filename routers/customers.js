const {Customer, validate} = require("../models/customer")
const express = require("express");
const router = express.Router();


// GET
router.get('/', async (req,res) => {
    const customers = await Customer.find().sort('name');
    res.send(customers);
});

router.get('/:id', async (req,res) => {
    const customers = await Customer.findById(req.params.id);
    if (!customers) return res.status(404).send(`The customer with ID number ${req.params.id} was not found`)
    
    return res.send(customers);
});


// POST
router.post('/', async (req,res) => {
    const { error } = validate(req.body)
    if (error) return res.status(400).send(error.details[0].message)
    
    let new_customer = new Customer({ 
        name: req.body.name,
        phone: req.body.phone,
        isGold: req.body.isGold
    });

    new_customer = await new_customer.save();

    res.send(new_customer)
});


// PUT
router.put('/:id', async (req,res) => {
    
    const { error } = validate(req.body)
    if (error) return res.status(400).send(error.details[0].message);

    const customer = await Customer.findByIdAndUpdate(req.params.id, { 
        name: req.body.name, 
        phone: req.body.phone,
        isGold: req.body.isGold
    }, { new: true });

    if (!customer) return res.status(404).send(`The cust with ID number ${req.params.id} was not found`);

    res.send(customer);

});


// DELETE
router.delete('/:id', async (req,res) => {
    const customer = await Customer.findByIdAndRemove(req.params.id)
    if (!customer) return res.status(404).send(`The customer with ID number ${req.params.id} was not found`);

    return res.send(customer);
});

module.exports = router;