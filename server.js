/********************************************/
/*** Importattion des modules nécessaires ***/
const express = require('express')
const cors = require('cors')
let db = require('./db_connection')

/**********************/
/*** Initialisation ***/
const app = express()

app.use(cors({
    origin: "*",
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: "Origin, X-Requested-With, x-access-token, role, Content, Accept, Content-Type, Authorization"
 }))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const checkTokenMW = require('./jwt/check_token')

const user_router = require('./routes/users')
const artist_router = require('./routes/artists')

const auth_router = require('./routes/auth')

/**************/
/*** Routes ***/
app.get('/', (req, res) => res.send('Online'))

app.use('/auth', auth_router)
app.use('/users',  user_router)
app.use('/artists', artist_router)

app.get('*', (req, res) => res.status(501).send('What the hell are you doing ?'))

/*******************************/
/*** Start API avec test BDD ***/
db.authenticate()
    .then(() => console.log("Database connection OK !"))
    .then(() => {
        app.listen(process.env.SERVER_PORT, () => {
            console.log(`Start on port : ${process.env.SERVER_PORT}`)
        })
    })
    .catch(err => console.log("Database connection ERROR : ", err))