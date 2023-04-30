const { Schema } = require('mongoose')

const getMongoUserId = () => {
    return {
        userId: {
            mongoType: { $type: Schema.Types.ObjectId, ref: "User", required: true },
        }

    }
}

module.exports = { getMongoUserId }