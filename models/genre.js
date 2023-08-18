const mongoose = require("mongoose")
const Joi = require("joi")

const Genre = mongoose.model("Genre", new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    }
}));

// async function createMovie(){
//     const newGenre = new Genre({
//         name: "Saving Private Ryan",
//         director: "Tom Hanks",
//         genre: "Action",
//         tags: ["Movie", "Real Acting"]
//     });

//     const result = await newGenre.save()
//     console.log(result)
// }


// async function getMovies(){
//     const movies = await Genre
// .find({director: /.*s.*/i})
//     console.log(movies)
// }


// async function updateMovie(id){
//     const movie = await Genre.find(id)
//     if(!movie) return;

// }



// input validation
function validation(new_genre){
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });
    return schema.validate(new_genre)
}

exports.Genre = Genre;
exports.validate = validation;