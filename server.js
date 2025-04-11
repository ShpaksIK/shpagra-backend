const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
require('dotenv').config()


const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(bodyParser.json())

app.listen(PORT, (error) => {
    error ? console.log(error) : console.log(`listening port ${PORT}`)
})