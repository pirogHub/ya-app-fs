const tokenService = require("../services/token.service")

const auth = (req, res, next) => {
    if (req.method === "OPTIONS") {
        next()
    }
    console.log("auth.middleware.js");
    try {
        const accessToken = req.headers.authorization.split(' ')[1]
        console.log("auth.middleware.js accessToken", accessToken);
        if (!accessToken) return res.status(401).send("Unauthorized")

        const data = tokenService.decodeAccess(accessToken)
        console.log("auth.middleware.js data", data);
        if (!data) throw new Error()

        req.userTokens = { ...data, userId: data._id, accessToken }
        next()

    } catch (error) {
        return res.status(500).send("Server Error. May be you are Unauthorized")

    }

}

module.exports = auth
