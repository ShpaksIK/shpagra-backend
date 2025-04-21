const ArticleModel = require('../models/article')
const commentSchema = require('../utils/schemes/commentSchema')
const reactionSchema = require('../utils/schemes/reactionSchema')
const articleSchema = require('../utils/schemes/articleSchema')


const authId = 1 // для теста

// Получение превью рекомендуемых статей
const getRecommendedArticlesPreview = (req, res) => {
    const recommendedArticlesPreview = ArticleModel.getArticles()
    if (recommendedArticlesPreview) {
        res.status(200).json(recommendedArticlesPreview)
    } else {
        res.status(404)
    }
}

// Получение статьи
const getArticle = (req, res) => {
    const articleId = req.params.articleId
    const article = ArticleModel.getArticle(articleId)
    if (article) {
        res.status(200).json(article)
    } else {
        res.status(404)
    }
}

// Создание статьи
const createArticle = (req, res) => {
    const { userId, title, description, banner, content } = req.body
    const newArticle = ArticleModel.createArticle(articleSchema(
        userId, title, description, banner, content
    ))
    if (newArticle) {
        res.status(201).json({
            articleId: newArticle.article_id
        })
    } else {
        res.status(400)
    }
}

// Обновление статьи
const updateArticle = (req, res) => {
    const { userId, title, description, banner, content } = req.body
    const updatedArticle = ArticleModel.updateArticle(articleSchema(
        userId, title, description, banner, content
    ))
    if (updatedArticle) {
        res.status(200)
    } else {
        res.status(400)
    }
}

// Удаление статьи
const deleteArticle = (req, res) => {
    const articleId = req.params.articleId
    const deletedArticle = ArticleModel.deleteArticle(articleId)
    if (deletedArticle) {
        res.status(204)
    } else {
        res.status(404)
    }
}

// Получение реакций статьи
const getArticleReactions = (req, res) => {
    const articleId = req.params.articleId
    const articleReactions = ArticleModel.getArticleReactions(articleId)
    if (articleReactions) {
        res.status(200).json(articleReactions)
    } else {
        res.status(404)
    }
}

// Добавление реакции на статью
const createArticleReaction = (req, res) => {
    const { userId, relatedId, content } = req.body
    const newReaction = ArticleModel.createArticleReaction(reactionSchema(
        userId, relatedId, content
    ))
    if (newReaction) {
        res.status(201).json({
            reactionId: newReaction.reactionId
        })
    } else {
        res.status(400)
    }
}

// Удаление реакции статьи
const deleteArticleReaction = (req, res) => {
    const reactionId = req.params.reactionId
    const deletedReaction = ArticleModel.deleteArticleReaction(reactionId)
    if (deletedReaction) {
        res.status(204)
    } else {
        res.status(404)
    }
}

// Получение комментариев статьи
const getArticleComments = (req, res) => {
    const articleId = req.params.articleId
    const articleComments = ArticleModel.getArticleComments(articleId)
    if (articleComments) {
        res.status(200).json(articleComments)
    } else {
        res.status(404)
    }
}

// Добавление комментария на статью
const createArticleComment = (req, res) => {
    const { userId, relatedId, parentCommentId, content } = req.body
    const newComment = ArticleModel.createArticleComment(commentSchema(
        userId, relatedId, parentCommentId, content
    ))
    if (newComment) {
        res.status(201).json({
            commentId: newComment.commentId
        })
    } else {
        res.status(400)
    }
}

// Обновление комментария статьи
const updateArticleComment = (req, res) => {
    const { userId, relatedId, parentCommentId, content } = req.body
    const updatedComment = ArticleModel.updateArticleComment(commentSchema(
        userId, relatedId, parentCommentId, content
    ))
    if (updatedComment) {
        res.status(200)
    } else {
        res.status(400)
    }
}

// Удаление комментария статьи
const deleteArticleComment = (req, res) => {
    const commentId = req.params.commentId
    const deletedComment = ArticleModel.deleteArticleComment(commentId)
    if (deletedComment) {
        res.status(204)
    } else {
        res.status(404)
    }
}

// Получение реакций комментария статьи
const getArticleCommentReactions = (req, res) => {
    const commentId = req.params.commentId
    const commentReactions = ArticleModel.getCommentReactions(commentId)
    if (commentReactions) {
        res.status(200).json(commentReactions)
    } else {
        res.status(404)
    }
}

// Добавление реакции на комментарий статьи
const createArticleCommentReaction = (req, res) => {
    const { userId, relatedId, content } = req.body
    const newReaction = ArticleModel.createCommentReaction(reactionSchema(
        userId, relatedId, content
    ))
    if (newReaction) {
        res.status(201).json({
            reactionId: newReaction.reactionId
        })
    } else {
        res.status(400)
    }
}

// Удаление реакции на комментарий статьи
const deleteArticleCommentReaction = (req, res) => {
    const reactionId = req.params.reactionId
    const deletedReaction = ArticleModel.deleteCommentReaction(reactionId)
    if (deletedReaction) {
        res.status(204)
    } else {
        res.status(404)
    }
}


module.exports = {
    getRecommendedArticlesPreview,
    getArticle,
    createArticle,
    updateArticle,
    deleteArticle,
    getArticleReactions,
    getArticleComments,
    deleteArticleReaction,
    createArticleReaction,
    createArticleComment,
    updateArticleComment,
    deleteArticleComment,
    getArticleCommentReactions,
    createArticleCommentReaction,
    deleteArticleCommentReaction
}