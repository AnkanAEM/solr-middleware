const express = require('express');
const router = express.Router();
const solrService = require('../services/solrService');
const logger = require('../logger');

router.post('/search', async (req, res) => {

  const solrQuery = req.body;
  
  try {
    const data = await solrService.querySolr(solrQuery);
    res.json(data);
  } catch (err) {
    logger.error('Error in /api/get/search:', err);
    res.status(500).json({ error: 'Error querying Solr - ' + err.message});
  }
});

module.exports = router;