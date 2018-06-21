const User = require('./user')
const Post = require('./post')
const Category = require('./category')

Post.belongsTo(Category);
Post.belongsTo(User)



module.exports = {
  User, Post, Category
}
