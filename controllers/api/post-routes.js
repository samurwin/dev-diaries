const router = require('express').Router();
const { User, Post, Comment } = require('../../models');

// find all posts
router.get('/', (req, res) => {
    Post.findAll({
        attributes: ['id', 'title', 'post_body', 'created_at'],
        include: {
            model: User,
            attributes: ['id', 'username']
        },
        order: [['created_at', 'DESC']]
    })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// find one post
router.get('/:id', (req, res) => {
    Post.findOne({
        attributes: ['id', 'title', 'post_body', 'created_at'],
        include: [
            {
                model: User,
                attributes: ['id', 'username']
            },
            {
                model: Comment,
                attributes: ['id', 'comment_body', 'created_at']
            }
        ]
    })
    .then(dbPostData => {
        if (!dbPostData) {
            res.status(404).json({ message: 'No Post found.'});
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

// update a post

// delete a post

module.exports = router;