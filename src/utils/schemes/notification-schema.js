const notificationSchema = (userId, relatedId, type, content) => {
    return {
        userId,
        relatedId,
        type,
        content,
        isRead: false,
    }
}


module.exports = notificationSchema