const express = require('express');
let router = express.Router();
const db = require('../models');
const authMiddleware = require('../middleware/authMiddlewate');

// get all categories
router
.route('')
.get(authMiddleware, async (req, res) => {

    try {

        db.Category.findAll({
            include: [ db.Post ]

        }).then(allUsers => {

            if(allUsers == null){
                throw new Error();
            }else{
                res.send(allUsers);

            }

        });
    } catch (error) {

            res.status(404).send('No categories found');

    }

});

// create new category
router
.route('/new')
.post( authMiddleware, async (req, res) => {


   await db.Category.create({

        name: req.body.name

    })
     .then(newCategory => res.send(newCategory));

});


// get all posts in a category

router
.route('/category-posts/:id')
.get(authMiddleware, async ( req, res) => {

    db.Category.findOne({

        include: [ db.Post ],
        where: {
            id: req.params.id
        }

    }).then(category => {

        if(category == null){
            throw new Error();
        }else{
            res.send(category.Posts);
        }

    });

})

module.exports = router;