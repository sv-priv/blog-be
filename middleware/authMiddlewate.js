const jwt = require('jsonwebtoken');
const db = require('../models/index');



const auth = async (req, res, next) =>{

    const token = req.header('Authorization').replace('Bearer ','');
    //testsecret is the  'secret' code for creating the token
    const decoded = await jwt.verify( token, 'testsecret');

    try {

        const user = await db.User.findOne({

            where: {
                username: decoded.username,
                token: token
             }
        });

        if(!user){
            throw new Error("Unable to find user, please register");
        }else{
            next();
        }
    } catch (error) {

        res.status(401).send({error: 'Please authenticate.'})

    }
}

module.exports = auth;