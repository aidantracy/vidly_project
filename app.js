const express = require("express");
const mongoose = require("mongoose")
const app = express();
const genres = require("./routers/genres")
const customers = require("./routers/customers")
const movies = require("./routers/movies")
const rentals = require("./routers/rentals")
const Joi = require("joi")
Joi.objectId = require("joi-objectid")(Joi);

// this needs to be moved to a config file
const uri = "mongodb+srv://aidantracy:rootroot@vidlydemocluster.aew1dex.mongodb.net/?retryWrites=true&w=majority"


// middleware
app.use(express.json());
app.use("/api/genres", genres);
app.use("/api/customers", customers)
app.use("/api/movies", movies)
app.use("/api/rentals", rentals)


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



