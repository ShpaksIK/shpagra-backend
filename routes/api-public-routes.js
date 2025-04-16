const express = require('express')
const router = express.Router()
const { getMainArticles } = require('./../controllers/api-article-controller')


router.get('/', (req, res) => {
    getMainArticles(req, res)
})

router.get('/article-creator/p/:articleId', (req, res) => {})

router.get('/article-creator/r/:articleId', (req, res) => {})

router.get('/article-creator/m/:articleId', (req, res) => {})

router.get('/article-creator', (req, res) => {})

module.exports = router