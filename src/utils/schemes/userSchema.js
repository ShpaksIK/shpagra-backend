const userSchema = (login, passwordHash, email) => {
    return {
        login,
        customId: null,
        passwordHash,
        email,
        updatedAt: null
    }
}


module.exports = userSchema