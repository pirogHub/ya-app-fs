const { Schema, model } = require('mongoose')
const connection_user = require('../connections/users')


const schema = new Schema({
    public: {
        userName: { type: String, required: true },
        avatarLink: String,
        offerList: [String]
    },
    own: {
        email: { type: String, required: true, unique: true },
    },
    hashPassword: { type: String, required: true },
}, {
    timestamps: true
})
module.exports = connection_user.model("User", schema)