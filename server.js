const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const publicRoute = require('./routes/api-public-routes')
const profileRoute = require('./routes/api-profile-routes')
const articleRoute = require('./routes/api-article-routes')
require('dotenv').config()


const app = express()
const PORT = process.env.PORT || 5000

app.use(cors({
    origin: 'http://localhost:5173',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
}))
app.use(bodyParser.json())

app.use(publicRoute)
app.use(profileRoute)
app.use(articleRoute)

app.listen(PORT, (error) => {
    error ? console.log(error) : console.log(`listening port ${PORT}`)
})