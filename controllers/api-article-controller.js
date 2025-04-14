const { requestMainArticles, requestProfileArticles, requestUserProfileArticles } = require('../model/article')
const { users, posts, articles, articles_content, articles_draft, articles_to_moderation, comments } = require('./../db')
const responseSchema = require('./../utils/responceSchema')


const authId = 1

// Получение рекомендуемых статей
const getMainArticles = (req, res) => {
    const mainArticles = requestMainArticles(authId)
    res.status(200).json(responseSchema({
        'articles': mainArticles
    }))
}

// Получение статей профиля
const getProfileArticles = (req, res) => {
    const profileId = req.params.profileId
    if (profileId == authId) {
        res.redirect('/profile')
    } else {
        const profileArticles = requestProfileArticles(profileId)
        res.status(200).json(responseSchema({
            'profileArticles': profileArticles ? profileArticles : [],
            'draftArticles': [],
            'moderationArticles': []
        }))
    }
}

// Получение статей своего профиля
const getUserProfileArticles = (req, res) => {
    const { profileArticles, draftArticles, moderationArticles } = requestUserProfileArticles(authId)
    res.status(200).json(responseSchema({
        'profileArticles': profileArticles ? profileArticles : [],
        'draftArticles': draftArticles ? draftArticles : [],
        'moderationArticles': moderationArticles ? moderationArticles : []
    }))
}


module.exports = {
    getMainArticles,
    getProfileArticles,
    getUserProfileArticles
}