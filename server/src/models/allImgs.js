const { Schema, model } = require("mongoose");
const connection_image = require("../connections/images");


const schema = new Schema({
    name: String,
    // desc: String,
    img:
    {
        data: Buffer,
        contentType: String
    },
    link: String
});

//Image is a model which has a schema imageSchema

module.exports = connection_image.model('all_imgs', schema); 