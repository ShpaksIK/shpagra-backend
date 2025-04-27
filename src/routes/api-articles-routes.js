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
router.get('/articles', getRecommendedArticlesPreview)

// Получение статьи
router.get('/articles/:articleId', getArticle)

// Создание статьи
router.post('/articles', createArticle)

// Удаление статьи
router.delete('/articles/:articleId', deleteArticle)

// Изменение статьи
router.put('/articles/:articleId', updateArticle)

// Получение реакций статьи
router.get('/articles/:articleId/reactions', getArticleReactions)

// Добавление реакции на статью
router.post('/articles/:articleId/reactions', createArticleReaction)

// Удаление реакции статьи
router.delete('/articles/:articleId/reactions/:reactionId', deleteArticleReaction)

// Получение комментариев статьи
router.get('/articles/:articleId/comments', getArticleComments)

// Добавление комментария на статью
router.post('/articles/:articleId/comments', createArticleComment)

// Удаление комментария статьи
router.delete('/articles/:articleId/comments/:commentId', deleteArticleComment)

// Изменение комментария статьи
router.put('/articles/:articleId/comments/:commentId', updateArticleComment)

// Получение реакций на комментарий статьи
router.get('/articles/:articleId/comments/:commentId/reactions', getArticleCommentReactions)

// Добавление реакции на комментарий статьи
router.post('/articles/:articleId/comments/:commentId/reactions', createArticleCommentReaction)

// Удаление реакции на комментарий статьи
router.delete('/articles/:articleId/comments/:commentId/reactions/:reactionId', deleteArticleCommentReaction)


module.exports = router