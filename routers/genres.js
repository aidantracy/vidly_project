const express = require("express");
const router = express.Router();
const {Genre, validate} = require("../models/genre")


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
    const { error } = validate(req.body)
    if (error) return res.status(400).send(error.details[0].message)
    
    let new_genre = new Genre({ name: req.body.name });
    new_genre = await new_genre.save();

    res.send(new_genre)
});


// update genres PUT
router.put('/:id', async (req,res) => {
    
    const { error } = validate(req.body)
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

module.exports = router;