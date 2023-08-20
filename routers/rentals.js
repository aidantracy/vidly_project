const {Movie} = require("../models/movie")
const {Customer} = require("../models/customer")
const {Rental, validateRental} = require("../models/rental")
const mongoose = require("mongoose")
const express = require("express");
const router = express.Router();
const Fawn = require("fawn");

// mongoose.connect("mongodb+srv://aidantracy:rootroot@vidlydemocluster.aew1dex.mongodb.net/?retryWrites=true&w=majority")
//     .then(() => console.log("confirmed"))
//     .catch((err) => console.log(err.message))

Fawn.init(mongoose)

// find and disply genres GET
router.get('/', async (req,res) => {
    const rentals = await Rental.find().sort('-dateOut');
    res.send(rentals);
});


// create genres POST
router.post('/', async (req,res) => {
    const { error } = validateRental(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    const customer = await Customer.findById(req.body.customerId);
    if (!customer) return res.status(400).send("customer ID not found");

    const movie = await Movie.findById(req.body.movieId);
    if (!movie) return res.status(400).send("Invalid movie")

    if (movie.numberInStock === 0) return res.status(400).send("Out of stock")
    
    let rental = new Rental({
        customerId: {
            _id: customer._id,
            name: customer.name,
            phone: customer.phone
        },
        movie: {
            _id: movie._id,
            title: movie.title,
            dailyRentalRate: movie.dailyRentalRate
        }
    });

    try{
        new Fawn.Task()
            .save('rentals', rental)
            .update('movies', { _id: movie._id}, {
                $inc: { numberInStock: -1}
            })
            .run()
            res.send(rental)
    } catch(ex){
        console.log("Something went wrong")
    }

});


module.exports = router;