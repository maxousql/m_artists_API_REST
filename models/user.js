const { DataTypes } = require('sequelize')
const db = require('../db_connection')

const User = db.define('User', {
    id: {
        type: DataTypes.INTEGER(11),
        primaryKey: true,
        autoIncrement: true
    },
    email: {
        type: DataTypes.STRING,
        validate: {
            isEmail: true
        }
    },
    username: {
        type: DataTypes.STRING(50),
        defaultValue: '',
        allowNull: false
    },
    password: {
        type: DataTypes.STRING(64),
        is: /^[0-9a-f]{64}$/i
    }
}, { paranoid: true })

module.exports = User