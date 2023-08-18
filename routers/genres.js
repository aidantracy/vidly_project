const Joi = require("joi")
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose")


const Genre = mongoose.model("Genre", new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    }
}));


async function createMovie(){
    const newGenre = new Genre({
        name: "Saving Private Ryan",
        director: "Tom Hanks",
        genre: "Action",
        tags: ["Movie", "Real Acting"]
    });

    const result = await newGenre.save()
    console.log(result)
}

async function getMovies(){
    const movies = await Genre
.find({director: /.*s.*/i})
    console.log(movies)
}


async function updateMovie(id){
    const movie = await Genre.find(id)
    if(!movie) return;

    

}

// find and disply genres GET
router.get('/', async (req,res) => {
    const genres = await Genre.find().sort('name');
    res.send(genres);
});

router.get('/:id', async (req,res) => {
    const genre = await Genre.findById(req.params.id);
    if (!genre) return res.status(404).send(`The genre with ID number ${req.params.id} was not found`)
    
    return res.send(genre);
});
// create genres POST

router.post('/', async (req,res) => {
    const { error } = validation(req.body)
    if (error) return res.status(400).send(error.details[0].message)
    
    let new_genre = new Genre({ name: req.body.name });
    new_genre = await new_genre.save();

    res.send(new_genre)
});


// update genres PUT
router.put('/:id', async (req,res) => {
    
    const { error } = validation(req.body)
    if (error) return res.status(400).send(error.details[0].message);

    const genre = await Genre.findByIdAndUpdate(req.params.id, { name: req.body.name}, {
        new: true
    });

    if (!genre) return res.status(404).send(`The genre with ID number ${req.params.id} was not found`);

    res.send(genre);

});

// delete genres DELETE

router.delete('/:id', async (req,res) => {
    const genre = await Genre.findByIdAndRemove(req.params.id)
    if (!genre) return res.status(404).send(`The genre with ID number ${req.params.id} was not found`);

    return res.send(genre);
});

// input validation
function validation(new_genre){
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });
    return schema.validate(new_genre)
}



module.exports = router;
