const express = require('express')
const { getFriendsPosts, createPost, deletePost, 
    getPostReactions, createPostReaction, deletePostReaction, 
    getPostComments, createPostComment, deletePostComment, 
    updatePostComment, getPostCommentReactions, 
    createPostCommentReaction, deletePostCommentReaction } = require('../controllers/api-post-controller')
const router = express.Router()


// Получение постов друзей пользователя
router.post('/posts', getFriendsPosts)

// Создание поста
router.post('/posts', createPost)

// Удаление поста
router.delete('/posts/:postId', deletePost)

// Получение реакций поста
router.get('/posts/:postId/reactions', getPostReactions)

// Добавление реакции на пост
router.post('/posts/:postId/reactions', createPostReaction)

// Удаление реакции поста
router.delete('/posts/:postId/reactions/:reactionId', deletePostReaction)

// Получение комментариев поста
router.get('/posts/:postId/comments', getPostComments)

// Добавление комментария на пост
router.post('/posts/:postId/comments', createPostComment)

// Удаление комментария поста
router.delete('/posts/:postId/comments/:commentId', deletePostComment)

// Изменение комментария поста
router.put('/posts/:postId/comments/:commentId', updatePostComment)

// Получение реакций на комментарий поста
router.get('/posts/:postId/comments/:commentId/reactions', getPostCommentReactions)

// Добавление реакции на комментарий поста
router.post('/posts/:postId/comments/:commentId/reactions', createPostCommentReaction)

// Удаление реакции на комментарий поста
router.delete('/posts/:postId/comments/:commentId/reactions/:reactionId', deletePostCommentReaction)


module.exports = router