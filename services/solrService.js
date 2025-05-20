const axios = require('axios');
const logger = require('../logger');
const SOLR_BASE_URL = `${process.env.SOLR_HOST}/${process.env.SOLR_CORE}/query`;

async function querySolr(jsonQuery) {
  try {
    const response = await axios.post(SOLR_BASE_URL, jsonQuery, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (err) {
    logger.error('Error querying Solr:', err.message);
    throw err;
  }
}

module.exports = {
  querySolr
};
