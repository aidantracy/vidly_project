const Joi = require("joi")
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


// input validation
function validation(cust){
    const schema = Joi.object({
        name: Joi.string().min(3).required(),
        phone: Joi.string().min(10).required(),
        isGold: Joi.boolean()
    });
    return schema.validate(cust)
}

exports.Customer = Customer;
exports.validate = validation;