const reactionSchema = (userId, relatedId, content) => {
    return {
        userId,
        relatedId,
        content
    }
}


module.exports = reactionSchema