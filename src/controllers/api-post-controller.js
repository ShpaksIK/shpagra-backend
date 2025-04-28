const PostModel = require('../models/post')
const commentSchema = require('../utils/schemes/comment-schema')
const reactionSchema = require('../utils/schemes/reaction-schema')
const postSchema = require('../utils/schemes/post-schema')


// Получение постов друзей
const getFriendsPosts = async (req, res) => {
    const { userId } = req.body
    const friendsPosts = await PostModel.getFriendsPosts(userId)
    if (friendsPosts) {
        res.status(200).json(friendsPosts)
    } else {
        res.status(404).json()
    }
}

// Создание поста
const createPost = async (req, res) => {
    const { userId, content } = req.body
    const newPost = await PostModel.createPost(postSchema(
        userId, content
    ))
    if (newPost) {
        res.status(201).json({
            postId: newPost.post_id
        })
    } else {
        res.status(400).json()
    }
}

// Удаление поста
const deletePost = async (req, res) => {
    const { postId } = req.params
    const deletedPost = await PostModel.deletePost(postId)
    if (deletedPost) {
        res.status(204).json()
    } else {
        res.status(404).json()
    }
}

// Получение реакций поста
const getPostReactions = async (req, res) => {
    const { postId } = req.params
    const postReactions = await PostModel.getPostReactions(postId)
    if (postReactions) {
        res.status(200).json(postReactions)
    } else {
        res.status(404).json()
    }
}

// Добавление реакции на пост
const createPostReaction = async (req, res) => {
    const { userId, relatedId, content } = req.body
    const newReaction = await PostModel.createPostReaction(reactionSchema(
        userId, relatedId, content
    ))
    if (newReaction) {
        res.status(201).json({
            reactionId: newReaction.reactionId
        })
    } else {
        res.status(400).json()
    }
}

// Удаление реакции поста
const deletePostReaction = async (req, res) => {
    const { reactionId } = req.params
    const deletedReaction = await PostModel.deletePostReaction(reactionId)
    if (deletedReaction) {
        res.status(204).json()
    } else {
        res.status(404).json()
    }
}

// Получение комментариев поста
const getPostComments = async (req, res) => {
    const { postId } = req.params
    const postComments = await PostModel.getPostComments(postId)
    if (postComments) {
        res.status(200).json(postComments)
    } else {
        res.status(404).json()
    }
}

// Добавление комментария на пост
const createPostComment = async (req, res) => {
    const { userId, relatedId, parentCommentId, content } = req.body
    const newComment = await PostModel.createPostComment(commentSchema(
        userId, relatedId, parentCommentId, content
    ))
    if (newComment) {
        res.status(201).json({
            commentId: newComment.commentId
        })
    } else {
        res.status(400).json()
    }
}

// Обновление комментария поста
const updatePostComment = async (req, res) => {
    const { commentId } = req.params
    const { userId, relatedId, parentCommentId, content } = req.body
    const updatedComment = await PostModel.updatePostComment(commentSchema(
        userId, relatedId, parentCommentId, content
    ), commentId)
    if (updatedComment) {
        res.status(200).json()
    } else {
        res.status(400).json()
    }
}

// Удаление комментария поста
const deletePostComment = async (req, res) => {
    const { commentId } = req.params
    const deletedComment = await PostModel.deletePostComment(commentId)
    if (deletedComment) {
        res.status(204).json()
    } else {
        res.status(404).json()
    }
}

// Получение реакций комментария поста
const getPostCommentReactions = async (req, res) => {
    const { commentId } = req.params
    const commentReactions = await PostModel.getCommentReactions(commentId)
    if (commentReactions) {
        res.status(200).json(commentReactions)
    } else {
        res.status(404).json()
    }
}

// Добавление реакции на комментарий поста
const createPostCommentReaction = async (req, res) => {
    const { userId, relatedId, content } = req.body
    const newReaction = await PostModel.createCommentReaction(reactionSchema(
        userId, relatedId, content
    ))
    if (newReaction) {
        res.status(201).json({
            reactionId: newReaction.reactionId
        })
    } else {
        res.status(400).json()
    }
}

// Удаление реакции на комментарий поста
const deletePostCommentReaction = async (req, res) => {
    const { reactionId } = req.params
    const deletedReaction = await PostModel.deleteCommentReaction(reactionId)
    if (deletedReaction) {
        res.status(204).json()
    } else {
        res.status(404).json()
    }
}


module.exports = {
    getFriendsPosts,
    createPost,
    deletePost,
    getPostReactions,
    createPostReaction,
    deletePostReaction,
    getPostComments,
    createPostComment,
    updatePostComment,
    deletePostComment,
    getPostCommentReactions,
    createPostCommentReaction,
    deletePostCommentReaction
}