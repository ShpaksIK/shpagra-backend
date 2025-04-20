const articleSchema = (userId, title, description, banner, content) => {
    return {
        userId,
        title,
        description,
        banner,
        content,
        status: 'review',
        updatedAt: null
    }
}


module.exports = articleSchema