const db = require('../config/db')


class PostModel {
    // Получение постов друзей в заданном количестве
    async getFriendsPosts(userId) {
        const receiptLimit = 10
        const friendsPosts = await db.query(
            ''
        )
        return friendsPosts
    }

    // Создание поста
    async createPost(post) {
        const newPost = await db.query(
            ''
        )
        return newPost 
    }

    // Удаление поста
    async deletePost(postId) {
        const deletedPost = await db.query(
            ''
        )
        return deletedPost 
    }

    // Получение реакций поста
    async getPostReactions(postId) {
        const postReactions = await db.query(
            ''
        )
        return postReactions
    }

    // Добавление реакции к посту
    async createPostReaction(reaction) {
        const newReaction = await db.query(
            ''
        )
        return newReaction
    }
    
    // Удаление реакции поста
    async deletePostReaction(reactionId) {
        const deletedReaction = await db.query(
            ''
        )
        return deletedReaction
    }

    // Получение комментариев поста
    async getPostComments(postId) {
        const postComments = await db.query(
            ''
        )
        return postComments
    }

    // Добавление комментария к посту
    async createPostComment(comment) {
        const newComment = await db.query(
            ''
        )
        return newComment
    }

    // Обновление комментария поста
    async updatePostComment(comment) {
        const updatedComment = await db.query(
            ''
        )
        return updatedComment
    }
    
    // Удаление комментария поста
    async deletePostComment(commentId) {
        const deletedComment = await db.query(
            ''
        )
        return deletedComment
    }

    // Получение реакций комментария поста
    async getCommentReactions(commentId) {
        const commentReactions = await db.query(
            ''
        )
        return commentReactions
    }

    // Добавление реакции на комментарий поста
    async createCommentReaction(reaction) {
        const newReaction = await db.query(
            ''
        )
        return newReaction
    }
    
    // Удаление реакции на комментарий поста
    async deleteCommentReaction(reactionId) {
        const deletedReaction = await db.query(
            ''
        )
        return deletedReaction
    }
}


module.exports = new PostModel()