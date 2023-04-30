const { Schema, model } = require("mongoose");
const connection_user = require("../connections/users");


const schema = new Schema({
    name: String,
    // desc: String,
    img:
    {
        data: Buffer,
        contentType: String
    },
    link: String,
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
}, {
    strict: true,
    strictQuery: true
});

module.exports = connection_user.model('Avatars', schema); 