const router = require('express').Router()
const {Category, Post, User, Comments} = require('../db/models')
const cloudinary = require('cloudinary');
const cloudinaryStorage = require('multer-storage-cloudinary');
const multer = require('multer')
const secrets = require('../../secrets')
const path = require('path')


router.get('/', async (req, res, next) =>{
    try {
        console.log('Hello')
        const posts = await Post.findAll()
        res.json(posts)
    } catch(err){
        next(err)
    }
})

router.get('/:id', async (req, res, next) =>{
    try {
        const id = req.params.id
        const post = await Post.findOne({
            where: {
                id: id
            },
            include: [{model: Comments}]
        })
        res.json(post)
    } catch(err){
        next(err)
    }
})

router.get('/user/:id', async (req, res, next) =>{
    try {
        const id = req.params.id
        const post = await Post.findAll({
            where: {
                userId: id
            }
        })
        res.json(post)
    } catch(err){
        next(err)
    }
})

router.post('/', async (req, res, next) =>{
    console.log('request received')
    console.log('here is the req body', req.body)
    const image = new Image
    image.src = req.body.base64
    console.log('imayge', image)
    try {
        
        const newPost = await Post.create(req.body)
        res.json({message: 'New Post created Successfully', post: newPost})
    } catch(err){
        next(err)
    }
})

router.put('/:id', async (req, res, next) =>{
    try {
        const [rowsUpdated, updatedPost] = await Post.update(
            req.body, {
                where: {
                    id: req.params.id
                },
                returning: true
            }
        )
        res.json({message: 'Updated Post Successfully', post: updatedPost})
    }catch(err){
        next(err)
    }
})

router.delete('/:id', async (req, res, next) =>{
    await Post.destroy({
        where: {
            id: req.params.id
        }
    })
    res.json({message: 'Successfully deleted Post'})
})

// multer and cloudinary handling

cloudinary.config({
    cloud_name: secrets.cloud_name,
    api_key: secrets.api_key,
    api_secret: secrets.api_secret
})

let storage = cloudinaryStorage({
    cloudinary: cloudinary,
    params: function(req, file, cb) {
        let type = null
        let splitter = file.originalname.split('.')[1]
        if (splitter === 'jpg') {
            type = 'image'
        } else if (splitter === 'mov') {
            type = 'video'
        }
        console.log('file', file)
        cb(undefined, {
            resource_type: type,
            folder: 'geostories',
            filename: file.originalname,
            allowedFormats: ['jpg', 'mov']
        })
    }

});

let parser = multer({
    storage,
})


router.post('/media', parser.any(), async (req, res, next) => {

    let mediaUrl = req.files[0].url
    try {
        res.send({ mediaUrl })
    } catch(err){
        console.error('reached error')
        next(err)
    }
})

router.post('/', async (req, res, next) => {
    try {
        // const newPost = await Post.create(req.body)
        // res.json({message: 'New Post created Successfully', post: newPost})
    } catch(err){
        console.error('reached error')
        next(err)
    }
})








module.exports = router