const express = require("express");
const router = express.Router();
const {Movie, validateMovie} = require("../models/movie")
const {  Genre } = require("../models/genre")



// find and disply genres GET
router.get('/', async (req,res) => {
    const movies = await Movie.find().sort('name');
    res.send(movies);
});

router.get('/:id', async (req,res) => {
    const movies = await Movie.findById(req.params.id);
    if (!movies) return res.status(404).send(`The movie with ID number ${req.params.id} was not found`)
    
    return res.send(movies);
});


// create genres POST
router.post('/', async (req,res) => {
    const { error } = validateMovie(req.body)
    if (error) return res.status(400).send(error.details[0].message)
    
    const genre = await Genre.findById(req.body.genreId);
    if (!genre) return res.status(400).send("invalid genre");


    const movie = new Movie({
        title: req.body.title,
        genre: {
            _id: genre._id,
            name: genre.name
        },
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate
    })
    await movie.save()
    res.send(movie)
});


// update movie PUT
router.put('/:id', async (req,res) => {
    
    const { error } = validateMovie(req.body)
    if (error) return res.status(400).send(error.details[0].message);

    const movie = await Movie.findByIdAndUpdate(req.params.id, {name: req.body.name}, {
        new: true
    });

    if (!movie) return res.status(404).send(`The movie with ID number ${req.params.id} was not found`);

    res.send(movie);

});


// delete genres DELETE
router.delete('/:id', async (req,res) => {
    const movie = await Movie.findByIdAndRemove(req.params.id)
    if (!movie) return res.status(404).send(`The movie with ID number ${req.params.id} was not found`);

    return res.send(movie);
});

module.exports = router;