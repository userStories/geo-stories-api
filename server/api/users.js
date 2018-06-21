const router = require('express').Router()
const {Category, Post, User} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})


router.get('/:id', async (req, res, next) =>{
  try {
      const id = req.params.id
      const user = await User.findById(id)
      res.json(user)
  } catch(err){
      next(err)
  }
})

router.put('/:id', async (req, res, next) =>{
  try {
      const [rowsUpdated, updatedUser] = await User.update(
          req.body, {
              where: {
                  id: req.params.id
              },
              returning: true
          }
      )
      res.json({message: 'Updated User Successfully', post: updatedUser})
  }catch(err){
      next(err)
  }
})

router.delete('/:id', async (req, res, next) =>{
  await User.destroy({
      where: {
          id: req.params.id
      }
  })
  res.json({message: 'Successfully deleted User'})
})