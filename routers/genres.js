const Joi = require("joi")
const express = require("express");
const router = express.Router();



const genres = [
    {id: 1, genre:"horror"},
    {id: 2, genre:"action"},
    {id: 3, genre:"comedy"}
]


// find and disply genres GET
router.get('/', (req,res) => {
    res.send(genres);
});

router.get('/:id', (req,res) => {
    const genre = genres.find(g => g.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send(`The genre with ID number ${req.params.id} was not found`)
    
    return res.send(genre);
});
// create genres POST

router.post('/', (req,res) => {
    const { error } = validation(req.body)
    if (error) return res.status(400).send(error.details[0].message)
    
    const new_genre = {
        id: genres.length + 1,
        genre: req.body.genre
    };
    
    genres.push(new_genre);
    res.send(new_genre)
});


// update genres PUT
router.put('/:id', (req,res) => {
    const genre = genres.find(g => g.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send(`The genre with ID number ${req.params.id} was not found`);

    const { error } = validation(req.body)
    if (error) return res.status(400).send(error.details[0].message);

    genre.genre = req.body.genre
    res.send(genre)

});

// delete genres DELETE

router.delete('/:id', (req,res) => {
    const genre = genres.find(g => g.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send(`The genre with ID number ${req.params.id} was not found`);

    const index = genres.indexOf(genre);
    genres.splice(index, 1);

    return res.send(genre);

});

// input validation
function validation(new_genre){
    const schema = Joi.object({
        genre: Joi.string().min(3).required()
    });
    return schema.validate(new_genre)
}



module.exports = router;
