const express = require('express')
const mongoose = require('mongoose')
const config = require('config')
const chalk = require('chalk')
const cors = require('cors')

const path = require("path")

const initDatabase = require("./src/startUp/initDatabase")
const routes = require('./src/routes')
const logger = require('./src/middleware/logger.middleware')
// const toMongoSchema = require('./src/structs/getSchemaAndRandom')

// const structManipulate = require('./src/structs/getSchemaAndRandom')
// const FullAboutBuilding = require('./src/structs/partsOfStructs/FullAboutBuilding')
// const FullPriceDetails = require('./src/structs/partsOfStructs/FullPriceDetails')
// const FullAboutFlat = require('./src/structs/partsOfStructs/FullAboutFlat')



const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())
app.use('/api', logger, routes)

const PORT = config.get('port') ?? 80

if (process.env.NODE_ENV === "development") {
    console.log("app.js development");
} else if (process.env.NODE_ENV === "production") {
    app.use('/', express.static(path.join(__dirname, "client")))

    const indexPath = path.join(__dirname, "client", "index.html")

    app.get("*", (req, res) => {
        res.sendFile(indexPath)
    })
}



async function start() {


    try {
        mongoose.set("strictQuery", "throw");

        // mongoose.connection.once("open", () => {
        //     initDatabase()
        // })

        await mongoose.connect(config.get('mongoUri'))
        console.log(chalk.green("MongoDb connected."));
        app.listen(PORT, () => {
            console.log(chalk.green(`Server has been started on ${PORT}...`));
        })

    } catch (e) {
        console.log(chalk.red(e.message));
    }
}


start()


//http://localhost:3000/table?category="commercial"&filters={"type":["sell"],"category":["commercial"],"marketType":["new"],"priceDetails":{"price":{"$gte":"123123"}}}