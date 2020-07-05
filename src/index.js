const express = require('express')
const db = require('./models')
const response = require('./middlewares/response')
const checkJwt = require('./middlewares/jwt')
const cors = require('cors');
const authController = require('./controllers/auth')
const linkController = require('./controllers/link')

const app = express()
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
    app.use(cors())
    next()
})

app.use(response)//
app.use(checkJwt)//

app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use('/auth', authController)
app.use('/link', linkController)

app.get('/', (req, res) => {
    return res.json('Api running...')
})

db.sequelize.sync().then(() => {
    app.listen(3001, () => {
        
        console.log('Aberto na porta 3001')
    })
})