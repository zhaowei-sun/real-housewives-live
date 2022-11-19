const { ModuleFilenameHelpers } = require("webpack");
const { User } = require('../models/model.js');

const logInController = {};

logInController.verifyAccount = (req, res, next) => {
    const { username}
    User.findOne()
    return next();
}

module.exports = signUpController;