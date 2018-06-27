const router = require('express').Router()
const {Category, Post, User, Comments} = require('../db/models')

router.get('/', async (req, res, next) =>{
    try {
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
console.log('reached this part of the rtouututeuute')
router.post('/', async (req, res, next) =>{
    // console.log('request received')
    // console.log('here is the req body', req.body)
    // const image = new Image
    // image.src = req.body.base64
    // console.log('imayge', image)
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

module.exports = router