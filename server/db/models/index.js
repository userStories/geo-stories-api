const User = require('./user')
const Post = require('./post')
const Category = require('./category')
const Comments = require('./comments')
const Friends = require('./friends')

Post.belongsTo(Category);
Category.hasMany(Post)

Post.belongsTo(User)
User.hasMany(Post)

Comments.belongsTo(User);
User.hasMany(Comments)

Comments.belongsTo(Post)
Post.hasMany(Comments)

User.belongsToMany(User, {as: 'Friend', through: "Friends"})



module.exports = {
  User, Post, Category, Comments, Friends
}
