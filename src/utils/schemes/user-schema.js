const userSchema = (login, username, passwordHash) => {
    return {
        login,
        username,
        passwordHash,
        email: null,
        updatedAt: null
    }
}


module.exports = userSchema