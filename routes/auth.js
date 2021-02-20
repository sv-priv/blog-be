const express = require('express');
let router = express.Router();
const bcrypt = require('bcryptjs');
const db = require('../models/index');
const jwt = require('jsonwebtoken')

// using authMiddleware to ensure authorization to access the backend
const authMiddleware = require('../middleware/authMiddlewate');




//get all users
router
.route('/users')
.get( async (req, res) => {

    try {
        db.User.findAll({

        })
        .then(users => res.send(users));

    } catch (error) {
        res.status(404).send({error: 'Users not found.'});

    }

});

// register a single user
router
.route('/register')
.post( async (req, res) => {

    try {
        // user should have hashed password stored in the database
        // hashing the password using bcrypjs
        const _hashedPassword = await bcrypt.hash(req.body.password, 8);

        // creating an authentication token based on the unique username
        const _token = await jwt.sign({ username: req.body.username }, 'testsecret');


        //checking if the username is unique
       const checkUserExists = await db.User.findOne({
            where: {
                username: req.body.username
            }
        });

        if(checkUserExists != null){
            throw new Error("user exists");
        }else{

            //creating user with the token derived from the username, and the secret global passphrase
            //using jsonwebtoken
            db.User.create({

                username: req.body.username,
                password: _hashedPassword,
                token: _token

            }).then( async (newUser) =>{

                res.send(newUser)

            });
        }


    } catch (error) {
        res.status(400).send({error: 'Unable to register'});
    }

});

// login a single user
router
.route('/login')
.post(async (req, res) => {

    try {
        const _hashedPassword = await bcrypt.hash(req.body.password, 8);
        const _token = await jwt.sign({ username: req.body.username }, 'testsecret');

        db.User.findAll({

            where: {
                username: req.body.username
            }

        }).then( async (user) => {

            if(user[0] == null){

                throw new Error("No user with that username");

            }else{

            const pas = user[0].password;
            const isMatch = await bcrypt.compare(req.body.password, user[0].password);
            if(isMatch){

            res.send(user);

            }else{
                throw new Error("Wrong password");
            }

            }}
        );

    } catch (error) {
        res.status(400).send({error: 'Unable to login'});

    }

});


router
.route('/logout')
.post( authMiddleware, async (req, res) => {

try {

    const user = await db.User.findOne({

        where: {
            username: req.body.username,
        }

    }).then(user => {
         user.destroy({
             truncate:true
         });
        res.send({"deleted user: ": user });
    });

} catch (error) {

        res.status(400).send({error: 'Unable to find user'});

}

});

module.exports = router;