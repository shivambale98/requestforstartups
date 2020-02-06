const express = require('express');

const router = express.Router();

const ideacontoler = require('../controllers/idea');

router.post('/addidea', ideacontoler.Postidea);

module.exports = router;