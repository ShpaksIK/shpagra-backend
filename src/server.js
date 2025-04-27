const express = require('express')
const cors = require('cors')
const usersRoute = require('./routes/api-users-routes')
const articlesRoute = require('./routes/api-articles-routes')
const postsRoute = require('./routes/api-posts-routes')
require('dotenv').config()


const app = express()
const PORT = process.env.PORT || 5000

app.use(cors({
    origin: 'http://localhost:5173',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: false,
}))
app.use(express.json())

app.use('/api', usersRoute)
app.use('/api', articlesRoute)
app.use('/api', postsRoute)

app.listen(PORT, (error) => {
    error ? console.log(error) : console.log(`listening port ${PORT}`)
})