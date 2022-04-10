const router = require("express").Router();

// import your dependencies here
const bcrypt = require("bcrypt");

// import your models here
const User = require("../models/User");

// Register route
router.post("/register", async (req, res) => {

    try {

        // generating hashed password
        const salt = await bcrypt.genSalt(8);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        // creating new user
        const newUser = await new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword
        });

        // saving new user
        const user = await newUser.save();
        res.status(200).json(user);

    } catch (err) {

        res.status(500).json(err);

    }

});

// Login route
router.post("/login", async (req, res) => {

    try {

        const user = await User.findOne({
            email: req.body.email
        });

        if (user) {
            const isValidPassword = await bcrypt.compare(req.body.password, user.password);
            if (isValidPassword) {
                res.status(200).json(user);
            } else {
                res.status(404).send("Password is incorrect");    
            }
        } else {
            res.status(404).send("User not found!");
        }

    } catch (err) {

        res.status(500).json(err);

    }

})

module.exports = router;