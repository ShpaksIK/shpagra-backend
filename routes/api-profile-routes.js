const express = require('express')
const router = express.Router()
const { getUserProfileArticles, getProfileArticles } = require('./../controllers/api-article-controller')


router.get('/profile', (req, res) => {
    getUserProfileArticles(req, res)
})

router.get('/profile/:profileId', (req, res) => {
    getProfileArticles(req, res)
})


module.exports = router