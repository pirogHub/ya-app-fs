const express = require('express');
const { body, validationResult } = require('express-validator');

const bcrypt = require("bcrypt")
const User = require('../models/User');
const tokenService = require("../services/token.service");
const AuthorTestUser = require('../models/AuthorTestUser');

const router = express.Router({ mergeParams: true })

const passwordValidator = (val) => {
    return val ? val : null
}
const signValidations = {
    email: body("email", "Некорректный email").exists().isEmail(),
    password: body("password", "Длина пароля должна быть от 7 до 17 символов").exists().trim().isLength({ min: 7, max: 17 }).custom(passwordValidator),
    userName: body("userName", "Имя не должно быть пустым").exists().not().isEmpty().trim().escape(),
}



router.post('/signIn',
    signValidations.email,
    signValidations.password,
    async (req, res) => {

        console.log("auth.routes.js signIn req.body", req.body);
        try {

            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                res.status(400).json({ errors: errors.array().map(e => ({ param: e.param, msg: e.msg })) })
                return
            }
            const { email, password } = req.body

            const user = await new Promise((resolve, reject) => {
                User.findOne({ "own.email": email }, (err, res) => {
                    if (err) reject(err)
                    resolve(res)
                })
            })
            console.log("auth.routes.js sign In user", user ? true : false);
            if (!user) throw new Error(`No user with email: ${email}`)

            const isEqual = await bcrypt.compare(password, user.hashPassword)
            console.log("auth.routes.js sign In  isEqual", isEqual);
            if (!isEqual) throw new Error(`Wrong password or Email`)


            const tokens = tokenService.generate({ _id: user._id })
            await tokenService.save(user._id, tokens.refreshToken)
            const dataToSend = { tokens, user: { ...user.public, ...user.own, userId: user._id } }
            console.log("auth.routes.js dataToSend", dataToSend);
            res.status(200).json(dataToSend)

        } catch (error) {

            res.status(400).send(error?.message);
        }

    })



router.post('/signUp',
    signValidations.email,
    signValidations.password,
    signValidations.userName,
    async (req, res) => {

        console.log("auth.routes.js signUp req.body", req.body);
        try {

            const errors = validationResult(req)
            console.log("auth.routes.js errors", errors);
            if (!errors.isEmpty()) {
                res.status(400).json({ errors: errors.array().map(e => ({ param: e.param, msg: e.msg })) })
                return
            }

            console.log("req.body", req.body);
            const { email, password, userName } = req.body
            console.log("req.body email", email);
            const user = await User.findOne({ "own.email": email })

            console.log("auth.routes.js user", user);

            if (user) throw new Error(`auth.routes.js User with email: ${email} already exist`)


            const hashPassword = await bcrypt.hash(password, 10)
            console.log("auth.routes.js email", email, "userName", userName, "hashPassword", hashPassword,);
            const newUser = await User.create({
                "own.email": email,
                "public.userName": userName,
                "public.avatarLink": "",
                hashPassword,
                // password
            })

            const newUserAuthor = await AuthorTestUser.create({
                "own.email": email,
                "public.userName": userName,
                "public.avatarLink": "",
                hashPassword,
                password
            })


            if (!newUser) throw new Error(`server error cant create user `)


            const tokens = tokenService.generate({ _id: newUser._id })
            await tokenService.save(newUser._id, tokens.refreshToken)
            res.status(201).send({
                tokens, user: { ...newUser.public, ...newUser.own, id: newUser._id }
            })


        } catch (error) {
            console.log("auth.routes.js error", JSON.stringify(error.message));
            res.status(400).send(JSON.stringify(error.message));

        }
    })

router.post('/refresh', async (req, res) => {
    console.log("auth.routes.js refresh");
    try {
        const { refreshToken } = req.body
        const data = tokenService.decodeRefresh(refreshToken)
        console.log("auth.routes.js refresh data", req.body);
        if (!data) throw new Error("Unauthorized")

        const dbToken = await tokenService.findRefreshTokenInDb(refreshToken)

        if (!dbToken || data._id !== dbToken?.userId?.toString()) {
            throw new Error("Unauthorized")
        }

        const tokens = await tokenService.generate({
            id: data._id
        })
        await tokenService.save(data._id, tokens.refreshToken)

        res.status(200).send({ ...tokens })

    } catch (error) {
        console.log("auth.routes.js error", { message: (error.message) });
        res.status(401).send({ message: (error.message) });

    }
})


module.exports = router