const express = require('express')
const router = express.Router()


// Получение пользователей
router.get('/users', (req, res) => {
    
}) 

// Получение профиля пользователя
router.get('/users/:userId', (req, res) => {

})

// Изменение профиля пользователя
router.put('/users/:userId', (req, res) => {

})

// Получение друзей пользователя
router.get('/users/:userId/friends', (req, res) => {

})

// Добавление друга
router.post('/users/:userId/friends', (req, res) => {

})

// Удаление друга
router.delete('/users/:userId/friends/:friendId', (req, res) => {

})

// Получение постов пользователя
router.get('/users/:userId/posts', (req, res) => {

})

// Получение постов пользователя
router.get('/users/:userId/articles', (req, res) => {

})


module.exports = router