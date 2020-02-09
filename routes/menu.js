const express = require('express');

const router = express.Router();

const menucontoler = require('../controllers/menu');

router.post('/menu', menucontoler.getmenu);

module.exports = router;