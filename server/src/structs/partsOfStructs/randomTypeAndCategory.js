const Author = require("../data/Author")
const Seeker = require("../data/Seeker")
const randomTools = require("../randomTools/randomTools")


const randomTypeAndCategory = {
    type: {
        mongoType: [String],
        author: {
            random: function () { this.type = [...randomTools.getRandomValueFrom(Author.Options.types)] }
        },
        seeker: {
            random: function () { this.type = [...randomTools.getRandomValueFrom(Seeker.Options.types)] }
        }
    },
    category: {
        mongoType: [String],
        author: {
            random: function () { this.category = [...randomTools.getRandomValueFrom(randomTools.getBy_From_Withrules(this.type, Author.Options.categories, Author.Options.types))] }
        },
        seeker: {

            random: function () { this.category = [...randomTools.getRandomValueFrom(randomTools.getBy_From_Withrules(this.type, Seeker.Options.categories, Seeker.Options.types))] }

        }
    }
}
// console.log("generateRandomFields randomTypeAndCategory", randomTypeAndCategory);

const getMongoTypeAndCategory = ({ type, category }) => {
    if (!type || !category) throw new Error("mongoTypeAndCategory: need type and category")
    return {
        type: {
            mongoType: [String],
            author: {
                random: function () { this.type = [type] }
            },
            seeker: {
                random: function () { this.type = [type] }
            }
        },
        category: {
            mongoType: [String],
            author: {
                random: function () { this.category = [category] }
            },
            seeker: {
                random: function () { this.category = [category] }
            }
        }
    }
}
module.exports = getMongoTypeAndCategory