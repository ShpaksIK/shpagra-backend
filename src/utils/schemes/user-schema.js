const userSchema = (login, username, passwordHash, email = null) => {
    return {
        login,
        username,
        passwordHash,
        email: null,
        updatedAt: null
    }
}


module.exports = userSchema