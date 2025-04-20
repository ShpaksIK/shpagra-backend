const express = require('express')
const router = express.Router()
const { getUserProfileArticles, getProfileArticles } = require('../controllers/api-article-controller')
const { getUsers } = require('../controllers/api-user-controller')

Ё
router.get('/user', (req, res) => {
    getUsers(req, res)
    // getUserProfileArticles(req, res)
}) 

router.get('/user/:userId', (req, res) => {
    // getProfileArticles(req, res)
})


module.exports = router