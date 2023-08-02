/********************************************/
/*** Importattion des modules nécessaires ***/
const express = require('express')
const cors = require('cors')
let db = require('./db_connection')

/**********************/
/*** Initialisation ***/
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

/**************/
/*** Routes ***/
app.get('/', (req, res) => res.send('Online'))

app.get('*', (req, res) => res.status(501).send('What the hell are you doing ?'))

/*******************************/
/*** Start API avec test BDD ***/
db.authenticate()
    .then(() => console.log("Database connection OK !"))
    .then(() => {
        app.listen(process.env.SERVER_PORT, () => {
            console.log(`Start on port : ${process.env.SERVER_PORT}`);
        })
    })
    .catch(err => console.log("Database connection ERROR : ", err))