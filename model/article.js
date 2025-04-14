const { users, posts, articles, articles_content, articles_draft, articles_to_moderation, comments } = require('./../db')


const requestMainArticles = (authId) => {
    const outputArticles = Object.values(articles)
        .flatMap(articleArray => articleArray)
        .filter(authId ? article => article.author_id !== authId : 1)
    for (let i = 0; i <= outputArticles.length - 1; i++) {
        outputArticles[i].author_avatar = users[outputArticles[i].author_id].avatar
    }
    return outputArticles
}

const requestProfileArticles = (profileId) => {
    let profileArticles = articles[`${profileId}`]
    if (profileArticles) {
        for (let i = 0; i <= profileArticles.length - 1; i++) {
            profileArticles[i].author_avatar = users[profileArticles[i].author_id].avatar
        }
    }
    return profileArticles
}

const requestUserProfileArticles = (authId) => {
    const profileArticles = articles[`${authId}`]
    if (profileArticles) {
        for (let i = 0; i <= profileArticles.length - 1; i++) {
            profileArticles[i].author_avatar = users[profileArticles[i].author_id].avatar
        }
    }
    const draftArticles = articles_draft[`${authId}`]
    if (draftArticles) {
        for (let i = 0; i <= draftArticles.length - 1; i++) {
            draftArticles[i].author_avatar = users[draftArticles[i].author_id].avatar
        }
    }
    const moderationArticles = [articles_to_moderation.find(art => art.author_id === authId)].filter(a => a !== undefined)
    if (moderationArticles) {
        for (let i = 0; i <= moderationArticles.length - 1; i++) {
            moderationArticles[i].author_avatar = users[moderationArticles[i].author_id].avatar
        }
    }
    return {profileArticles, draftArticles, moderationArticles}
}


module.exports = {
    requestMainArticles,
    requestProfileArticles,
    requestUserProfileArticles
}