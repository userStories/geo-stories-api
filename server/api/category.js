const router = require('express').Router()
const {Category, Post, User} = require('../db/models')

router.get('/', async (req, res, next) =>{
    try {
        const categories = await Category.findAll()
        res.json(categories)
    } catch(err){
        next(err)
    }
})

router.get('/:id', async (req, res, next) =>{
    try {
        const id = req.params.id
        const category = await Category.findById(id)
        res.json(category)
    } catch(err){
        next(err)
    }
})

router.post('/', async (req, res, next) =>{
    try {
        const newCategory = await Category.create(req.body)
        res.json({message: 'New Post created Successfully', post: newCategory})
    } catch(err){
        next(err)
    }
})

router.put('/:id', async (req, res, next) =>{
    try {
        const [rowsUpdated, updatedCategory] = await Category.update(
            req.body, {
                where: {
                    id: req.params.id
                },
                returning: true
            }
        )
        res.json({message: 'Updated Post Successfully', post: updatedCategory})
    }catch(err){
        next(err)
    }
})

router.delete('/:id', async (req, res, next) =>{
    await Category.destroy({
        where: {
            id: req.params.id
        }
    })
    res.json({message: 'Successfully deleted Category'})
})

module.exports = router