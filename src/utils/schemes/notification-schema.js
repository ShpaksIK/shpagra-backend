const notificationSchema = (userId, relatedId, type, content) => {
    return {
        userId,
        relatedId,
        type,
        content
    }
}


module.exports = notificationSchema