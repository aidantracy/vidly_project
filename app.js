const Joi = require("joi")
const express = require("express");
const app = express();
// middleware
app.use(express.json());


const genres = [
    {id: 1, genre:"horror"},
    {id: 2, genre:"action"},
    {id: 3, genre:"comedy"}
]


// find and disply genres GET
app.get('/', (req,res) => {
    res.send("hello world!");
});

app.get('/api/genres', (req,res) => {
    res.send(genres);
});

app.get('/api/genres/:id', (req,res) => {
    const genre = genres.find(g => g.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send(`The genre with ID number ${req.params.id} was not found`)
    
    return res.send(genre);
});
// create genres POST

app.post('/api/genres', (req,res) => {
    const new_genre = {
        id: genres.length + 1,
        genre: req.body.genre
    };
    
    const { error } = validation(new_genre)
    if (error) return res.status(400).send(error.details[0].message)
    genres.push(new_genre);
    res.send(new_genre)
});


// update genres PUT
app.put('/api/genres/:id', (req,res) => {
    const genre = genres.find(g => g.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send(`The genre with ID number ${req.params.id} was not found`)

    // here

});

// delete genres DELETE


// input validation
function validation(new_genre){
    const schema = Joi.object({
        genre: Joi.string().min(3).required()
    });
    return schema.validate(new_genre)
}

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}`));