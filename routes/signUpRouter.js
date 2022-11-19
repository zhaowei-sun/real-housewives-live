const express = require('express');

const router = express.Router();

const signUpController = require('../controllers/signUpController.js');

router.post('/', signUpController.createAccount, (req, res) => {
    res.status(200).json({ accountDetails: res.locals.accountDetails });
  });

module.exports = router;
