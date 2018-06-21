const crypto = require('crypto')
const Sequelize = require('sequelize')
const db = require('../db')


const Category = db.define('category', {
    title: {
        type: Sequelize.STRING
    }
})

module.exports = Category