const express = require('express')
const router = express.Router()
const { getUserProfileArticles } = require('./../controllers/api-article-controller')


router.get('/profile', (req, res) => {
    getUserProfileArticles(req, res)
})


module.exports = router