const { ModuleFilenameHelpers } = require("webpack");
const { User } = require('../models/model.js');

const signUpController = {};

signUpController.createAccount = (req, res, next) => {
    console.log(req.body);
    if (req.body.username === undefined || req.body.email === undefined || req.body.password === undefined) {
        return next({
            log: 'Invalid sign-up details',
            status: 400,
            message: { err: 'Invalid sign-up details' },
          })
    }
    const {username, email, password} = req.body;
    const userData = { username, email, password };
    User.create(userData, (err, user) => {
        if (err) {
            return next({
                log: err,
                status: 400,
                message: { err: 'Something went wrong with creating a user'}
            })
        }
        console.log(user);
        res.locals.accountDetails = user;
        return next();
    })
}

module.exports = signUpController;