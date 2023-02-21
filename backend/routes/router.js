const express = require('express');
const { time } = require('../controllers/time');
const router = express.Router()

router.get('/', time)

module.exports = router;