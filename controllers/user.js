const bcrypt = require('bcrypt')

const User = require('../models/user')

exports.getAllUsers = async (req, res) => {
    try {
        let users = await User.findAll()

        return res.json({ data: users })
    } catch (err) {
        return res.status(500).json({ message: 'Database Error' })
    }
}

exports.getUser = async (req, res) => {
    let userId = parseInt(req.params.id)

    if (!userId) {
        return res.json(400).json({ message: 'Missing Parameter' })
    }

    try {
        let user = await User.findOne({ where: { id: userId }, raw: true })

        if ((user === null)) {
            return res.status(404).json({ message: 'This user does not exist !' })
        }

        return res.json({ data: user })
    } catch (err) {
        res.status(500).json({ message: 'Database Error' })
    }
}

exports.addUser = async (req, res) => {
    const { email, username, password } = req.body

    if (!email || !username || !password) {
        return res.status(400).json({ message: 'Missing data' })
    }

    try {
        let user = await User.findOne({ where: { email: email }, raw: true })

        if (user !== null) {
            return res.status(409).json({ message: `The user ${username} already exists !` })
        }
        
        let hash = await bcrypt.hash(password, parseInt(process.env.BCRYPT_SALT_ROUND))
        req.body.password = hash

        user = await User.create(req.body)

        return res.json({ message: 'User created', data: user })
    } catch (err) {
        res.status(500).json({ message: 'Database Error' })
    }
}

exports.updateUser = async (req, res) => {
    let userId = parseInt(req.params.id)

    if (!userId) {
        return res.status(400).json({ message: 'Missing parameter' })
    }
    
    try {
        let user = await User.findOne({ where: {id: userId}, raw: true})

        if (user == null) {
            return res.status(404).json({ message: 'This user does not exist !' })
        }
        user = await User.update(req.body, { where: {id: userId}})

        return res.json({ message: 'User updated' })
    } catch (error) {
        return res.status(500).json({ message: 'Database error'})
    }
}

exports.softDelete = async (req, res) => {
    let userId = parseInt(req.params.id)

    if (!userId) {
        return res.status(400).json({ message: 'Missing parameter' })
    }

    try {
        await User.destroy({ where: {id: userId}})

        return res.status(204).json({})
    } catch (err) {
        return res.status(500).json({ message: 'Database error'})
    }
}

exports.restoreUser = async (req, res) => {
    let userId = parseInt(req.params.id)

    if (!userId) {
        return res.status(400).json({ message: 'Missing parameter' })
    }

    try {
        await User.restore({ where: {id: userId}})

        return res.status(204).json({})
    } catch (err) {
        return res.status(500).json({ message: 'Database error'})
    }
}

exports.deleteUser = async (req, res) => {
    let userId = parseInt(req.params.id)

    if (!userId) {
        return res.status(400).json({ message: 'Missing parameter' })
    }

    try {
        await User.destroy({ where: {id: userId}, force: true})

        return res.status(204).json({})
    } catch (err) {
        return res.status(500).json({ message: 'Database error'})
    }
}