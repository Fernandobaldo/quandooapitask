class LoginUserBean {
    constructor(
        email,
        password
    ) {
        this.email = email;
        this.password = password;
    }

    setEmail(email) {
        if (email) this.email = email;
        return this;
    }

    setPassword(password) {
        if (password) this.password = password;
        return this;
    }
}


module.exports = { LoginUserBean }