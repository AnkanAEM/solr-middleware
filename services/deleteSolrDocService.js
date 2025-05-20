const axios = require('axios');
const logger = require('../logger');

/**
 * Deletes documents from Solr based on the provided query.
 * 
 * @param {string} queryStr - Solr query string, e.g., "path:/blogs/*" or "*:*"
 */
async function deleteDocumentsByQuery(queryStr) {
    const SOLR_BASE_URL = `${process.env.SOLR_HOST}/${process.env.SOLR_CORE}/update?commit=true`;

  try {
    const response = await axios.post(SOLR_BASE_URL, queryStr, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    logger.info(`✅ Deleted documents matching query "${queryStr}"`);
    return response.data;
  } catch (err) {
    logger.error(`❌ Error deleting Solr docs with query "${queryStr}":`, err.message);
    throw err;
  }
}

module.exports = {
  deleteDocumentsByQuery
};