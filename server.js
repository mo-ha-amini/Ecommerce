require('dotenv').config() // ALLOWS ENVIRONMENT VARIABLES TO BE SET ON PROCESS.ENV SHOULD BE AT TOP
const express = require('express')
const cors = require('cors');
const cookies = require("cookie-parser");
const morgan = require('morgan')
const { red, green, blue, magenta } = require('console-log-colors')
const sequelize = require('./config/db')
const swagger = require('./routes/swagger')
const user = require('./routes/user.route')

const app = express()

// Middleware
app.use(express.json()) // parse json bodies in the request object
app.use(morgan('combined')) 
app.use(swagger)
app.use(cookies());
app.use(cors());

app.use('/api', user)
const PORT = process.env.PORT || 8080
// Connect to Database
;(async () => {
    try {
        await sequelize.authenticate()
        console.log(
            magenta('DB: Connection has been established successfully.')
        )
        // await sequelize.sync({ force: true })
        await sequelize.sync({ alter: true })

        console.log(magenta('DB: All models were synchronized successfully.'))
        // Listen on pc port
        app.listen(PORT, () =>
            console.log(blue(`Server running on PORT ${PORT}`))
        )
    } catch (error) {
        console.error(red('DB: Unable to connect to the database:', error))
    }
})()
