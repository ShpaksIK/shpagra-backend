const UserModel = require('./../models/user')
const userSchema = require('../utils/schemes/userSchema')
const notificationSchema = require('../utils/schemes/notificationSchema')
const subscriptionSchema = require('../utils/schemes/subscriptionSchema')


const authId = 1 // для теста

// Получение пользователей
const getUsers = (req, res) => {
    const users = UserModel.getUsers()
    if (users) {
        res.status(200).json(users)
    } else {
        res.status(404)
    }
}

// Получение пользователя
const getUser = (req, res) => {
    const userId = req.params.userId
    const user = UserModel.getUser(userId)
    if (user) {
        res.status(200).json(user)
    } else {
        res.status(404)
    }
}

// Добавление пользователя
const createUser = (req, res) => {
    const { login, username, passwordHash } = req.body
    const newUser = UserModel.createUser(userSchema(
        login, username, passwordHash
    ))
    if (newUser) {
        res.status(201).json({
            userId: newUser.userId
        })
    } else {
        res.status(400)
    }
}

// Обновление пользователя
const updateUser = (req, res) => {
    const { login, username, passwordHash, email } = req.body
    const updatedUser = UserModel.updateUser(userSchema(
        login, username, passwordHash, email
    ))
    if (updatedUser) {
        res.status(200)
    } else {
        res.status(400)
    }
}

// Удаление пользователя
const deleteUser = (req, res) => {
    const userId = req.params.userId
    const deletedUser = UserModel.deleteUser(userId)
    if (deletedUser) {
        res.status(204)
    } else {
        res.status(404)
    }
}

// Получение всех статей пользователя
const getUserArticles = (req, res) => {
    const userId = req.params.userId
    const userArticles = UserModel.getUserArticles(userId)
    if (userArticles) {
        res.status(200).json(userArticles)
    } else {
        res.status(404)
    }
}

// Получение всех постов пользователя
const getUserPosts = (req, res) => {
    const userId = req.params.userId
    const userPosts = UserModel.getUserPosts(userId)
    if (userPosts) {
        res.status(200).json(userPosts)
    } else {
        res.status(404)
    }
}

// Получение всех уведомлений пользователя
const getUserNotifications = (req, res) => {
    const userId = req.params.userId
    const userNotifications = UserModel.getUserNotifications(userId)
    if (userNotifications) {
        res.status(200).json(userNotifications)
    } else {
        res.status(404)
    }
}

// Создание уведомления пользователя
const createUserNotifications = (req, res) => {
    const { userId, relatedId, type, content } = req.body
    const newNotifications = UserModel.createUserNotifications(notificationSchema(
        userId, relatedId, type, content
    ))
    if (newNotifications) {
        res.status(201).json({
            notificationId: newNotifications.notificationId
        })
    } else {
        res.status(400)
    }
}

// Получение всех подписчиков пользователя
const getUserFollowers = (req, res) => {
    const userId = req.params.userId
    const userFollowers = UserModel.getUserFollowers(userId)
    if (userFollowers) {
        res.status(200).json(userFollowers)
    } else {
        res.status(404)
    }
}

// Получение всех подписок пользователя
const getUserFolloweds = (req, res) => {
    const userId = req.params.userId
    const userFolloweds = UserModel.getUserFolloweds(userId)
    if (userFolloweds) {
        res.status(200).json(userFolloweds)
    } else {
        res.status(404)
    }
}

// Создание подписки пользователя на другого
const followToUser = (req, res) => {
    const { userId, followedId } = req.body
    const newFollow = UserModel.followToUser(subscriptionSchema(
        userId, followedId
    ))
    if (newFollow) {
        res.status(201).json({
            subscriptionId: newFollow.subscriptionId
        })
    } else {
        res.status(400)
    }
}

// Удаление подписки пользователя на другого
const unfollowToUser = (req, res) => {
    const subscriptionId = req.params.subscriptionId
    const deletedFollow = UserModel.unfollowToUser(subscriptionId)
    if (deletedFollow) {
        res.status(204)
    } else {
        res.status(404)
    }
}


module.exports = {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
    getUserArticles,
    getUserPosts,
    getUserNotifications,
    createUserNotifications,
    getUserFollowers,
    getUserFolloweds,
    followToUser,
    unfollowToUser
}