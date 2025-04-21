const express = require('express')
const router = express.Router()


// Получение статей
router.get('/articles', (req, res) => {

})

// Получение статьи
router.get('/articles/:articleId', (req, res) => {

})

// Создание статьи
router.post('/articles', (req, res) => {

})

// Удаление статьи
router.delete('/articles/:articleId', (req, res) => {

})

// Изменение статьи
router.put('/articles/:articleId', (req, res) => {

})

// Получение реакций статьи
router.get('/articles/:articleId/reactions', (req, res) => {

})

// Добавление реакции на статью
router.post('/articles/:articleId/reactions', (req, res) => {

})

// Удаление реакции статьи
router.delete('/articles/:articleId/reactions/:reactionId', (req, res) => {

})

// Получение комментариев статьи
router.get('/articles/:articleId/comments', (req, res) => {

})

// Добавление комментария на статью
router.post('/articles/:articleId/comments', (req, res) => {

})

// Удаление комментария статьи
router.delete('/articles/:articleId/comments/:commentId', (req, res) => {

})

// Изменение комментария статьи
router.put('/articles/:articleId/comments/:commentId', (req, res) => {

})

// Получение реакций на комментарий статьи
router.get('/articles/:articleId/comments/:commentId/reactions', (req, res) => {

})

// Добавление реакции на комментарий статьи
router.post('/articles/:articleId/comments/:commentId/reactions', (req, res) => {

})

// Удаление реакции на комментарий статьи
router.delete('/articles/:articleId/comments/:commentId/reactions/:reactionId', (req, res) => {

})


module.exports = router