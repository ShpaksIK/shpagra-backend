const userUpdateSchema = (login, username, email) => {
    return {
        login,
        username,
        email
    }
}


module.exports = userUpdateSchema