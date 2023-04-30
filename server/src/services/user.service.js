const User = require("../models/User");

const userService = {
    findUserDbByUserId: async (userId, isLean) => {
        // console.log("user.service.js findUserDbByUserId userId: ", userId);
        try {
            // const userDb = await User.findById(userId)
            let userDb
            if (isLean) {
                userDb = await User.findById(userId).lean()

            } else {

                userDb = await User.findById(userId)
            }

            if (!userDb) throw new Error(`userService: No user with id: ${userId}`)

            return userDb
        } catch (error) {
            return undefined
        }

    }

}

module.exports = userService