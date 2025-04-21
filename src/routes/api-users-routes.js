const express = require('express')
const { getUsers, getUser, updateUser, getUserFollowers, 
    getUserFolloweds, followToUser, unfollowToUser, 
    getUserPosts, getUserArticles, getUserNotifications, 
    createUserNotifications } = require('../controllers/api-user-controller')
const router = express.Router()


// Получение пользователей
router.get('/users', (req, res) => {
    getUsers(req, res)
}) 

// Получение профиля пользователя
router.get('/users/:userId', (req, res) => {
    getUser(req, res)
})

// Изменение профиля пользователя
router.put('/users/:userId', (req, res) => {
    updateUser(req, res)
})

// Получение подписчиков пользователя
router.get('/users/:userId/friends', (req, res) => {
    getUserFollowers(req, res)
})

// Получение подписок пользователя
router.get('/users/:userId/followeds', (req, res) => {
    getUserFolloweds(req, res)
})

// Подписка на пользователя
router.post('/users/:userId/friends', (req, res) => {
    followToUser(req, res)
})

// Отписка от пользователя
router.delete('/users/:userId/friends/:friendId', (req, res) => {
    unfollowToUser(req, res)
})

// Получение постов пользователя
router.get('/users/:userId/posts', (req, res) => {
    getUserPosts(req, res)
})

// Получение статей пользователя
router.get('/users/:userId/articles', (req, res) => {
    getUserArticles(req, res)
})

// Получение всех уведомлений пользователя
router.get('/users/:userId/articles', (req, res) => {
    getUserNotifications(req, res)
})

// Создание уведомления пользователя
router.get('/users/:userId/articles', (req, res) => {
    createUserNotifications(req, res)
})


module.exports = router