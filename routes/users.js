const express = require('express')

const User = require('../models/user')

let router = express.Router()

router.get('', (req, res) => {
    User.findAll()
        .then(users => res.json({ data: users }))
        .catch(err => res.status(500).json({ message: 'Database Error' }))
})

router.get('/:id', (req, res) => {
    let userId = parseInt(req.params.id)

    if (!userId) {
        return res.json(400).json({ message: 'Missing Parameter' })
    }

    User.findOne({ where: { id: userId }, raw: true })
        .then(user => {
            if ((user === null)) {
                return res.status(404).json({ message: 'This user does not exist !' })
            }

            return res.json({ data: user })
        })
        .catch(err => res.status(500).json({ message: 'Database Error' }))
})

router.put('', (req, res) => {
    const { email, username, password } = req.body

    if (!email || !username || !password) {
        return res.status(400).json({ message: 'Missing data' })
    }

    User.findOne({ where: { email: email }, raw: true })
        .then(user => {
            if (user !== null) {
                return res.status(409).json({ message: `The user ${username} already exists !` })
            }

            User.create(req.body)
                .then(user => res.json({ message: 'User created', data: user }))
                .catch(err => res.status(500).json({ message: 'Database Error' }))
        })
        .catch(err => res.status(500).json({ message: 'Database Error' }))
})

router.patch('/:id')

router.delete('/:id')