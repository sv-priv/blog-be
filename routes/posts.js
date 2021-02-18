const express = require('express');
let router = express.Router();
const db = require('../models/index')
const authMiddleware = require('../middleware/authMiddlewate');


//  get all posts
router
.route('')
.get( authMiddleware, (req, res) => {

    db.Post.findAll({

        include: [ db.Category ]
    }).then(allPosts => res.send(allPosts))

});

//  get a single post with id

router
.route('/:id')
.get(authMiddleware, (req, res) => {

    const _id = req.params.id;

    db.Post.findAll({
        where: { CategoryId : req.params.id },
        include : [ db.Category ]
    }).then(post => res.send(post))


});

// create new post
router
.route('/new')
.post( authMiddleware, (req, res) => {

    // const _catId = db.Category.find(req.categoryName);

    db.Post.create({
        title: req.body.title,
        content: req.body.content,
        CategoryId: req.body.CategoryId

    }).then(newPost => res.send(newPost))

});

//delete all posts
router
.route('')
.delete(authMiddleware, (req, res) => {

    db.Post.destroy({
        where: {},
        truncate: true,
        restartIdentity: true

    }).then(function(){

            res.send('deleted');

      });
});

//delete one post -doesn't work
// router
// .route('/:id')
// .post((req, res) => {

//   const title =  req.params.id;

//   db.Post.destroy({
//         where: { title: title },
//         truncate: true

//     }).then(() => {
//         res.status(200).send('Removed Successfully');
//        }).catch((err) => {
//         console.log(err);
//         res.status(500).send('We failed to delete for some reason');
//        });
// });

//update a single post

router
.route('/edit')
.put( authMiddleware, (req, res) => {

  const title =  req.params.id;

  db.Post.update({

        title: req.body.title,
        content: req.body.content

    },
    {
        where: { id: req.body.id }

    }).then((updatedPost) => {
            res.send(updatedPost)
            //returns rows affected
       });
});


module.exports = router;

