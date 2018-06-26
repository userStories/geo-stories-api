const crypto = require('crypto')
const Sequelize = require('sequelize')
const db = require('../db')

const Post = db.define('post', {
    latitude: {
        type: Sequelize.FLOAT
    },
    longitude: {
        type: Sequelize.FLOAT
    },
    mediaType: {
        type: Sequelize.ENUM('video', 'image', 'audio', 'text-only')
    },
    title: {
        type: Sequelize.STRING
    },
    text: {
        type: Sequelize.TEXT,
        validate: {
            textLength(str){
                if(str.length >= 500){
                    throw new Error('Post is to long!')
                }
            }
        }
    }, 
    mediaLink: {
        type: Sequelize.STRING
    }
});



module.exports = Post