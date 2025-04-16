const { requestMainArticles, requestProfileArticles, requestUserProfileArticles, createLikeArticle, requestArticleData, requestArticlePreview } = require('../model/article')
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

// Лайк статьи
const likeArticle = (req, res) => {
    const { profileId, articleId, authId } = req.body
    const isLikedArticle = createLikeArticle(profileId, articleId, authId)
    if (isLikedArticle) {
        res.status(200)
    } else {
        res.status(500)
    }
}

// Получение всей статьи
const getArticleData = (req, res) => {
    const articleId = req.params.articleId 
    const fullArticle = requestArticleData(articleId)
    if (fullArticle) {
        res.status(200).json(responseSchema({
            'article': fullArticle
        }))
    } else {
        res.status(500)
    }
}

// Получение части статьи. Нужно для ленты
const getArticlePreview = (req, res) => {
    const articleId = req.params.articleId 
    const previewArticle = requestArticlePreview(articleId)
    res.status(200).json(responseSchema({
        'article': previewArticle
    }))
}


module.exports = {
    getMainArticles,
    getProfileArticles,
    getUserProfileArticles,
    likeArticle,
    getArticleData,
    getArticlePreview
}