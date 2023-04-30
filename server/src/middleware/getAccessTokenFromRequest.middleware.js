const tokenService = require("../services/token.service")

const getAccessTokenFromRequest = (req, res, next) => {
    if (req.method === "OPTIONS") {
        next()
    }
    // console.log("getAccessTokenFromRequest.middleware");
    const accessToken = req.headers.authorization?.split(' ')?.[1]
    // console.log("getAccessTokenFromRequest accessToken", accessToken);
    const data = tokenService.decodeAccess(accessToken)
    // console.log("getAccessTokenFromRequest.middleware data ", data);
    if (!data) console.log("Unauthorized");
    else { req.userTokens = { ...data, userId: data._id, accessToken } }
    next()
}

module.exports = getAccessTokenFromRequest
