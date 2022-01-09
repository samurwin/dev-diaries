const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, Post, Comment } = require('../models');

router.get('/', (req, res) => {
    Post.findAll({
        where: {
            user_id: req.session.user_id
        },
        attributes: ['id', 'title', 'post_body', 'created_at'],
        include: [
            {
                model: Comment,
                attributes: ['id', 'comment_body', 'post_id', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['id', 'username']
                }
            },
            {
                model: User,
                attributes: ['id', 'username']
            }
        ]
    })
    .then(dbPostData => {
        // serialize the data
        const posts = dbPostData.map(post => post.get({ plain: true }));
        const sessionUser = {
            username: req.session.username
        }
        res.render('profile', { posts, sessionUser, loggedIn: true });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.get('/edit/:id', (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: ['id', 'title', 'post_body', 'created_at'],
        include: [
            {
                model: User,
                attributes: ['username']
            },
            {
                model: Comment,
                attributes: ['id', 'comment_body', 'created_at'],
                include: {
                    model: User,
                    attributes: ['id', 'username']
                }
            }
        ]
    })
    .then(dbPostData => {
        // serialize data 
        const post = dbPostData.get({ plain: true });
        res.render('edit-post', {
            post,
            loggedIn: true
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
})

module.exports = router;