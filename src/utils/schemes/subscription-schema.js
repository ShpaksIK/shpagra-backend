const subscriptionSchema = (followerId, followedId) => {
    return {
        followerId,
        followedId,
    }
}


module.exports = subscriptionSchema