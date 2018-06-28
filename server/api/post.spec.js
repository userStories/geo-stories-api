const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Post = db.model('post')
const assert = require('assert')

const User = db.model('user')
const Category = db.model('category')
const agent = require('supertest')(app)


describe('Post Routes', () =>{
    beforeEach( async () => {
        await db.sync({force: true})
        const Student1 = {
            latitude: 120.3344,
            longitude: 2.3009,
            mediaType: 'image',
            text: 'Lorem Ipsum dolor',
            mediaLink: 'http://helloWorld.com',
        }
        const Student2 = {
            latitude: 47.647,
            longitude: -123.455,
            mediaType: 'video',
            text: 'Lorem Ipsum dolor',
            mediaLink: 'http://goodByeWorld.com',
        }
        await Post.create(Student1)
        await Post.create(Student2)
    })
    it('GET /api/posts', async () =>{
        const response = await agent.get('/api/posts').expect(200)
        expect(response.body.length).to.be.equal(2)
    })
    it('GET /api/posts/:id', async () =>{
        const response = await agent.get('/api/posts/2').expect(200)
        expect(response.body.latitude).to.be.equal(47.647)
        expect(response.body.longitude).to.be.equal(-123.455)
        expect(response.body.mediaType).to.be.equal('video')
        expect(response.body.text).to.be.equal('Lorem Ipsum dolor')
        expect(response.body.mediaLink).to.be.equal('http://goodByeWorld.com')

    })

})