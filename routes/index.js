const express = require('express');
const router = express.Router();
const logger = require('../logs/logger');
/* GET home page. */
router.get('/', function (req, res, next) {
  setTimeout(() => {
    logger.error(process.pid)
    res.status(200).json({ message: 'connetced' })
  }, 500);
});

module.exports = router;
