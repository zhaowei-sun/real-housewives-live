const express = require('express');

const router = express.Router();

const logInController = require('../controllers/logInController.js');

router.post('/', logInController.verifyAccount, (req, res) => {
    res.status(200).json({ accountDetails: res.locals.accountDetails });
  });

module.exports = router;
