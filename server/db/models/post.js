const crypto = require('crypto')
const Sequelize = require('sequelize')
const db = require('../db')

const Post = db.define('post', {
    latitude: {
        type: Sequelize.FLOAT,
        // allowNull: false
    },
    longitude: {
        type: Sequelize.FLOAT,
        // allowNull: false
    },
    mediaType: {
        type: Sequelize.ENUM('video', 'image', 'text-only')
    },
    title: {
        type: Sequelize.STRING,
        // allowNull: false
    },
    text: {
        type: Sequelize.TEXT,
    }, 
    mediaLink: {
        type: Sequelize.STRING
    }
});

Post.hook('beforeCreate', (post) =>{
    if(post.text.length >= 200){
        throw new Error('Post is to long!')
    }
})

Post.hook('beforeBulkCreate', (post) =>{
    for(let i = 0; i < post.length; i++){
        if(post[i].text.length >= 200){
            throw new Error('Post is to long!')
        }
    }
})



module.exports = Post