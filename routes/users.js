const express = require('express')
const user_controller = require('../controllers/user')

let router = express.Router()

router.get('/', user_controller.getAllUsers)

router.get('/:id', user_controller.getUser)

router.put('', user_controller.addUser)

router.patch('/:id', user_controller.updateUser)

router.delete('/trash/:id', user_controller.softDelete)

router.post('/untrash/:id', user_controller.restoreUser)

router.delete('/:id', user_controller.deleteUser)

module.exports = router