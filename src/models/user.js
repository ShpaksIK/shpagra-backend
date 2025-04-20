const db = require('./../config/db')


class UserModel {
    // Получение пользователей в заданном количестве
    async getUsers() {
        const receiptLimit = 10
        const users = await db.query(
            ''
        )
        return users
    }

    // Получение пользователя
    async getUser(userId) {
        const user = await db.query(
            ''
        )
        return user
    }

    // Добавление пользователя
    async createUser(user) {
        const newUser = await db.query(
            ''
        )
        return newUser 
    }

    // Обновление пользователя
    async updateUser(user) {
        const updatedUser = await db.query(
            ''
        )
        return updatedUser 
    }

    // Удаление пользователя
    async deleteUser(userId) {
        const deletedUser = await db.query(
            ''
        )
        return deletedUser 
    }

    // Получение всех статей пользователя
    async getUserArticles(userId) {
        const userArticles = await db.query(
            ''
        )
        return userArticles
    }

    // Получение всех постов пользователя
    async getUserPosts(userId) {
        const userPosts = await db.query(
            ''
        )
        return userPosts
    }

    // Получение всех уведомлений пользователя
    async getUserNotifications(userId) {
        const userNotifications = await db.query(
            ''
        )
        return userNotifications
    }

    // Создание уведомления пользователя
    async createUserNotifications(notification) {
        const newNotifications = await db.query(
            ''
        )
        return newNotifications
    }

    // Получение всех подписчиков пользователя
    async getUserFollowers(userId) {
        const userFollowers = await db.query(
            ''
        )
        return userFollowers
    }

    // Получение всех подписок пользователя
    async getUserFolloweds(userId) {
        const userFolloweds = await db.query(
            ''
        )
        return userFolloweds
    }

    // Создание подписки пользователя на другого
    async followToUser(subscription) {
        const newFollow = await db.query(
            ''
        )
        return newFollow
    }

    // Удаление подписки пользователя на другого
    async unfollowToUser(subscriptionId) {
        const deletedFollow = await db.query(
            ''
        )
        return deletedFollow
    }
}


module.exports = new UserModel()