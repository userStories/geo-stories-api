const router = require('express').Router()
const {Post, User, Comments} = require('../db/models')

router.post('/', async (req, res, next) =>{
    try{
        const post = await Post.findById(req.body.postId)
        const newComment = await Comments.create({
            content: req.body.comment,
            postId: req.body.postId
        })
        // post.addComment(newComment)
        res.json({message: 'Successfully made a comment', newComment})
    } catch(err){
        next(err)
    }
})

module.exports = router