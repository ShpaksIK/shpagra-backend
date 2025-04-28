const UserModel = require('./../models/user')
const userAuthSchema = require('../utils/schemes/user-auth-schema')
const userUpdateSchema = require('../utils/schemes/user-update-schema')
const notificationSchema = require('../utils/schemes/notification-schema')
const subscriptionSchema = require('../utils/schemes/subscription-schema')


// Получение пользователей
const getUsers = async (req, res) => {
    const users = await UserModel.getUsers()
    if (users) {
        res.status(200).json(users)
    } else {
        res.status(404).json()
    }
}

// Получение пользователя
const getUser = async (req, res) => {
    const userId = req.params.userId
    const user = await UserModel.getUser(userId)
    if (user) {
        res.status(200).json(user)
    } else {
        res.status(404).json()
    }
}

// Добавление пользователя
const createUser = async (req, res) => {
    const { login, username, passwordHash } = req.body
    const newUser = await UserModel.createUser(userAuthSchema(
        login, username, passwordHash
    ))
    if (newUser) {
        res.status(201).json({
            userId: newUser.userId
        })
    } else {
        res.status(400).json()
    }
}

// Обновление пользователя
const updateUser = async (req, res) => {
    const { userId } = req.params
    const { login, username, email } = req.body
    const updatedUser = await UserModel.updateUser(userUpdateSchema(
        login, username, email
    ), userId)
    if (updatedUser) {
        res.status(200).json(updatedUser)
    } else {
        res.status(400).json()
    }
}

// Изменение пароля пользователя
const updateUserPassword = async (req, res) => {
    const { userId } = req.params
    const { password } = req.body
    const updatedUserPassword = await UserModel.updateUserPassword(password, userId)
    if (updatedUserPassword) {
        res.status(200).json()
    } else {
        res.status(400).json()
    }
}

// Удаление пользователя
const deleteUser = async (req, res) => {
    const { userId } = req.params
    const deletedUser = await UserModel.deleteUser(userId)
    if (deletedUser) {
        res.status(204).json()
    } else {
        res.status(404).json()
    }
}

// Получение всех статей пользователя
const getUserArticles = async (req, res) => {
    const { userId } = req.params
    const userArticles = await UserModel.getUserArticles(userId)
    if (userArticles) {
        res.status(200).json(userArticles)
    } else {
        res.status(404).json()
    }
}

// Получение всех постов пользователя
const getUserPosts = async (req, res) => {
    const { userId } = req.params
    const userPosts = await UserModel.getUserPosts(userId)
    if (userPosts) {
        res.status(200).json(userPosts)
    } else {
        res.status(404).json()
    }
}

// Получение всех уведомлений пользователя
const getUserNotifications = async (req, res) => {
    const { userId } = req.params
    const userNotifications = await UserModel.getUserNotifications(userId)
    if (userNotifications) {
        res.status(200).json(userNotifications)
    } else {
        res.status(404).json()
    }
}

// Создание уведомления пользователя
const createUserNotifications = async (req, res) => {
    const { userId } = req.params
    const { relatedId, type, content } = req.body
    const newNotifications = await UserModel.createUserNotifications(notificationSchema(
        userId, relatedId, type, content
    ))
    if (newNotifications) {
        res.status(201).json({
            notificationId: newNotifications.notificationId
        })
    } else {
        res.status(400).json()
    }
}

// Получение всех подписчиков пользователя
const getUserFollowers = async (req, res) => {
    const { userId } = req.params
    const userFollowers = await UserModel.getUserFollowers(userId)
    if (userFollowers) {
        res.status(200).json(userFollowers)
    } else {
        res.status(404).json()
    }
}

// Получение всех подписок пользователя
const getUserFolloweds = async (req, res) => {
    const { userId } = req.params
    const userFolloweds = await UserModel.getUserFolloweds(userId)
    if (userFolloweds) {
        res.status(200).json(userFolloweds)
    } else {
        res.status(404).json()
    }
}

// Создание подписки пользователя на другого
const followToUser = async (req, res) => {
    const { userId } = req.params 
    const { followedId } = req.body
    const newFollow = await UserModel.followToUser(subscriptionSchema(
        userId, followedId
    ))
    if (newFollow) {
        res.status(201).json({
            subscriptionId: newFollow.subscriptionId
        })
    } else {
        res.status(400).json()
    }
}

// Удаление подписки пользователя на другого
const unfollowToUser = async (req, res) => {
    const subscriptionId = req.params.subscriptionId
    const deletedFollow = await UserModel.unfollowToUser(subscriptionId)
    if (deletedFollow) {
        res.status(204).json()
    } else {
        res.status(404).json()
    }
}


module.exports = {
    getUsers,
    getUser,
    createUser,
    updateUser,
    updateUserPassword,
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