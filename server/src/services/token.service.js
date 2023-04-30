const jwt = require("jsonwebtoken")
const config = require('config')
const Token = require("../models/Token")

const time = 1000 * 60 * 60 // 1 час
const stringTime = `${time}ms`

class TokenService {
    generate(payload) {
        console.log("Token.service.js generate");
        const accessToken = jwt.sign(payload, config.get('accessSecret'), {
            expiresIn: stringTime
        })
        const refreshToken = jwt.sign(payload, config.get('refreshSecret'), {
            expiresIn: "1d"
        })
        const tokens = {
            accessToken,
            refreshToken,
            expiresIn: time,
            userId: payload._id,
        }

        return tokens
    }


    async save(userId, refreshToken) {
        const data = await Token.findOne({ userId })

        if (data) {
            data.refreshToken = refreshToken
            return data.save()
        }

        const token = await Token.create({ userId, refreshToken })
        return token
    }

    decodeRefresh(refreshToken) {
        try {
            return jwt.verify(refreshToken, config.get('refreshSecret'))
        } catch (e) {
            return null
        }
    }

    decodeAccess(accessToken) {
        try {
            return jwt.verify(accessToken, config.get('accessSecret'))
        } catch (e) {
            return null
        }
    }

    async findRefreshTokenInDb(refreshToken) {
        try {
            return await Token.findOne({ refreshToken })
        } catch (e) {
            return null
        }
    }

    async isAuthOwner(refreshToken, userDb) {
        // const token = await findRefreshTokenInDb(refreshToken)


        return true
    }
}


module.exports = new TokenService