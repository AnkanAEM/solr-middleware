const express = require('express');
const router = express.Router();
const solrdeleteService = require('../services/deleteSolrDocService');
const logger = require('../logger');

router.post('/delete', async (req, res) => {

  const solrQuery = req.body;
  
  try {
    const data = solrdeleteService.deleteDocumentsByQuery(solrQuery);
    res.json(data);
  } catch (err) {
    logger.error('Error in /api/get/search:', err);
    res.status(500).json({ error: 'Error querying Solr - ' + err.message});
  }
});

module.exports = router;