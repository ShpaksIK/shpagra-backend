const express = require('express')
const router = express.Router()
const { getUserProfileArticles } = require('./../controllers/api-article-controller')


router.get('/profile', (req, res) => {
    getUserProfileArticles(req, res)
})

router.get('/article-creator/p/:articleId', (req, res) => {})

router.get('/article-creator/r/:articleId', (req, res) => {})

router.get('/article-creator/m/:articleId', (req, res) => {})

router.get('/article-creator', (req, res) => {})


module.exports = router