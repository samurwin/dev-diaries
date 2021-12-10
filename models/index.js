const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');
const Tag = require('./Tag');

// one-to many relationship between user and post
Post.belongsTo(User, {
    foreignKey: 'user_id'
});

User.hasMany(Post, {
    foreignKey: 'user_id'
});

// one-to-many relationship between comment and post
Comment.belongsTo(Post, {
    foreignKey: 'post_id'
});

Post.hasMany(Comment, {
    foreignKey: 'post_id'
});

// one-to-many relationship between comment and user
Comment.belongsTo(User, {
    foreignKey: 'user_id'
});

User.hasMany(Comment, {
    foreignKey: 'user_id'
});

// many-to-many relationship between tag and post
Post.belongsToMany(Tag, {
    foreignKey: 'tag_id'
});

Tag.belongsToMany(Post, {
    foreignKey: 'tag_id'
});

module.exports = { User, Post, Comment, Tag };