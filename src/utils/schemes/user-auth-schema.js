const userAuthSchema = (login, username, passwordHash) => {
    return {
        login,
        username,
        passwordHash
    }
}


module.exports = userAuthSchema