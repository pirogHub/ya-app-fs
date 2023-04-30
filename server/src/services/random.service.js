const bcrypt = require("bcrypt")
const emails = require('email-generator');
const generator = require('generate-password');
const User = require("../models/User");
const AuthorTestUser = require("../models/AuthorTestUser");
const tokenService = require("./token.service");


const axios = require("axios")

const generateRandomUser = async (name, gender) => {
    const email = emails.generateEmail()
    const password = generator.generate({
        length: 10,
        numbers: true
    });
    const hashPassword = await bcrypt.hash(password, 10)

    const user_default = {
        "own.email": email,
        "public.userName": name,
        "public.avatarLink": "",
        hashPassword,
    }

    const user_backup = {
        ...user_default,
        password
    }

    const newUser = await User.create({
        ...user_default
    })
    const tokens = tokenService.generate({ _id: newUser._id })
    await tokenService.save(newUser._id, tokens.refreshToken)
    const newUserAuthor = await AuthorTestUser.create({
        ...user_backup,
        refUserId: newUser._id
    })

    const { data } = await axios.get(`https://this-person-does-not-exist.com/new?time=${Date.now()}&gender=${gender}&age=26-35&etnic=all`)
    let avatarLink
    if (data?.src) avatarLink = `https://this-person-does-not-exist.com${data?.src}`
    else {
        avatarLink = `https://ui-avatars.com/api/?background=fff&color=000&name=${name?.slice(0, 2)}`

    }
    newUser.public.avatarLink = avatarLink
    newUserAuthor.public.avatarLink = avatarLink
    return [newUser, newUserAuthor]

}

module.exports = generateRandomUser
