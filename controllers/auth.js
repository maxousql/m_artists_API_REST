const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const User = require('../models/user')

exports.login = async (req, res) => {
    const { email, password } = req.body

    if (!email || !password) {
        return res.status(400).json({ message: 'Bad email or password' })
    }

    try {
        let user = await User.findOne({ where: {email: email}, raw: true})
        if (user === null) {
            return res.status(401).json({ message: 'This account does not exists !'})
        }

        let test = await bcrypt.compare(password, user.password)

        if (!test) {
            return res.status(401).json({ message: 'Wrong password' })
        }

        const token = jwt.sign({
            id: user.id,
            username: user.username,
            email: user.email
        }, process.env.KEY_JWT, { expiresIn: process.env.TIME_JWT})

        return res.json({access_token: token})

    } catch (err) {
        if (err.name == 'SequelizeDatabaseError') {
            return res.status(500).json({ message: 'Database error'})
        }
        return  res.status(500).json({ message: 'Login failed!'})
    }
}

