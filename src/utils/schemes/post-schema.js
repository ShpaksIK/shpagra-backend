const postSchema = (userId, content) => {
    return {
        userId,
        content,
        updatedAt: null
    }
}


module.exports = postSchema