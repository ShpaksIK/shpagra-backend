const express = require('express')
const { likeArticleAPI, getProfileArticles } = require('../controllers/api-article-controller')
const router = express.Router()


router.get('/article/:articleId', (req, res) => {
    getProfileArticles(req, res)
})

router.post('/article-like', (req, res) => {
    likeArticleAPI(req, res)
})


module.exports = router