const ArticleModel = require('./../models/article')
const articleSchema = require('./../utils/schemes/articleSchema')


const authId = 1 // для теста

// Получение превью статьи. Нужно для ленты
const getArticlesPreview = (req, res) => {
    const articleId = req.params.articleId 
    const previewArticle = requestArticlePreview(articleId)
    res.status(200).json(responseSchema({
        'article': previewArticle
    }))
}

// Получение рекомендуемых статей
const getRecommendedArticles = (req, res) => {
    const mainArticles = ArticleModel.getArticles()
    if (mainArticles) {
        res.status(200).json(mainArticles)
    } else {
        res.status(404)
    }
}

// Получение статьи
const getArticle = (req, res) => {
    const articleId = req.params.articleId
    const article = ArticleModel.getArticle(articleId)
    if (article) {
        res.status(200).json(article)
    } else {
        res.status(404)
    }
}

// Создание статьи
const createArticle = (req, res) => {
    const { userId, title, description, banner, content } = req.body
    const article = ArticleModel.createArticle(articleSchema({
        userId, title, description, banner, content
    }))
    if (article) {
        res.status(201).json({
            articleId: article.article_id
        })
    } else {
        res.status(400)
    }
}

// Обновление статьи
const updateArticle = (req, res) => {
    const { userId, title, description, banner, content } = req.body
    const article = ArticleModel.updateArticle(articleSchema({
        userId, title, description, banner, content
    }))
    if (article) {
        res.status(200)
    } else {
        res.status(400)
    }
}

// Удаление статьи
const deleteArticle = (req, res) => {
    const articleId = req.params.articleId
    const article = ArticleModel.deleteArticle(articleId)
    if (article) {
        res.status(204)
    } else {
        res.status(404)
    }
}


module.exports = {
    getArticlesPreview,
    getRecommendedArticles,
    getArticle,
    createArticle,
    updateArticle,
    deleteArticle,
}