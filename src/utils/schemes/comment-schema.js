const commentSchema = (userId, relatedId, parentCommentId, content) => {
    return {
        userId,
        relatedId,
        parentCommentId,
        content
    }
}


module.exports = commentSchema