const express = require('express')
const router = express.Router()
const userController = require('../controllers/user.controller')

// Route for user registration
/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         firstName:
 *           type: string
 *           description: User's firstName
 *         email:
 *           type: string
 *           format: email
 *           description: User's email address
 *         password:
 *           type: string
 *           format: password
 *           description: User's password
 *       required:
 *         - firstName
 *         - email
 *         - password
 */

router.post('/register', userController.register)
router.post('/login', userController.login)

module.exports = router
