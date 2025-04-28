const db = require('./../config/db')


// ARTICLE STATUS: draft, review, published

class ArticleModel {
    // Получение превью статей в заданном количестве
    async getArticles() {
        const receiptLimit = 10
        const articles = await db.query(
            `SELECT article_id, title, description, banner, created_at, user_id 
             FROM article 
             WHERE status = 'published' 
             ORDER BY created_at DESC 
             LIMIT $1`,
            [receiptLimit]
        )
        return articles.rows
    }

    // Получение опубликованных статей
    async getArticle(articleId) {
        const article = await db.query(
            `SELECT a.*, u.username 
             FROM article a
             JOIN "user" u ON a.user_id = u.user_id
             WHERE a.article_id = $1 AND a.status = 'published'`,
            [articleId]
        )
        return article.rows[0]
    }

    // Получение статьи на модерации
    async getReviewArticles() {
        const receiptLimit = 10
        const articles = await db.query(
            `SELECT * 
             FROM article 
             WHERE status = 'published' 
             ORDER BY created_at DESC 
             LIMIT $1`,
            [receiptLimit]
        )
        return articles.rows
    }

    // Добавление статьи
    async createArticle(article) {
        const newArticle = await db.query(
            `INSERT INTO article 
             (title, description, banner, content, status, user_id) 
             VALUES ($1, $2, $3, $4, $5, $6) 
             RETURNING *`,
            [article.title, article.description, article.banner, 
             article.content, article.status, article.userId]
        )
        return newArticle.rows[0]
    }

    // Обновление статьи
    async updateArticle(article, articleId) {
        const updatedArticle = await db.query(
            `UPDATE article 
             SET title = $1, description = $2, banner = $3, 
                content = $4, status = $5, updated_at = CURRENT_DATE 
             WHERE article_id = $6 
             RETURNING *`,
            [article.title, article.description, article.banner, 
             article.content, article.status, articleId]
        )
        return updatedArticle.rows[0]
    }

    // Удаление статьи
    async deleteArticle(articleId) {
        const deletedArticle = await db.query(
            'DELETE FROM article WHERE article_id = $1 RETURNING *',
            [articleId]
        )
        return deletedArticle.rows[0]
    }

    // Получение реакций статьи
    async getArticleReactions(articleId) {
        const articleReactions = await db.query(
            `SELECT r.*, u.username 
             FROM reaction_article r
             JOIN "user" u ON r.user_id = u.user_id
             WHERE r.article_id = $1`,
            [articleId]
        )
        return articleReactions.rows
    }


    // Добавление реакции на статью
    async createArticleReaction(reaction) {
        const newReaction = await db.query(
            `INSERT INTO reaction_article 
             (content, user_id, article_id) 
             VALUES ($1, $2, $3) 
             RETURNING *`,
            [reaction.content, reaction.userId, reaction.articleId]
        )
        return newReaction.rows[0]
    }
    
    // Удаление реакции статьи
    async deleteArticleReaction(reactionId) {
        const deletedReaction = await db.query(
            'DELETE FROM reaction_article WHERE reaction_article_id = $1 RETURNING *',
            [reactionId]
        )
        return deletedReaction.rows[0]
    }

    // Получение комментариев статьи
    async getArticleComments(articleId) {
        const articleComments = await db.query(
            `SELECT c.*, u.username 
             FROM comment_article c
             JOIN "user" u ON c.user_id = u.user_id
             WHERE c.article_id = $1
             ORDER BY c.created_at DESC`,
            [articleId]
        )
        return articleComments.rows
    }

    // Добавление комментария на статью
    async createArticleComment(comment) {
        const newComment = await db.query(
            `INSERT INTO comment_article 
             (content, user_id, article_id, parent_comment_article_id) 
             VALUES ($1, $2, $3, $4) 
             RETURNING *`,
            [comment.content, comment.userId, comment.articleId, comment.parentCommentId]
        )
        return newComment.rows[0]
    }

    // Обновление комментария статьи
    async updateArticleComment(comment) {
        const updatedComment = await db.query(
            `UPDATE comment_article 
             SET content = $1, updated_at = CURRENT_DATE 
             WHERE comment_article_id = $2 
             RETURNING *`,
            [comment.content, comment.commentId]
        )
        return updatedComment.rows[0]
    }
    
    // Удаление комментария статьи
    async deleteArticleComment(commentId) {
        const deletedComment = await db.query(
            'DELETE FROM comment_article WHERE comment_article_id = $1 RETURNING *',
            [commentId]
        )
        return deletedComment.rows[0]
    }

    // Получение реакций комментария статьи
    async getCommentReactions(commentId) {
        const commentReactions = await db.query(
            `SELECT r.*, u.username 
             FROM reaction_comment_article r
             JOIN "user" u ON r.user_id = u.user_id
             WHERE r.comment_article_id = $1`,
            [commentId]
        )
        return commentReactions.rows
    }

    // Добавление реакции на комментарий статьи
    async createCommentReaction(reaction) {
        const newReaction = await db.query(
            `INSERT INTO reaction_comment_article 
             (content, user_id, comment_article_id) 
             VALUES ($1, $2, $3) 
             RETURNING *`,
            [reaction.content, reaction.userId, reaction.commentId]
        )
        return newReaction.rows[0]
    }
    
    // Удаление реакции на комментарий статьи
    async deleteCommentReaction(reactionId) {
        const deletedReaction = await db.query(
            'DELETE FROM reaction_comment_article WHERE reaction_comment_article_id = $1 RETURNING *',
            [reactionId]
        )
        return deletedReaction.rows[0]
    }
}


module.exports = new ArticleModel()