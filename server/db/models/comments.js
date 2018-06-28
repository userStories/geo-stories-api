const Sequelize = require('sequelize')
const db = require('../db')

const Comments = db.define('comments', {
    content: {
        type: Sequelize.STRING,
        validate: {
            textLength(str){
                if(str.length >= 300){
                    throw new Error('Comment is to long!')
                }
            }  
        }
    }
})

module.exports = Comments