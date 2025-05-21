const express = require('express');
const router = express.Router();
const solrService = require('../services/solrService');
const logger = require('../logger');
const { updateSolrIndex } = require('../services/updateSolrIndexService');

router.post('/reindex', async (req, res) => {

  try {
    updateSolrIndex.initQueryIndexService();
  } catch (err) {
    logger.error('Error in /reindex:', err);
  }
});

module.exports = router;