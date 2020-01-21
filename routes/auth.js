const express = require('express');

const router = express.Router();

const authControler = require('../controllers/auth');

router.post('/signup', authControler.postSignup);

module.exports = router;