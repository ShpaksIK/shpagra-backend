const express = require('express')
const router = express.Router()


// Получение постов друзей пользователя
router.post('/posts', (req, res) => {

})

// Создание поста
router.post('/posts', (req, res) => {

})

// Удаление поста
router.delete('/posts/:postId', (req, res) => {

})

// Получение реакций поста
router.get('/posts/:postId/reactions', (req, res) => {

})

// Добавление реакции на пост
router.post('/posts/:postId/reactions', (req, res) => {

})

// Удаление реакции поста
router.delete('/posts/:postId/reactions/:reactionId', (req, res) => {

})

// Получение комментариев поста
router.get('/posts/:postId/comments', (req, res) => {

})

// Добавление комментария на пост
router.post('/posts/:postId/comments', (req, res) => {

})

// Удаление комментария поста
router.delete('/posts/:postId/comments/:commentId', (req, res) => {

})

// Изменение комментария поста
router.put('/posts/:postId/comments/:commentId', (req, res) => {

})

// Получение реакций на комментарий поста
router.get('/posts/:postId/comments/:commentId/reactions', (req, res) => {

})

// Добавление реакции на комментарий поста
router.post('/posts/:postId/comments/:commentId/reactions', (req, res) => {

})

// Удаление реакции на комментарий поста
router.delete('/posts/:postId/comments/:commentId/reactions/:reactionId', (req, res) => {

})


module.exports = router