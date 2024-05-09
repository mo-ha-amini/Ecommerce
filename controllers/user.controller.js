const { User } = require('../models') // Import your User model
const sendToken = require('../utils/jwtToken')

/**
 * @swagger
 * paths:
 *   /register:
 *     post:
 *       summary: Register a new user
 *       description: Creates a new user account.
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserRegistration'
 *       responses:
 *         '201':
 *           description: User registered successfully
 *         '400':
 *           description: Bad request or validation error
 *       tags:
 *         - Users
 */

exports.register = async (req, res) => {
    try {
        const { firstName, email, password } = req.body
        // Validate input (e.g., check if required fields are provided)
        // Create a new user
        const user = await User.create({
            firstName,
            email,
            password,
        })
        // Respond with success message or other relevant data
        sendToken(user, 201, res)
    } catch (error) {
        // Handle any errors (e.g., validation errors, database errors)
        res.status(400).json({ error: error.message })
    }
}

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findByCredentionals(email, password)
        sendToken(user, 201, res)
    } catch (error) {
        // Handle any errors (e.g., validation errors, database errors)
        res.status(400).json({ error: error.message })
    }
}
