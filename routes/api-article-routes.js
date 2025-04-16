const express = require('express')
const { likeArticle, getArticleData, getArticlePreview } = require('../controllers/api-article-controller')
const router = express.Router()


router.get('/article/:articleId', (req, res) => {
    getArticleData(req, res)
})

router.get('/article-preview/:articleId', (req, res) => {
    getArticlePreview(req, res)
})

router.post('/article-like', (req, res) => {
    likeArticle(req, res)
})


module.exports = router