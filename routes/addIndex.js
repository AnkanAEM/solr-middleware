const express = require('express');
const router = express.Router();
const updateSolrIndex = require('../services/updateSolrIndexService.js');
const queryIndexService = require('../services/queryIndexService.js');
const logger = require('../logger.js');

router.post('/addIndex', async (req, res) => {
  const indexingItems = req.body;
  if(!indexingItems || indexingItems.length === 0) {
    queryIndexService.initQueryIndexService();
  }
    
  try {
    const data = await updateSolrIndex.updateSolrIndex(indexingItems);
    res.json(data);
  } catch (err) {
    logger.error('Error in /api/post/addIndex:', err);
    res.status(500).json({ error: 'Error Adding index in Solr' });
  }
});

module.exports = router;