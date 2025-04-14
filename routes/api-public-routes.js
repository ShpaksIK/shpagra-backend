const express = require('express')
const router = express.Router()
const { getMainArticles, getProfileArticles } = require('./../controllers/api-article-controller')


router.get('/article/:articleId', (req, res) => {
    getProfileArticles(req, res)
})

router.get('/profile/:profileId', (req, res) => {
    getProfileArticles(req, res)
})

router.get('/', (req, res) => {
    getMainArticles(req, res)
})


module.exports = router