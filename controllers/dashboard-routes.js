const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');

// checks if user logged in; have session; authorized
const withAuth = require('../utils/auth');

// all dashboard views will be prefixed with /dashboard
router.get('/', withAuth, (req, res) => { // add withAuth here as our own middleware
    Post.findAll({
        where: {
          // use the ID from the session so we retrieve posts made by logged in user
          userId: req.session.userId
          
        },
        attributes: [
          'id',
          'postText',
          'title',
          'createdAt'
        ],
        include: [
          {
            model: User,
            attributes: ['username']
          },
          { model: Comment }
        ]
      })
        .then(dbPostData => {
          // serialize data before passing to template
          // using post here but this can be named ANYTHING 
          const posts = dbPostData.map(post => post.get({ plain: true }));
          // user won't be able to get to the dashboard page unless they're logged in
          res.render('dashboard', { posts, loggedIn: true });
        })
        .catch(err => {
          console.log(err);
          res.status(500).json(err);
        });
        console.log(req.session.userId);
  });

router.get('/edit/:id', withAuth, (req, res) => { // add withAuth here as our own middleware
  Post.findOne({
    where: {
        id: req.params.id
    },
    attributes: [
        'id', 
        'postText', 
        'title', 
        'createdAt'
      ],
    include: [
        {
            model: Comment,
            attributes: ['id', 'commentText', 'userId', 'createdAt'],
            // also include the User model itself so it can attach the username to the comment
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
        if(!dbPostData) {
            // The 404 status code identifies a user error and will need a different request for a successful response.
            res.status(404).json({ message: 'No post with this id was found'});
            return;
        }

        // serialize the data with plain: true
        const post = dbPostData.get({ plain: true });

        // pass data to template
        res.render('edit-post', { 
          post,
          loggedIn: req.session.loggedIn
          // user will only see comments if logged in
        });
    })  
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });

});
module.exports = router;