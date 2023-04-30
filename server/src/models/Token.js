const { Schema, model } = require('mongoose')
const User = require('./User')
const connection_user = require('../connections/users')

const schema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    refreshToken: { type: String, required: true },

}, {
    timestamps: true
})
module.exports = connection_user.model("Token", schema)