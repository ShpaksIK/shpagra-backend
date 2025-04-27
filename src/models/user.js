const db = require('./../config/db')


class UserModel {
    // Получение пользователей в заданном количестве
    async getUsers() {
        const receiptLimit = 10;
        const users = await db.query('SELECT * FROM "user" LIMIT $1', [receiptLimit])
        return users.rows
    }

    // Получение пользователя
    async getUser(userId) {
        const user = await db.query(
            'SELECT * FROM "user" WHERE user_id = $1',
            [userId]
        )
        return user.rows[0]
    }

    // Добавление пользователя
    async createUser(user) {
        const newUser = await db.query(
            'INSERT INTO "user" (login, username, password_hash, email) VALUES ($1, $2, $3, $4) RETURNING *',
            [user.login, user.username, user.passwordHash, user.email]
        )
        return newUser.rows[0]
    }

    // Обновление пользователя
    async updateUser(user, userId) {
        const updatedUser = await db.query(
            'UPDATE "user" SET login = $1, username = $2, password_hash = $3, email = $4, updated_at = CURRENT_DATE WHERE user_id = $5 RETURNING *',
            [user.login, user.username, user.passwordHash, user.email, userId]
        )
        return updatedUser.rows[0]
    }

    // Удаление пользователя
    async deleteUser(userId) {
        const deletedUser = await db.query(
            'DELETE FROM "user" WHERE user_id = $1 RETURNING *',
            [userId]
        )
        return deletedUser.rows[0]
    }

    // Получение всех статей пользователя
    async getUserArticles(userId) {
        const userArticles = await db.query(
            'SELECT * FROM article WHERE user_id = $1',
            [userId]
        )
        return userArticles.rows
    }

    // Получение всех постов пользователя
    async getUserPosts(userId) {
        const userPosts = await db.query(
            'SELECT * FROM post WHERE user_id = $1',
            [userId]
        )
        return userPosts.rows
    }

    // Получение всех уведомлений пользователя
    async getUserNotifications(userId) {
        const userNotifications = await db.query(
            'SELECT * FROM notification WHERE user_id = $1 ORDER BY created_at DESC',
            [userId]
        )
        return userNotifications.rows
    }

    // Создание уведомления пользователя
    async createUserNotifications(notification) {
        const newNotifications = await db.query(
            'INSERT INTO notification (type, content, user_id, related_id) VALUES ($1, $2, $3, $4) RETURNING *',
            [notification.type, notification.content, notification.userId, notification.relatedId]
        )
        return newNotifications.rows[0]
    }

    // Получение всех подписчиков пользователя
    async getUserFollowers(userId) {
        const userFollowers = await db.query(
            'SELECT u.* FROM subscription s JOIN "user" u ON s.follower_id = u.user_id WHERE s.followed_id = $1',
            [userId]
        )
        return userFollowers.rows
    }

    // Получение всех подписок пользователя
    async getUserFolloweds(userId) {
        const userFolloweds = await db.query(
            'SELECT u.* FROM subscription s JOIN "user" u ON s.followed_id = u.user_id WHERE s.follower_id = $1',
            [userId]
        )
        return userFolloweds.rows
    }

    // Создание подписки пользователя на другого
    async followToUser(subscription) {
        const newFollow = await db.query(
            'INSERT INTO subscription (follower_id, followed_id) VALUES ($1, $2) RETURNING *',
            [subscription.followerId, subscription.followedId]
        )
        return newFollow.rows[0]
    }

    // Удаление подписки пользователя на другого
    async unfollowToUser(followerId, followedId) {
        const deletedFollow = await db.query(
            'DELETE FROM subscription WHERE follower_id = $1 AND followed_id = $2 RETURNING *',
            [followerId, followedId]
        )
        return deletedFollow.rows[0]
    }
}


module.exports = new UserModel()