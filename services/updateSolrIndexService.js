const axios = require('axios');
const logger = require('../logger');
const SOLR_BASE_URL = `${process.env.SOLR_HOST}/${process.env.SOLR_CORE}/update`;

async function updateSolrIndex(jsonData) {
  try {
    const response = await axios.post(SOLR_BASE_URL, jsonData, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if(response.status===200) logger.info('✅ Solr index updated successfully');
    return response.status === 200 ? '✅ Indexes were updated succesfully' : '❌Error updating index';
  } catch (err) {
    logger.error('Error updating index on Solr:', err.message);
    throw err;
  }
}

module.exports = {
    updateSolrIndex
};