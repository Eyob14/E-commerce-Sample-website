const { isEmail: check } = require('validator');
module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
        fullName: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING,
            unique: { args: true, msg: "That email is already in use" },
            lowercase: true,
            allowNull: false,
            validate: {
                isEmail: { args: true, msg: "please enter a valid email" },
            }
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                min: {
                    args: [6],
                    msg: "minimum length of password is 6 characters"
                },
            }
        },
        location: {
            type: Sequelize.STRING
        },
        gender: {
            type: Sequelize.STRING
        },
        phoneNumber: {
            type: Sequelize.STRING
        },
        role: {
            type: Sequelize.STRING,
        }
    });
    return User;
};

