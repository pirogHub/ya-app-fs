const { Schema, model } = require("mongoose");
const connection_randoms = require("../../connections/randoms");


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

module.exports = connection_randoms.model('Random_Plan', schema); 