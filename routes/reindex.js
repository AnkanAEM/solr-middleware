const express = require('express');
const router = express.Router();
const logger = require('../logger');
const { initQueryIndexService } = require('../services/queryIndexService');

router.post('/reindex', async (req, res) => {

  try {
    await initQueryIndexService();
    res.send('Reindexing started');
  } catch (err) {
    logger.error('Error in /reindex:', err);
  }
});

module.exports = router;