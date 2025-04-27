const express = require('express')
const { getUsers, getUser, updateUser, getUserFollowers, 
    getUserFolloweds, followToUser, unfollowToUser, 
    getUserPosts, getUserArticles, getUserNotifications, 
    createUserNotifications, createUser } = require('../controllers/api-user-controller')
const router = express.Router()


// Получение пользователей
router.get('/users', getUsers) 

router.post('/users', createUser) 

// Получение профиля пользователя
router.get('/users/:userId', getUser)

// Изменение профиля пользователя
router.put('/users/:userId', updateUser)

// Получение подписчиков пользователя
router.get('/users/:userId/friends', getUserFollowers)

// Получение подписок пользователя
router.get('/users/:userId/followeds', getUserFolloweds)

// Подписка на пользователя
router.post('/users/:userId/friends', followToUser)

// Отписка от пользователя
router.delete('/users/:userId/friends/:friendId', unfollowToUser)

// Получение постов пользователя
router.get('/users/:userId/posts', getUserPosts)

// Получение статей пользователя
router.get('/users/:userId/articles', getUserArticles)

// Получение всех уведомлений пользователя
router.get('/users/:userId/articles', getUserNotifications)

// Создание уведомления пользователя
router.get('/users/:userId/articles', createUserNotifications)


module.exports = router