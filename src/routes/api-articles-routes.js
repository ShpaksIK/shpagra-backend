const express = require('express')
const { getRecommendedArticlesPreview, getArticle, 
    createArticle, deleteArticle, updateArticle, 
    getArticleReactions, createArticleReaction, 
    deleteArticleReaction, getArticleComments, 
    createArticleComment, deleteArticleComment, 
    updateArticleComment, getArticleCommentReactions, 
    createArticleCommentReaction, deleteArticleCommentReaction } = require('../controllers/api-article-controller')
const router = express.Router()


// Получение статей
router.get('/articles', (req, res) => {
    getRecommendedArticlesPreview(req, res)
})

// Получение статьи
router.get('/articles/:articleId', (req, res) => {
    getArticle(req, res)
})

// Создание статьи
router.post('/articles', (req, res) => {
    createArticle(req, res)
})

// Удаление статьи
router.delete('/articles/:articleId', (req, res) => {
    deleteArticle(req, res)
})

// Изменение статьи
router.put('/articles/:articleId', (req, res) => {
    updateArticle(req, res)
})

// Получение реакций статьи
router.get('/articles/:articleId/reactions', (req, res) => {
    getArticleReactions(req, res)
})

// Добавление реакции на статью
router.post('/articles/:articleId/reactions', (req, res) => {
    createArticleReaction(req, res)
})

// Удаление реакции статьи
router.delete('/articles/:articleId/reactions/:reactionId', (req, res) => {
    deleteArticleReaction(req, res)
})

// Получение комментариев статьи
router.get('/articles/:articleId/comments', (req, res) => {
    getArticleComments(req, res)
})

// Добавление комментария на статью
router.post('/articles/:articleId/comments', (req, res) => {
    createArticleComment(req, res)
})

// Удаление комментария статьи
router.delete('/articles/:articleId/comments/:commentId', (req, res) => {
    deleteArticleComment(req, res)
})

// Изменение комментария статьи
router.put('/articles/:articleId/comments/:commentId', (req, res) => {
    updateArticleComment(req, res)
})

// Получение реакций на комментарий статьи
router.get('/articles/:articleId/comments/:commentId/reactions', (req, res) => {
    getArticleCommentReactions(req, res)
})

// Добавление реакции на комментарий статьи
router.post('/articles/:articleId/comments/:commentId/reactions', (req, res) => {
    createArticleCommentReaction(req, res)
})

// Удаление реакции на комментарий статьи
router.delete('/articles/:articleId/comments/:commentId/reactions/:reactionId', (req, res) => {
    deleteArticleCommentReaction(req, res)
})


module.exports = router