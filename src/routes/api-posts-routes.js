const express = require('express')
const { getFriendsPosts, createPost, deletePost, 
    getPostReactions, createPostReaction, deletePostReaction, 
    getPostComments, createPostComment, deletePostComment, 
    updatePostComment, getPostCommentReactions, 
    createPostCommentReaction, deletePostCommentReaction } = require('../controllers/api-post-controller')
const router = express.Router()


// Получение постов друзей пользователя
router.post('/posts', (req, res) => {
    getFriendsPosts(req, res)
})

// Создание поста
router.post('/posts', (req, res) => {
    createPost(req, res)
})

// Удаление поста
router.delete('/posts/:postId', (req, res) => {
    deletePost(req, res)
})

// Получение реакций поста
router.get('/posts/:postId/reactions', (req, res) => {
    getPostReactions(req, res)
})

// Добавление реакции на пост
router.post('/posts/:postId/reactions', (req, res) => {
    createPostReaction(req, res)
})

// Удаление реакции поста
router.delete('/posts/:postId/reactions/:reactionId', (req, res) => {
    deletePostReaction(req, res)
})

// Получение комментариев поста
router.get('/posts/:postId/comments', (req, res) => {
    getPostComments(req, res)
})

// Добавление комментария на пост
router.post('/posts/:postId/comments', (req, res) => {
    createPostComment(req, res)
})

// Удаление комментария поста
router.delete('/posts/:postId/comments/:commentId', (req, res) => {
    deletePostComment(req, res)
})

// Изменение комментария поста
router.put('/posts/:postId/comments/:commentId', (req, res) => {
    updatePostComment(req, res)
})

// Получение реакций на комментарий поста
router.get('/posts/:postId/comments/:commentId/reactions', (req, res) => {
    getPostCommentReactions(req, res)
})

// Добавление реакции на комментарий поста
router.post('/posts/:postId/comments/:commentId/reactions', (req, res) => {
    createPostCommentReaction(req, res)
})

// Удаление реакции на комментарий поста
router.delete('/posts/:postId/comments/:commentId/reactions/:reactionId', (req, res) => {
    deletePostCommentReaction(req, res)
})


module.exports = router