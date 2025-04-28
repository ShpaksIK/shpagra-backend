const articleSchema = (userId, title, description, banner, content, status) => {
    return {
        userId,
        title,
        description,
        banner,
        content,
        status
    }
}


module.exports = articleSchema