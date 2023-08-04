const express = require('express')
const artist_controller = require('../controllers/artist')

const checkTokenMW = require('../jwt/check_token')

let router = express.Router()

router.get('/', artist_controller.getAllArtists)

router.get('/:id', artist_controller.getArtist)

router.put('', checkTokenMW, artist_controller.addArtist)

router.patch('/:id', checkTokenMW, artist_controller.updateArtist)

router.delete('/trash/:id', checkTokenMW, artist_controller.softDelete)

router.post('/untrash/:id', checkTokenMW, artist_controller.restoreUser)

router.delete('/:id', checkTokenMW, artist_controller.deleteUser)

module.exports = router