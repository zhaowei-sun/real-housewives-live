const { ModuleFilenameHelpers } = require("webpack");
const { User } = require('../models/model.js');

const logInController = {};

logInController.verifyAccount = (req, res, next) => {
    const { email, password } = req.body;
    const userDetails = { email, password };
    console.log(userDetails);
    User.findOne(userDetails, (err, user) => {
        if (err) {
            return next({
                log: err,
                status: 400,
                message: { err: 'Something went wrong with locating a user'}
            })
        }
        if (user === null) {
            return res.status(200).json({error: 'Invalid login details!'})
        }
        return next();
    })
}

module.exports = logInController;