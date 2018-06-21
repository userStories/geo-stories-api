const {expect} = require('chai')
const request = require('supertest')
const db = require('../../db')
const app = require('../../index')
const Post = db.model('post')
const assert = require('assert')

const User = db.model('user')
const Category = db.model('category')


// describe('Post Routes', () =>{
//     beforeEach(() => {
//         return db.sync({force: true})
//     })
//     it('Getting all Posts', () =>{

//     })
// })