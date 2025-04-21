const db = require('./../config/db')


class ArticleModel {
    // Получение превью статей в заданном количестве
    // Нужно учитывать статус статьи
    async getArticles() {
        const receiptLimit = 10
        const articles = await db.query(
            ''
        )
        return articles
    }

    // Получение статьи
    // Нужно учитывать статус статьи
    async getArticle(articleId) {
        const article = await db.query(
            ''
        )
        return article
    }

    // Добавление статьи
    async createArticle(article) {
        const newArticle = await db.query(
            ''
        )
        return newArticle
    }

    // Обновление статьи
    async updateArticle(article) {
        const updatedArticle = await db.query(
            ''
        )
        return updatedArticle
    }

    // Удаление статьи
    async deleteArticle(articleId) {
        const deletedArticle = await db.query(
            ''
        )
        return deletedArticle
    }

    // Получение реакций статьи
    async getArticleReactions(articleId) {
        const articleReactions = await db.query(
            ''
        )
        return articleReactions
    }

    // Добавление реакции на статью
    async createArticleReaction(reaction) {
        const newReaction = await db.query(
            ''
        )
        return newReaction
    }
    
    // Удаление реакции статьи
    async deleteArticleReaction(reactionId) {
        const deletedReaction = await db.query(
            ''
        )
        return deletedReaction
    }

    // Получение комментариев статьи
    async getArticleComments(articleId) {
        const articleComments = await db.query(
            ''
        )
        return articleComments
    }

    // Добавление комментария на статью
    async createArticleComment(comment) {
        const newComment = await db.query(
            ''
        )
        return newComment
    }

    // Обновление комментария статьи
    async updateArticleComment(comment) {
        const updatedComment = await db.query(
            ''
        )
        return updatedComment
    }
    
    // Удаление комментария статьи
    async deleteArticleComment(commentId) {
        const deletedComment = await db.query(
            ''
        )
        return deletedComment
    }

    // Получение реакций комментария статьи
    async getCommentReactions(commentId) {
        const commentReactions = await db.query(
            ''
        )
        return commentReactions
    }

    // Добавление реакции на комментарий статьи
    async createCommentReaction(reaction) {
        const newReaction = await db.query(
            ''
        )
        return newReaction
    }
    
    // Удаление реакции на комментарий статьи
    async deleteCommentReaction(reactionId) {
        const deletedReaction = await db.query(
            ''
        )
        return deletedReaction
    }
}


module.exports = new ArticleModel()