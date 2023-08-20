const mongoose = require("mongoose")
const Joi = require("joi")

const genreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    }
});

const Genre = mongoose.model("Genre", genreSchema);


// input validation
function validation(new_genre){
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });
    return schema.validate(new_genre)
}

exports.genreSchema = genreSchema;
exports.Genre = Genre;
exports.validate = validation;