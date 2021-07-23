function isValid(user) {
    return Boolean(user.email && user.password && typeof user.password === "string");
}

module.exports = {
    isValid,
};