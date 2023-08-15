const express = require("express");
const mongoose = require("mongoose")
const app = express();
const genres = require("./routers/genres")
// this needs to be moved to a config file
const uri = "mongodb+srv://aidantracy:rootroot@vidlydemocluster.aew1dex.mongodb.net/?retryWrites=true&w=majority"


// middleware
app.use(express.json());
app.use("/api/genres", genres);


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}`));


async function connectdb() {
    try{
        await mongoose.connect(uri)
        console.log("Connected to MongoDB...")
    } catch(error) {
        console.log(error)
    }
};

connectdb();


const genreSchema = new mongoose.Schema({
    name: String,
    director: String,
    genre: String,
    tags: [ String ],
    date: { type: Date, default: Date.now }
});

const Genre = mongoose.model("Genre", genreSchema);


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

getMovies();
