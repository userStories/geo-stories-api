const router = require('express').Router()
const {Category, Post, User, Friends} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email', 'firstName', 'lastName'],
      include: [{model: User, as: 'Friend'}]
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) =>{
  try {
      const user = await User.findOne({
          where: {
              id: req.params.id
          },
          include: [{model: User, as: 'Friend'}]
      })
      res.json(user)
  } catch(err){
      next(err)
  }
})

router.put('/:id', async (req, res, next) =>{
  try {
      console.log('req.body in user update route: ', req.body)
      const [rowsUpdated, updatedUser] = await User.update(
          req.body, {
              where: {
                  id: req.params.id
              },
              include: [{model: User, as: 'Friend'}],
              returning: true
          }
      )
    if(req.body.friendId && req.body.friendId !== req.params.id){
        if(req.body.friend === 'add'){
            const friendId = req.body.friendId
            const newFriend = await User.findById(friendId)
            updatedUser[0].addFriend(newFriend)
        }
        if(req.body.friend === 'remove'){
            const friendId = req.body.friendId
            const newFriend = await User.findById(friendId)
            updatedUser[0].removeFriend(newFriend)
        }
    }
      res.json({message: 'Updated User Successfully', user: updatedUser[0]})
  }catch(err){
      next(err)
  }
})

router.delete('/:id', async (req, res, next) => {
    await User.destroy({
        where: {
            id: req.params.id
        }
    })
    res.json({ message: 'Successfully deleted User' })
})