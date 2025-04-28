const ArticleModel = require('../models/article')
const commentSchema = require('../utils/schemes/comment-schema')
const reactionSchema = require('../utils/schemes/reaction-schema')
const articleSchema = require('../utils/schemes/article-schema')


// Получение превью рекомендуемых статей
const getRecommendedArticlesPreview = async (req, res) => {
    const recommendedArticlesPreview = await ArticleModel.getArticles()
    if (recommendedArticlesPreview) {
        res.status(200).json(recommendedArticlesPreview)
    } else {
        res.status(404).json()
    }
}

// Получение статьи
const getArticle = async (req, res) => {
    const { articleId } = req.params
    const article = await ArticleModel.getArticle(articleId)
    if (article) {
        res.status(200).json(article)
    } else {
        res.status(404).json()
    }
}

// Создание статьи
const createArticle = async (req, res) => {
    const { userId, title, description, banner, content, status, articleId = null } = req.body
    
    if (status === 'draft' || status === 'review' || status === 'published') {
        // Если мы "создаём" существующую статью, 
        // то запись о ней обновляется с состоянием, 
        // иначе мы создаём новую запись статьи в БД
        if (articleId) {
            const updatedArticle = await ArticleModel.updateArticle(articleSchema(
                userId, title, description, banner, content, status
            ), articleId)
            if (updatedArticle) {
                res.status(200).json(updatedArticle)
            } else {
                res.status(400).json()
            }
            return
        }

        const newArticle = await ArticleModel.createArticle(articleSchema(
            userId, title, description, banner, content, status
        ))
        if (newArticle) {
            res.status(201).json({
                articleId: newArticle.article_id
            })
        } else {
            res.status(400).json()
        }
    }
}

// Обновление статьи
const updateArticle = async (req, res) => {
    const { articleId } = req.params.articleId
    const { userId, title, description, banner, content, status } = req.body
    const updatedArticle = await ArticleModel.updateArticle(articleSchema(
        userId, title, description, banner, content, status
    ), articleId)
    if (updatedArticle) {
        res.status(200).json(updatedArticle)
    } else {
        res.status(400).json()
    }
}

// Удаление статьи
const deleteArticle = async (req, res) => {
    const { articleId } = req.params
    const deletedArticle = await ArticleModel.deleteArticle(articleId)
    if (deletedArticle) {
        res.status(204).json()
    } else {
        res.status(404).json()
    }
}

// Получение реакций статьи
const getArticleReactions = async (req, res) => {
    const { articleId } = req.params
    const articleReactions = await ArticleModel.getArticleReactions(articleId)
    if (articleReactions) {
        res.status(200).json(articleReactions)
    } else {
        res.status(404).json()
    }
}

// Добавление реакции на статью
const createArticleReaction = async (req, res) => {
    const { userId, relatedId, content } = req.body
    const newReaction = await ArticleModel.createArticleReaction(reactionSchema(
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

// Удаление реакции статьи
const deleteArticleReaction = async (req, res) => {
    const { reactionId } = req.params
    const deletedReaction = await ArticleModel.deleteArticleReaction(reactionId)
    if (deletedReaction) {
        res.status(204).json()
    } else {
        res.status(404).json()
    }
}

// Получение комментариев статьи
const getArticleComments = async (req, res) => {
    const { articleId } = req.params
    const articleComments = await ArticleModel.getArticleComments(articleId)
    if (articleComments) {
        res.status(200).json(articleComments)
    } else {
        res.status(404).json()
    }
}

// Добавление комментария на статью
const createArticleComment = async (req, res) => {
    const { userId, relatedId, parentCommentId, content } = req.body
    const newComment = await ArticleModel.createArticleComment(commentSchema(
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

// Обновление комментария статьи
const updateArticleComment = async (req, res) => {
    const { commentId } = req.params
    const { userId, relatedId, parentCommentId, content } = req.body
    const updatedComment = await ArticleModel.updateArticleComment(commentSchema(
        userId, relatedId, parentCommentId, content
    ), commentId)
    if (updatedComment) {
        res.status(200).json()
    } else {
        res.status(400).json()
    }
}

// Удаление комментария статьи
const deleteArticleComment = async (req, res) => {
    const { commentId } = req.params
    const deletedComment = await ArticleModel.deleteArticleComment(commentId)
    if (deletedComment) {
        res.status(204).json()
    } else {
        res.status(404).json()
    }
}

// Получение реакций комментария статьи
const getArticleCommentReactions = async (req, res) => {
    const { commentId } = req.params
    const commentReactions = await ArticleModel.getCommentReactions(commentId)
    if (commentReactions) {
        res.status(200).json(commentReactions)
    } else {
        res.status(404).json()
    }
}

// Добавление реакции на комментарий статьи
const createArticleCommentReaction = async (req, res) => {
    const { userId, relatedId, content } = req.body
    const newReaction = await ArticleModel.createCommentReaction(reactionSchema(
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

// Удаление реакции на комментарий статьи
const deleteArticleCommentReaction = async (req, res) => {
    const { reactionId } = req.params
    const deletedReaction = await ArticleModel.deleteCommentReaction(reactionId)
    if (deletedReaction) {
        res.status(204).json()
    } else {
        res.status(404).json()
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