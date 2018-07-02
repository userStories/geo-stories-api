const Sequelize = require('sequelize')
const db = require('../db')

const Friends = db.define('Friends')

module.exports = Friends