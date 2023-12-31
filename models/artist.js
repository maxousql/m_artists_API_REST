const { DataTypes } = require('sequelize')
const db = require('../db_connection')

const Artist = db.define('Artist', {
    id: {
        type: DataTypes.INTEGER(11),
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    streams: {
        type: DataTypes.INTEGER(11),
        allowNull: false
    },
    daily: {
        type: DataTypes.INTEGER(11),
        allowNull: false
    },
    as_lead: {
        type: DataTypes.INTEGER(11),
        allowNull: false
    },
    solo: {
        type: DataTypes.INTEGER(11),
        allowNull: false
    },
    as_feature: {
        type: DataTypes.INTEGER(11),
        allowNull: false
    }
}, { paranoid: true })

Artist.sync()

module.exports = Artist