const UserModel = require('./../models/user')
const responseSchema = require('./../utils/responceSchema')


const authId = 1


const getUsers = async (req, res) => {
    const users = await UserModel.getUsers()
    res.json(users)
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
    getUsers
}