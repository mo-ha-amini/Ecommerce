require('dotenv').config()

const sendToken = (user, statusCode, res) => {
    try {
        // Generate JWT token
        const token = user.generateAuthToken()

        // Options for cookie (adjust expires based on your needs)
        const options = {
            expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000), // In milliseconds
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Set secure only in production
        }

        res.status(statusCode).cookie('token', token, options).json({
            success: true,
            token,
            user,
        })
    } catch (error) {
        console.error('Error generating token:', error.message)
        res.status(500).json({ error: 'Failed to generate token' })
    }
}
module.exports = sendToken
