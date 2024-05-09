const { DataTypes, Model } = require('sequelize')
const bcrypt = require('bcryptjs')

const sequelize = require('../config/db')
const { generateAccessToken, hashPassword } = require('../utils/auth')

class User extends Model {}

User.init(
    {
        // Model attributes are defined here
        id: {
            primaryKey: true,
            autoIncrement: true,
            type: DataTypes.INTEGER,
        },
        firstName: {
            type: DataTypes.STRING,
            // allowNull: false,
        },
        lastName: {
            type: DataTypes.STRING,
            // allowNull defaults to true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [8, 20], // Enforces password length between 6 and 20 characters
            },
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true, // Enforces unique emails
            validate: {
                isEmail: true,
            },
        },
    },
    {
        // Other model options go here
        sequelize, // We need to pass the connection instance
        modelName: 'User', // We need to choose the model name
    }
)

User.beforeCreate(async (user, options) => {
    try {
        const hashedPassword = await hashPassword(user.password, 10)
        user.password = hashedPassword
    } catch (err) {
        return next(err)
    }
})

User.prototype.generateAuthToken = function () {
    const token = generateAccessToken(this.id) // Implement your token generation logic
    return token
}

User.findByCredentionals = async function (email, password) {
    const user = await User.findOne({
        where: {
            email: email,
        },
    })

    if (!user) {
        throw new Error('Invalid Login credentials')
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password)
    if (!isPasswordMatch) {
        throw new Error('Invalid Login credentials')
    }

    return user
}

module.exports = User
