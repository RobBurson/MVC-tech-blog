const router = require('express').Router();
const { Post, User, Comment } = require('../../models');

// get all posts
router.get('/', (req, res) => {
    console.log('======================');
    Post.findAll({
        // Query config
        attributes: [
            'id', 
            'title', 
            'postText',
            'createdAt'],
        order: [['createdAt', 'DESC']], // sort by most recent
        include: [ // Call on Sequelize's include option to perform the join
            {
                model: Comment,
                attributes: ['id', 'commentText', 'postId', 'userId', 'createdAt'],
                // include User model to couple username with comment
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// retrieve a post
router.get('/:id', (req, res) => {
    Post.findOne({
        where: {
          id: req.params.id
        },
        attributes: ['id', 'postText', 'title', 'createdAt'],
        include: [
            {
                model: Comment,
                attributes: ['id', 'commentText', 'postId', 'userId', 'createdAt'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
      })
        .then(dbPostData => {
          if (!dbPostData) {
            res.status(404).json({ message: 'No post with given id was found!' });
            return;
          }
          res.json(dbPostData);
        })
        .catch(err => {
          console.log(err);
          res.status(500).json(err);
        });
});

// create a post
router.post('/', (req, res) => {
    Post.create({
        title: req.body.title,
        postText: req.body.postText,
        userId: req.session.userId
    })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// update a post
router.put('/:id', (req, res) => {
    // used the request parameter to find the post, then used the req.body.title value to replace the title of the post
    Post.update(
        {
            title: req.body.title,
            postText: req.body.postText
        },
        {
            where: {
                id: req.params.id
            }
        }
    )
    .then(dbPostData => {
        if(!dbPostData) {
            // The 404 status code identifies a user error and will need a different request for a successful response.
            res.status(404).json({ message: 'No post with given id was found!'});
            return;
    }
    res.json(dbPostData);
    })  
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// delete a post
router.delete('/:id', (req, res) => {
    Post.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbPostData => {
        if(!dbPostData) {
            // The 404 status code identifies a user error and will need a different request for a successful response.
            res.status(404).json({ message: 'No post with given id was found!'});
            return;
    }
    res.json(dbPostData);
    })  
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;