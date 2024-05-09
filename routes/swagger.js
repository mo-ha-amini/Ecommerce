const router = require('express').Router()
const swaggerUi = require('swagger-ui-express')
const swaggerJsdoc = require('swagger-jsdoc')

const swaggerOptions = {
    apis: ['./routes/**/*.js', './controllers/**/*.js'], // Look for API definitions in routes folder
    failOnErrors: true, // Whether or not to throw when parsing errors. Defaults to false.
    host: 'localhost:8080', // the host or url of the app
    basePath: '/api', // the basepath of your endpoint
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Ecommerce',
            version: '1.0.0',
        },
    },
}

const swaggerSpec = swaggerJsdoc(swaggerOptions)

router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
module.exports = router
