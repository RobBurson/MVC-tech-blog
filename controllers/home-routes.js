const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');

router.get('/', (req, res) => {
  console.log(req.session);

    Post.findAll({
        attributes: [
          'id',
          'title',
          'postText',
          'createdAt'
        ],
        order: [['createdAt', 'DESC']],
        include: [
          {
            model: User,
            attributes: ['username']
          },
          { model: Comment }
        ]
      })
        .then(dbPostData => {
          const posts = dbPostData.map(post => post.get({ plain: true }));
          res.render('homepage', { posts, loggedIn: req.session.loggedIn });
        })
        .catch(err => {
          console.log(err);
          res.status(500).json(err);
        });
  });

  router.get('/user-sort', (req, res) => {
    console.log(req.session);
  
      Post.findAll({
          attributes: [
            'id',
            'title',
            'postText',
            'createdAt',
            'userId'
          ],
          order: [['userId']],
          include: [
            {
              model: User,
              attributes: ['username']
            }
          ]
        })
          .then(dbPostData => {
            const posts = dbPostData.map(post => post.get({ plain: true }));
            res.render('homepage', { posts, loggedIn: req.session.loggedIn });
          })
          .catch(err => {
            console.log(err);
            res.status(500).json(err);
          });
    });

  router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
      res.redirect('/');
      return;
    }

    res.render('login');
  });

  router.get('/post/:id', (req, res) => {
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
        res.status(404).json({ message: 'No post found with this id' });
        return;
      }

      const post = dbPostData.get({ plain: true });

      res.render('single-post', {
        post,
        loggedIn: req.session.loggedIn
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
  });

module.exports = router;