const db = require('../config/db')


class PostModel {
    // Получение постов друзей в заданном количестве
    async getFriendsPosts(userId) {
        const receiptLimit = 10
        const friendsPosts = await db.query(
            `SELECT p.*, u.username 
             FROM post p
             JOIN "user" u ON p.user_id = u.user_id
             WHERE p.user_id IN (
                 SELECT followed_id 
                 FROM subscription 
                 WHERE follower_id = $1
             )
             ORDER BY p.created_at DESC
             LIMIT $2`,
            [userId, receiptLimit]
        )
        return friendsPosts.rows
    }

    // Создание поста
    async createPost(post) {
        const newPost = await db.query(
            `INSERT INTO post (content, user_id) 
             VALUES ($1, $2) 
             RETURNING *`,
            [post.content, post.userId]
        )
        return newPost.rows[0]
    }

    // Удаление поста
    async deletePost(postId) {
        const deletedPost = await db.query(
            'DELETE FROM post WHERE post_id = $1 RETURNING *',
            [postId]
        )
        return deletedPost.rows[0]
    }

    // Получение реакций поста
    async getPostReactions(postId) {
        const postReactions = await db.query(
            `SELECT r.*, u.username 
             FROM reaction_post r
             JOIN "user" u ON r.user_id = u.user_id
             WHERE r.post_id = $1`,
            [postId]
        )
        return postReactions.rows
    }

    // Добавление реакции к посту
    async createPostReaction(reaction) {
        const newReaction = await db.query(
            `INSERT INTO reaction_post 
             (content, user_id, post_id) 
             VALUES ($1, $2, $3) 
             RETURNING *`,
            [reaction.content, reaction.userId, reaction.postId]
        )
        return newReaction.rows[0]
    }
    
    // Удаление реакции поста
    async deletePostReaction(reactionId) {
        const deletedReaction = await db.query(
            'DELETE FROM reaction_post WHERE reaction_post_id = $1 RETURNING *',
            [reactionId]
        )
        return deletedReaction.rows[0]
    }

    // Получение комментариев поста
    async getPostComments(postId) {
        const postComments = await db.query(
            `SELECT c.*, u.username 
             FROM comment_post c
             JOIN "user" u ON c.user_id = u.user_id
             WHERE c.post_id = $1
             ORDER BY c.created_at DESC`,
            [postId]
        )
        return postComments.rows
    }

    // Добавление комментария к посту
    async createPostComment(comment) {
        const newComment = await db.query(
            `INSERT INTO comment_post 
             (content, user_id, post_id, parent_comment_post_id) 
             VALUES ($1, $2, $3, $4) 
             RETURNING *`,
            [comment.content, comment.userId, comment.postId, comment.parentCommentId]
        )
        return newComment.rows[0]
    }

    // Обновление комментария поста
    async updatePostComment(comment) {
        const updatedComment = await db.query(
            `UPDATE comment_post 
             SET content = $1, updated_at = CURRENT_DATE 
             WHERE comment_post_id = $2 
             RETURNING *`,
            [comment.content, comment.commentId]
        )
        return updatedComment.rows[0]
    }
    
    // Удаление комментария поста
    async deletePostComment(commentId) {
        const deletedComment = await db.query(
            'DELETE FROM comment_post WHERE comment_post_id = $1 RETURNING *',
            [commentId]
        )
        return deletedComment.rows[0]
    }

    // Получение реакций комментария поста
    async getCommentReactions(commentId) {
        const commentReactions = await db.query(
            `SELECT r.*, u.username 
             FROM reaction_comment_post r
             JOIN "user" u ON r.user_id = u.user_id
             WHERE r.comment_post_id = $1`,
            [commentId]
        )
        return commentReactions.rows
    }

    // Добавление реакции на комментарий поста
    async createCommentReaction(reaction) {
        const newReaction = await db.query(
            `INSERT INTO reaction_comment_post 
             (content, user_id, comment_post_id) 
             VALUES ($1, $2, $3) 
             RETURNING *`,
            [reaction.content, reaction.userId, reaction.commentId]
        )
        return newReaction.rows[0]
    }
    
    // Удаление реакции на комментарий поста
    async deleteCommentReaction(reactionId) {
        const deletedReaction = await db.query(
            'DELETE FROM reaction_comment_post WHERE reaction_comment_post_id = $1 RETURNING *',
            [reactionId]
        )
        return deletedReaction.rows[0]
    }
}


module.exports = new PostModel()