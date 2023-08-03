const express = require('express')
const auth_controller = require('../controllers/auth')

let router = express.Router()

router.use((req, res, next) => {
    const event = new Date()

    console.log('Authentifcation time:', event.toString())
    next()
})

router.post('/login', auth_controller.login)

module.exports = router